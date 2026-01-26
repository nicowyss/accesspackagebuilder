var express = require("express");
var router = express.Router();
const insightsClient = require("../appInsightsClient");

// GET home page
router.get("/", (req, res, next) => {
  if (req.session.token) {
    res.redirect("/success");
  } else {
    if (insightsClient) {
      insightsClient.trackEvent({
        name: "ReadinessPageVisited",
        properties: {
          page: req.originalUrl,
          referrer: req.get("Referrer") || "direct",
          userAgent: req.get("User-Agent"),
        },
      });
    }
    res.render("readiness", {
      title: "Entra Access Package Readiness Check | Identity Governance Assessment",
      description:
        "Assess your Microsoft Entra ID environment readiness for Access Packages and Identity Governance. Free readiness checklist for Entra Entitlement Management implementation.",
      canonical: "https://accesspackagebuilder.dev/readiness",
    });
  }
});

module.exports = router;
