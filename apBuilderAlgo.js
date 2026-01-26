/**
 * Optimized Access Package Builder Algorithm
 * Uses Sets and Maps for O(1) lookups instead of O(n) array operations
 */
function findCommonGroups(users) {
  const result = {
    defaultAccessPackage: [],
    companyAccessPackages: {},
    departmentAccessPackages: {},
    unassignedGroups: [],
    excludedUsers: [],
  };

  // Step 0: Filter users upfront - Use a single pass
  const filteredUsers = [];
  for (const user of users) {
    if (!user.companyName || !user.department || user.userAccountEnabled === false) {
      result.excludedUsers.push({
        userId: user.userId,
        userAccountEnabled: user.userAccountEnabled,
        userType: user.userType,
        userName: user.displayName,
      });
    } else {
      filteredUsers.push(user);
    }
  }

  if (filteredUsers.length === 0) {
    return result;
  }

  // Pre-compute: Create lookup structures using Sets for O(1) operations
  const userGroupSets = new Map(); // userId -> Set of group names
  const companyUsers = new Map();   // companyName -> array of userIds
  const departmentUsers = new Map(); // department -> array of userIds
  const allGroupNames = new Set();

  for (const user of filteredUsers) {
    const groupSet = new Set(user.groups.map((g) => g.displayName));
    userGroupSets.set(user.userId, groupSet);

    // Collect all group names
    for (const g of user.groups) {
      allGroupNames.add(g.displayName);
    }

    // Group by company
    if (!companyUsers.has(user.companyName)) {
      companyUsers.set(user.companyName, []);
    }
    companyUsers.get(user.companyName).push(user.userId);

    // Group by department
    if (!departmentUsers.has(user.department)) {
      departmentUsers.set(user.department, []);
    }
    departmentUsers.get(user.department).push(user.userId);
  }

  // Step 1: Find default access package (groups common to ALL users)
  const defaultGroups = new Set();
  for (const groupName of allGroupNames) {
    let isCommonToAll = true;
    for (const [, groupSet] of userGroupSets) {
      if (!groupSet.has(groupName)) {
        isCommonToAll = false;
        break;
      }
    }
    if (isCommonToAll) {
      defaultGroups.add(groupName);
    }
  }
  result.defaultAccessPackage = Array.from(defaultGroups);

  // Step 2: Company-specific access packages
  for (const [companyName, userIds] of companyUsers) {
    const companyCommonGroups = [];
    
    for (const groupName of allGroupNames) {
      if (defaultGroups.has(groupName)) continue;

      let isCommonToCompany = true;
      for (const userId of userIds) {
        const userGroups = userGroupSets.get(userId);
        if (!userGroups.has(groupName)) {
          isCommonToCompany = false;
          break;
        }
      }
      if (isCommonToCompany) {
        companyCommonGroups.push(groupName);
      }
    }
    result.companyAccessPackages[companyName] = companyCommonGroups;
  }

  // Create a Set of all company-assigned groups for fast lookup
  const companyAssignedGroups = new Set(
    Object.values(result.companyAccessPackages).flat()
  );

  // Step 3: Department-specific access packages
  const assignedGroups = new Set([...defaultGroups, ...companyAssignedGroups]);

  for (const [department, userIds] of departmentUsers) {
    const departmentCommonGroups = [];

    for (const groupName of allGroupNames) {
      if (assignedGroups.has(groupName)) continue;

      let isCommonToDept = true;
      for (const userId of userIds) {
        const userGroups = userGroupSets.get(userId);
        if (!userGroups.has(groupName)) {
          isCommonToDept = false;
          break;
        }
      }
      if (isCommonToDept) {
        departmentCommonGroups.push(groupName);
      }
    }
    result.departmentAccessPackages[department] = departmentCommonGroups;
  }

  // Add department groups to assigned set
  for (const groups of Object.values(result.departmentAccessPackages)) {
    for (const g of groups) {
      assignedGroups.add(g);
    }
  }

  // Step 4: Collect unassigned groups (using Sets for O(1) lookup)
  for (const user of filteredUsers) {
    for (const group of user.groups) {
      if (!assignedGroups.has(group.displayName)) {
        result.unassignedGroups.push({
          userId: user.userId,
          userName: user.displayName,
          userCompany: user.companyName,
          userDepartment: user.department,
          group: group.displayName,
          groupType: group.type,
        });
      }
    }
  }

  return result;
}

module.exports = { findCommonGroups };
