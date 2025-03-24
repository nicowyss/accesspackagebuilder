const express = require("express");
const router = express.Router();
const { getUserInfo, getPowerShellScript } = require("../auth"); // Import functions from core auth.js

// Route to render the deploy page
router.get("/", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/"); // Redirect to home if session data is missing
  }

  const accessToken = req.session.token;

  try {
    // Fetch user list using the access token

    const users = await getUserInfo(accessToken);
    const highlightedCode = await getPowerShellScript(accessToken);

    res.render("deploy", {
      tenantId: req.session.tenantId,
      displayName: req.session.displayName,
      userPrincipalName: req.session.userPrincipalName,
      highlightedCode: highlightedCode,
    });
  } catch (error) {
    console.error("Error fetching users list:", error);
    res.status(500).send("Error fetching users list");
  }
});

module.exports = router;
