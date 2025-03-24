const express = require("express");
const router = express.Router();
const { getUserInfo, getGroupListAndTotalMembers, getCompaniesAndDepartments, getGroupMembershipAnalyzer } = require("../auth"); // Import functions from core auth.js

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

    res.render("buildermanual", {
      tenantId: req.session.tenantId,
      displayName: req.session.displayName,
      userPrincipalName: req.session.userPrincipalName,
    });
  } catch (error) {
    console.error("Error fetching users list:", error);
    res.status(500).send("Error fetching users list");
  }
});

// Route to fetch data for visualization and generate access package tables
router.get("/group-members", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/"); // Redirect to home if session data is missing
  }

  const accessToken = req.session.token;

  try {
    // Fetch user list using the access token
    const groups = await getGroupListAndTotalMembers(accessToken);
    res.json(groups); 
  } catch (error) {
    console.error("Error fetching users list:", error);
    res.status(500).send("Error fetching users list");
  }
});

// Route to fetch data for visualization and generate access package tables
router.get("/companies-departments", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/"); // Redirect to home if session data is missing
  }

  const accessToken = req.session.token;

  try {
    // Fetch user list using the access token
    const fixedListItem = await getCompaniesAndDepartments(accessToken);
    res.json(fixedListItem); 
  } catch (error) {
    console.error("Error fetching users list:", error);
    res.status(500).send("Error fetching users list");
  }
});

// Route to fetch members of a specific group
router.get("/group-membership/:groupId", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/");
  }

  const accessToken = req.session.token;
  const groupId = req.params.groupId;

  if (!groupId) {
    console.error("No Group ID provided");
    return res.status(400).json({ error: "Group ID is required" });
  }

  try {
    const members = await getGroupMembershipAnalyzer(groupId, accessToken);
    res.json(members);
  } catch (error) {
    console.error("Error fetching group members:", error);
    res.status(500).json({ error: "Failed to retrieve group members" });
  }
});

module.exports = router;
