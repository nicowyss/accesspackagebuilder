const express = require("express");
const router = express.Router();
const { listUsersAndGroups, getUserInfo } = require("../auth"); // Import the function from auth.js
const { findCommonGroups } = require("../apBuilderAlgo"); // Import the algorithm function

router.get("/", async (req, res) => {
  if (!req.session.token || !req.session.tenantId) {
    console.error("Access token or tenant ID not found in session");
    return res.redirect("/"); // Redirect to home if session data is missing
  }

  const accessToken = req.session.token;

  try {
    // Fetch user list using the access token
    const users = await getUserInfo(accessToken);
    res.render("builder", {
      tenantId: req.session.tenantId,
      displayName: req.session.displayName,
      userPrincipalName: req.session.userPrincipalName,
    });

  } catch (error) {
    console.error("Error fetching users list:", error); // Debugging statement
    res.status(500).send("Error fetching users list");
  }
});


const fetchUserData = async (req, res, next) => {
  if (req.data) {
    return next(); // Data is already available
  }

  try {
    if (!req.session.token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first." });
    }
    
    const data = await listUsersAndGroups(req.session.token);
    req.data = data; // Cache data in the request
    next();
  } catch (error) {
    console.error("Error fetching user and group data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
};

// Route to fetch data for visualization
router.get("/data", fetchUserData, (req, res) => {
  try {
    if (!req.session.token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first." });
    }

    res.json(req.data); // Send the data as JSON
  } catch (error) {
    console.error("Error fetching user and group data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

// Route to fetch data for visualization and generate access package tables
router.get("/access-packages", fetchUserData, (req, res) => {
  try {
    if (!req.session.token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Please log in first." });
    }
    const accessPackageData = findCommonGroups(req.data);
    res.json(accessPackageData); // Render builder.ejs and pass the data
  } catch (error) {
    console.error("Error fetching user and group data:", error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

module.exports = router;
