const express = require("express");
const router = express.Router();
const { getUsersList, getIdentityGovernanceStatus } = require("../auth"); // Import functions from core auth.js

// Route to handle the success page after login
router.get("/", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/"); // Redirect to home if session data is missing
  }

  const accessToken = req.session.token;

  try {
    // Fetch user list using the access token
    const users = await getUsersList(accessToken);
    const status = await getIdentityGovernanceStatus(accessToken);
    req.users = users;
    req.status = status;

    res.render("overview", {
      tenantId: req.session.tenantId,
      displayName: req.session.displayName,
      userPrincipalName: req.session.userPrincipalName, // Pass the username to the view
      users,
      status, // Pass the fetched users list to the view
    });
  } catch (error) {
    console.error("Error fetching users list:", error); // Debugging statement
    res.status(500).send("Error fetching users list");
  }
});

router.get("/update-users", async (req, res) => {
  const accessToken = req.session.token; // Assuming you store the access token in the session
  if (!accessToken) {
    console.error("Access token not found in session");
    return res.status(401).send("Access token not found");
  }

  try {
    
    const users = req.users;
    res.json(users); // Return the updated user list as JSON
  } catch (error) {
    console.error("Error fetching users list:", error); // Debugging statement
    res.status(500).send("Error fetching users list");
  }
});

module.exports = router;
