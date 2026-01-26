const express = require("express");
const router = express.Router();
const { getUserInfo, getUsersList, getUserGroupsBatched } = require("../auth"); // Import functions from core auth.js

// Route to render the buildermanual page
router.get("/", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/"); // Redirect to home if session data is missing
  }

  const accessToken = req.session.token;

  try {
    // Fetch user list using the access token

    const users = await getUserInfo(accessToken);

    res.render("roles", {
      tenantId: req.session.tenantId,
      displayName: req.session.displayName,
      userPrincipalName: req.session.userPrincipalName,
    });
  } catch (error) {
    console.error("Error fetching users list:", error);
    res.status(500).send("Error fetching users list");
  }
});

router.get("/role-matrix", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const accessToken = req.session.token;
  const { department } = req.query; // e.g. ?department=Finance

  try {
    const users = await getUsersList(accessToken);

    // 🧩 1️⃣ Extract list of departments for dropdown
    const departments = [...new Set(users.map(u => u.department).filter(Boolean))].sort();

    // 🧩 2️⃣ Filter by selected department (if any)
    const filteredUsers = department
      ? users.filter(u => u.department === department)
      : [];

    // If no department selected → just return available departments
    if (!department) {
      return res.json({ departments });
    }

    // 🧩 3️⃣ Count users with no job title in this department
    const noJobTitleCount = filteredUsers.filter(u => !u.jobTitle).length;
    const usersWithJobTitle = filteredUsers.filter(u => u.jobTitle);

    // 🧩 4️⃣ Build matrix data using batch API
    const roleMatrix = [];
    const groupSet = new Set();

    const CHUNK_SIZE = 100;
    for (let i = 0; i < filteredUsers.length; i += CHUNK_SIZE) {
      const chunk = filteredUsers.slice(i, i + CHUNK_SIZE);
      const userGroupsMap = await getUserGroupsBatched(chunk, accessToken);

      chunk.forEach((user) => {
        const groups = userGroupsMap.get(user.id) || [];
        if (!user.jobTitle) return;

        const roleEntry =
          roleMatrix.find((r) => r.role === user.jobTitle) ||
          (roleMatrix.push({ role: user.jobTitle, groups: [] }),
          roleMatrix.find((r) => r.role === user.jobTitle));

        groups.forEach((g) => {
          if (!roleEntry.groups.includes(g.displayName)) {
            roleEntry.groups.push(g.displayName);
          }
          groupSet.add(g.displayName);
        });
      });
    }

    
    res.json({
      departments,
      selectedDepartment: department,
      noJobTitleCount,
      groups: Array.from(groupSet).sort((a, b) => a.localeCompare(b)),
      roles: roleMatrix.sort((a, b) => a.role.localeCompare(b.role)),
    });
  } catch (error) {
    console.error("Error building role matrix:", error);
    res.status(500).json({ error: "Failed to build role matrix" });
  }
});

router.get("/role-users/:jobTitle", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const accessToken = req.session.token;
  const jobTitle = req.params.jobTitle;
  if (!jobTitle) return res.status(400).json({ error: "Missing jobTitle" });

  try {
    const users = await getUsersList(accessToken);

    // case-insensitive match
    const matched = users.filter(
      (u) => u.jobTitle && u.jobTitle.toLowerCase() === jobTitle.toLowerCase()
    );

    // Use batch API to fetch groups for all matched users at once
    const userGroupsMap = await getUserGroupsBatched(matched, accessToken);

    const detailed = matched.map((u) => {
      const groups = userGroupsMap.get(u.id) || [];
      return {
        id: u.id,
        displayName: u.displayName,
        userPrincipalName: u.userPrincipalName,
        jobTitle: u.jobTitle,
        department: u.department,
        groups: groups.map((g) => g.displayName),
      };
    });

    res.json(detailed);
  } catch (err) {
    console.error("Error in /role-users:", err);
    res.status(500).json({ error: "Failed to fetch role users" });
  }
});


module.exports = router;