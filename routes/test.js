/**
 * Test Routes for Performance Monitoring
 * 
 * Usage:
 *   GET /test/compare-full  - Full performance test with real Graph API data
 */

const express = require("express");
const router = express.Router();
const { listUsersAndGroups } = require("../auth");
const { findCommonGroups } = require("../apBuilderAlgo");

// Simple inline benchmark helper
function benchmark(label) {
  const start = performance.now();
  console.log(`⏱️  Starting: ${label}`);
  return {
    end: () => {
      const elapsed = performance.now() - start;
      console.log(`✅ ${label}: ${elapsed.toFixed(2)}ms`);
      return elapsed;
    }
  };
}

/**
 * Full performance test with real Microsoft Graph data
 * GET /test/compare-full
 * Requires authentication
 */
router.get("/compare-full", async (req, res) => {
  if (!req.session.token) {
    return res.status(401).json({ 
      error: "Please log in first to test with real data",
      hint: "Go to / and authenticate, then return here"
    });
  }

  try {
    console.log("\n🧪 Performance test with real Graph API data...\n");

    const results = {
      userFetch: {},
      algorithm: {},
      total: {},
    };

    // Test 1: Fetch users with groups (using optimized batch API)
    console.log("--- Fetching users and groups ---");
    const timer1 = benchmark("listUsersAndGroups (batch API)");
    const data = await listUsersAndGroups(req.session.token);
    results.userFetch.fetchMs = timer1.end().toFixed(2);
    results.userFetch.userCount = data.length;

    // Test 2: Algorithm performance
    console.log("\n--- Running algorithm ---");
    const timer2 = benchmark("findCommonGroups (optimized)");
    const accessPackages = findCommonGroups(data);
    results.algorithm.processMs = timer2.end().toFixed(2);

    // Total time
    const totalMs = parseFloat(results.userFetch.fetchMs) + parseFloat(results.algorithm.processMs);
    results.total = {
      totalMs: totalMs.toFixed(2),
      totalSeconds: (totalMs / 1000).toFixed(2),
    };

    // Summary of results
    results.summary = {
      users: data.length,
      excludedUsers: accessPackages.excludedUsers?.length || 0,
      defaultGroups: accessPackages.defaultAccessPackage?.length || 0,
      companyPackages: Object.keys(accessPackages.companyAccessPackages || {}).length,
      departmentPackages: Object.keys(accessPackages.departmentAccessPackages || {}).length,
      unassignedGroups: accessPackages.unassignedGroups?.length || 0,
    };

    console.log("\n✅ Test complete!\n");
    res.json(results);

  } catch (error) {
    console.error("Test error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
