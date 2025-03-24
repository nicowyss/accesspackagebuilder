const express = require("express");
const router = express.Router();
const { getAuthUrl, getToken, getUserInfo, checkUserPermissions  } = require("../auth"); // Import functions from core auth.js

// Login route
router.get("/login", async (req, res) => {
  try {
    let forceConsent = false;
    const accessToken = req.session.accessToken || null;

    // Check if consent is required
    if (accessToken) {
      forceConsent = await checkUserPermissions(accessToken);
    }
    const authUrl = await getAuthUrl(forceConsent); // Generate the Microsoft login URL
    res.redirect(authUrl); // Redirect user to Microsoft login
  } catch (err) {
    res.status(500).send("Error generating authentication URL: " + err.message);
  }
});

// Redirect route
router.get("/redirect", async (req, res) => {
  try {
    // Step 1: Get access token using the code
    const response = await getToken(req.query.code); // Exchange code for tokens
    const { accessToken, idTokenClaims } = response;
    const userInfo = await getUserInfo(accessToken);

    // Step 2: Save token and tenant ID in session
    req.session.token = accessToken;
    req.session.tenantId = idTokenClaims.tid;
    req.session.userPrincipalName = userInfo.userPrincipalName; 
    req.session.displayName = userInfo.displayName;

    // Step 4: Pass the user info and tenant ID to the view
    res.redirect("/success");
  } catch (err) {
    res.status(500).send("Authentication failed: " + err.message);
  }
});

module.exports = router;
