function findCommonGroups(users) {
    const result = {
        defaultAccessPackage: [],
        companyAccessPackages: {},
        departmentAccessPackages: {},
        unassignedGroups: []
    };

    // console.log("Starting algorithm to assign access packages...");

    // Step 0: Exclude users without companyName or department
    const excludedUsers = users.filter(
        user => !user.companyName || !user.department || user.userAccountEnabled === false
      );
      result.excludedUsers = excludedUsers.map(user => ({
        userId: user.userId,
        userAccountEnabled: user.userAccountEnabled,
        userType: user.userType,
        userName: user.displayName,
      }));
      
      const filteredUsers = users.filter(
        user => user.companyName && user.department && user.userAccountEnabled !== false
      );
      
    // Step 1: Find default access package (common to all users)
    const allGroups = filteredUsers.map(user => user.groups.map(group => group.displayName));
    const defaultAccessPackage = allGroups.reduce((common, currentGroups) =>
        common.filter(group => currentGroups.includes(group))
    );
    result.defaultAccessPackage = defaultAccessPackage;
    // console.log("Step 1: Default Access Package determined:", result.defaultAccessPackage);

    // Step 2: Assign company-specific access packages
    const companyGroups = {};
    filteredUsers.forEach(user => {
        if (!companyGroups[user.companyName]) {
            companyGroups[user.companyName] = [];
        }
        companyGroups[user.companyName].push(user.groups.map(group => group.displayName));
    });

    // console.log("Step 2: Collected groups for each company:", companyGroups);

    for (const company in companyGroups) {
        // console.log(`Processing company: ${company}`);
        const companyGroupList = companyGroups[company].map(groups => groups.sort());
        // console.log(`Normalized groups for company ${company}:`, companyGroupList);

        const commonCompanyGroups = companyGroupList.reduce((common, currentGroups) =>
            common.filter(group => currentGroups.includes(group))
        ).filter(group => !result.defaultAccessPackage.includes(group));

        result.companyAccessPackages[company] = commonCompanyGroups;
        // console.log(`Common groups for company ${company}:`, commonCompanyGroups);
    }

    // Step 3: Assign department-specific access packages
    const departmentGroups = {};
    filteredUsers.forEach(user => {
        if (!departmentGroups[user.department]) {
            departmentGroups[user.department] = [];
        }
        departmentGroups[user.department].push(user.groups.map(group => group.displayName));
    });

    // console.log("Step 3: Collected groups for each department:", departmentGroups);

    const assignedGroups = new Set(result.defaultAccessPackage);

    for (const department in departmentGroups) {
        // console.log(`Processing department: ${department}`);
        const departmentGroupList = departmentGroups[department].map(groups => groups.sort());
        // console.log(`Normalized groups for department ${department}:`, departmentGroupList);

        const commonDepartmentGroups = departmentGroupList.reduce((common, currentGroups) =>
            common.filter(group => currentGroups.includes(group))
        ).filter(group => 
            !result.defaultAccessPackage.includes(group) &&
            !Object.values(result.companyAccessPackages).flat().includes(group)
        );

        result.departmentAccessPackages[department] = commonDepartmentGroups;
        // console.log(`Common groups for department ${department}:`, commonDepartmentGroups);

        commonDepartmentGroups.forEach(group => {
            // console.log(`Group: ${group} assigned to DepartmentAccessPackage ${department}`);
            assignedGroups.add(group);
        });
    }

    // Step 4: Collect unassigned groups
    filteredUsers.forEach(user => {
        user.groups.forEach(group => {
            const groupName = group.displayName;
            const groupType = group.type;
            if (
                !assignedGroups.has(groupName) &&
                !Object.values(result.companyAccessPackages).flat().includes(groupName) &&
                !Object.values(result.departmentAccessPackages).flat().includes(groupName)
            ) {
                result.unassignedGroups.push({
                    userId: user.userId,
                    userName: user.displayName,
                    userCompany: user.companyName,
                    userDepartment: user.department,
                    group: groupName,
                    groupType: groupType    
                });
            }
        });
    });

    // console.log("Step 4: Unassigned groups collected:", result.unassignedGroups);

    return result;
}

module.exports = { findCommonGroups };
