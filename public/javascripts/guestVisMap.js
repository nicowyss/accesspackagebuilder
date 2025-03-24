document.addEventListener("DOMContentLoaded", function () {
  fetch("/guestAccess/guestUsersTable")
    .then((response) => response.json())
    .then((data) => {
      let nodes = [];
      let edges = [];
      let nodeSet = new Set();
      let groupConnections = {}; // Tracks how many users belong to each group
      let highRiskCount = 0;
      let totalGuests = data.length;

      data.forEach((user) => {
        let isHighRisk = user.riskScore === "High";
        let userIcon = isHighRisk ? "/images/user-guest-risk.png" : "/images/user-guest.png";
        let userSize = isHighRisk ? 50 : 40; // High-risk users are larger
        let userEdgeWidth = isHighRisk ? 3 : 1; // High-risk edges are thicker

        if (isHighRisk) highRiskCount++;

        // Add user node
        nodes.push({
          id: user.id,
          label: `${user.displayName}`,
          shape: "image",
          image: userIcon,
          groupType: "user",
          size: userSize,
          zIndex: 3,
        });

        // Process groups
        user.groups.forEach((group) => {
          let groupId = `group-${group.name.replace(/\s+/g, "_")}`;

          if (!nodeSet.has(groupId)) {
            nodes.push({
              id: groupId,
              label: `${group.name} (${group.type})`,
              shape: "image",
              image: "/images/groups-sec.png",
              groupType: "groupNodes",
              size: 30,
              zIndex: 1,
            });
            nodeSet.add(groupId);
          }

          // Track group size
          groupConnections[group.name] = (groupConnections[group.name] || 0) + 1;

          // Connect user to group
          edges.push({
            from: user.id,
            to: groupId,
            width: userEdgeWidth, // Highlight risky connections
          });
        });
      });

      // Sort guests by group connections (top 5 most connected)
      let topConnectedUsers = data
        .map((u) => ({ name: u.displayName, connections: u.groups.length }))
        .sort((a, b) => b.connections - a.connections)
        .slice(0, 5);

      // Sort groups by guest count (top 5 groups)
      let topGroups = Object.entries(groupConnections)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      // Calculate % of high-risk users
      let highRiskPercentage = ((highRiskCount / totalGuests) * 100).toFixed(1);

      // Update the dashboard
      document.getElementById("total-guests").innerText = totalGuests;
      document.getElementById("high-risk-guests").innerText = highRiskCount;
      document.getElementById("high-risk-percentage").innerText = highRiskPercentage + "%";
      document.getElementById("top-connected").innerHTML = topConnectedUsers
        .map((u) => `<li>${u.name} - ${u.connections} groups</li>`)
        .join("");
      document.getElementById("top-groups").innerHTML = topGroups
        .map(([name, count]) => `<li>${name} - ${count} guests</li>`)
        .join("");

      // Create Vis.js network
      let container = document.getElementById("guest-network");
      let networkData = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges),
      };

      let options = {
        nodes: {
          shape: "dot",
        },
        edges: {
          smooth: true,
        },
        physics: {
          enabled: true,
          solver: "forceAtlas2Based",
          forceAtlas2Based: {
            gravitationalConstant: -50,
            centralGravity: 0.01,
            springLength: 100,
            avoidOverlap: 1,
          },
          maxVelocity: 25,
          timestep: 0.4,
        },
        layout: {
          improvedLayout: false,
        },
        interaction: {
          tooltipDelay: 200,
        },
        groups: {
          user: {
            shape: "image",
            image: "/images/user-guest.png",
          },
          groupNodes: {
            shape: "image",
            image: "/images/groups.png",
          },
        },
      };

      new vis.Network(container, networkData, options);
    })
    .catch((error) => console.error("Error fetching data:", error));
});
