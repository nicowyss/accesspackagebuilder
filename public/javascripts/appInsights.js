// Initialize a flag to track if quota has been exceeded
let quotaExceeded = false;

// Check if the connection string is available
const connectionString = window.appInsightsConnectionString;

// Initialize Application Insights
try {
  const { ApplicationInsights } = window.Microsoft.ApplicationInsights;

  const appInsights = new ApplicationInsights({
    config: {
      connectionString: connectionString,
      enableAutoRouteTracking: true, // Automatically track route changes
      samplingPercentage: 50, // Adjust if needed to reduce telemetry volume
      disableExceptionTracking: false, // Enable exception tracking
      overridePageViewDuration: true, // Optional: Override page view duration
    },
  });

  appInsights.loadAppInsights();

  // Monitor telemetry failures and check for quota exceeded errors
  appInsights.addTelemetryInitializer((envelope) => {
    // Check if the response status code indicates quota exceeded
    if (envelope.tag && envelope.tag["ai.operation.id"] && envelope.data) {
      // Check if the response status code is related to quota exceeded
      if (envelope.data.statusCode === 439) {
        console.error("Daily quota exceeded. Disabling further telemetry.");
        quotaExceeded = true;  // Set flag when quota exceeded
      }
    }
  });

  // Track the initial page view
  appInsights.trackPageView();

  // Custom function to send telemetry only if quota is not exceeded
  window.trackPageVisit = function (pageName) {
    if (quotaExceeded) {
      return false;  // Don't track events if the quota is exceeded
    }

    if (pageName) {
      appInsights.trackEvent({ name: `UserVisited-${pageName}` });
    } else {
      console.warn("trackPageVisit called without a pageName");
    }
  };

  // Optional: Add custom telemetry processors
  appInsights.addTelemetryInitializer((envelope) => {
    if (!connectionString) {
      envelope.tags["ai.cloud.role"] = "NoConnectionString";
    }
  
    // Ignore less critical errors (e.g., 404 errors from missing resources)
    if (envelope.data && envelope.data.responseCode) {
      const ignoredErrors = [400, 401, 403, 404, 408]; // Common "expected" errors
      if (ignoredErrors.includes(envelope.data.responseCode)) {
        return false; // Prevents sending these events
      }
    }
  });
  
  // Expose functions to the global window object for external usage
  window.setUserContext = function (tenantId, displayName, userPrincipalName) {
    appInsights.context.user.id = tenantId || "UnknownTenant";
    appInsights.context.user.authenticatedUserId = userPrincipalName || "UnknownUser";
    appInsights.context.user.accountId = displayName || "UnknownDisplayName";
  };
} catch (error) {
  console.error("Error initializing Application Insights:", error);
}
