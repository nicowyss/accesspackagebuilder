let network; // This will store the network instance
let allNodes = []; // To store all nodes before filtering
let allEdges = []; // To store all edges before filtering
let activeCompanyFilters = new Set(); // Store active company filters
let activeDepartmentFilters = new Set(); // Store active department filters

// Event listener for the Reset Map button
document.getElementById("reset-map-btn").addEventListener("click", () => {
  fetchData(); // Re-fetch and re-render the original data
});

async function fetchData() {
  try {
    const response = await fetch("/builder/data");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();

    visualizeData(data); // Initial visualization
    createFilterPanels(data); // Create department and company buttons dynamically
  } catch (error) {
    console.error("Error fetching or visualizing data:", error);
  }
}

function visualizeData(data) {
  console.log("Start");
  const nodes = [];
  const edges = [];
  const departments = {}; // To group users by department
  const companies = new Set(); // To store all companies

  // Store nodes and edges globally for dynamic filtering later
  allNodes = nodes; // Store nodes
  allEdges = edges; // Store edges

  data.forEach((user) => {
    companies.add(user.companyName);

    // Create a group for each department
    if (!departments[user.department]) {
      departments[user.department] = {
        label: user.department || "N/A",
        users: [],
      };
    }
    departments[user.department].users.push(user);

    // Add user as a node with additional attributes (department, companyName)
    const userNode = {
      id: user.userId,
      label: user.displayName,
      group: user.department,
      shape: "image",
      image:
        user.userType === "Guest"
          ? "/images/user-guest.png"
          : "/images/user.png",
      size: 40,
      zIndex: 3,
    };
    nodes.push(userNode);

    // Add CompanyName as a node if not already added
    if (
      user.companyName &&
      !nodes.some((node) => node.id === `companyName-${user.companyName}`)
    ) {
      nodes.push({
        id: `companyName-${user.companyName}`,
        label: user.companyName,
        group: "companyName",
        size: 60,
        zIndex: 0,
      });
    }

    // Create an edge between the user and their companyName
    if (user.companyName) {
      edges.push({
        from: user.userId,
        to: `companyName-${user.companyName}`,
        color: "#ffa400", // Optional: Set edge color
      });
    }

    // Add department as a node if not already added
    if (
      user.department &&
      !nodes.some((node) => node.id === `department-${user.department}`)
    ) {
      nodes.push({
        id: `department-${user.department}`,
        label: user.department,
        group: "department",
        size: 30,
        zIndex: 2,
      });
    }

    // Create an edge between the user and their department
    if (user.department) {
      edges.push({
        from: user.userId,
        to: `department-${user.department}`,
        color: "#ffa500", // Optional: Set edge color
      });
    }

    // Add groups as nodes and edges
    user.groups.forEach((group) => {
      if (group.type === "Unknown") return; // Skip unknown groups

      // Select the appropriate icon based on group type
      let groupIcon = "/images/groups.png"; // Default icon
      if (group.type === "Dynamic") groupIcon = "/images/groups-dyn.png";
      else if (group.type === "M365") groupIcon = "/images/groups-m365.png";
      else if (group.type === "On-Premise") groupIcon = "/images/groups-onprem.png";
      else if (group.type === "Mail-Security") groupIcon = "/images/groups-mail.png";
      else if (group.type === "Distribution List") groupIcon = "/images/groups-mail.png";
      else if (group.type === "Security") groupIcon = "/images/groups-sec.png";

      // Add group node if not already added
      if (!nodes.some((node) => node.id === group.id)) {
        nodes.push({
          id: group.id,
          label: group.displayName,
          group: "groups",
          shape: "image",
          image: groupIcon,
          size: 30,
          zIndex: 1,
        });
      }

      // Create an edge between the user and the group
      edges.push({
        from: user.userId,
        to: group.id,
      });
    });
  });

  nodes.forEach((node) => {
    if (!node.id) console.error("Node without ID:", node);
  });
  edges.forEach((edge) => {
    if (!edge.from || !edge.to) console.error("Malformed edge:", edge);
  });

  // Calculate and log the total number of nodes and edges
  const totalNodes = nodes.length;
  const totalEdges = edges.length;

  console.log("Total Nodes:", totalNodes);
  console.log("Total Edges:", totalEdges);

  // Send the count to the frontend (you can use DOM, alerts, or other methods)
  document.getElementById(
    "nodeCount"
  ).textContent = `Total Nodes: ${totalNodes}`;
  document.getElementById(
    "edgeCount"
  ).textContent = `Total Edges: ${totalEdges}`;

  const limitedNodes = nodes.slice(0, 1000);
  const limitedEdges = edges.slice(0, 1000);

  // Create a network
  const container = document.getElementById("network");
  const dataSet = {
    nodes: new vis.DataSet(limitedNodes),
    edges: new vis.DataSet(limitedEdges),
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 16,
    },
    edges: {
      smooth: true,
    },
    physics: {
      enabled: true,
      stabilization: {
        enabled: true,
        iterations: 2000, // Lower iterations for faster stabilization
      },
      forceAtlas2Based: {
        gravitationalConstant: -30, // Adjust gravitational pull between nodes
        centralGravity: 0.005, // Gravity toward the center of the network
        springLength: 150, // Ideal edge length
        avoidOverlap: 1, // Prevents nodes from overlapping
      },
      solver: "forceAtlas2Based", // Use Force Atlas 2 for layout calculations
      maxVelocity: 25, // Limit node velocity for smoother layouts
      timestep: 0.4, // Slightly reduce timestep for smoother simulation
    },
    layout: {
      improvedLayout: false, // Disable improvedLayout for better performance
    },
    interaction: {
      tooltipDelay: 200, // Delay before tooltips appear
    },
    groups: {
      companyName: {
        shape: "image",
        image: "/images/companyName.png",
      },
      department: {
        shape: "image",
        image: "/images/department.png",
      }
    },
  };

  network = new vis.Network(container, dataSet, options);
  console.log("Network is successfully generated");
  // Store all nodes and edges for filtering
  window.allNodes = nodes;
  window.allEdges = edges;
  window.departments = departments; // Store departments for filtering
  window.companies = companies; // Store companies for filtering

  network.on("stabilizationProgress", function (params) {
    var maxWidth = 496;
    var minWidth = 20;
    var widthFactor = params.iterations / params.total;
    var width = Math.max(minWidth, maxWidth * widthFactor);

    document.getElementById("bar").style.width = width + "px";
    document.getElementById("text").innerText =
      Math.round(widthFactor * 100) + "%";
  });
  network.once("stabilizationIterationsDone", function () {
    document.getElementById("text").innerText = "100%";
    document.getElementById("bar").style.width = "496px";
    document.getElementById("loadingBar").style.opacity = 0;
    // really clean the dom element
    setTimeout(function () {
      document.getElementById("loadingBar").style.display = "none";
    }, 500);
  });
}

// Create department and company filter panels dynamically
function createFilterPanels(data) {
  // Create department buttons dynamically based on data
  const departmentPanel = document.getElementById("department-filter-panel");
  departmentPanel.innerHTML = ""; // Clear existing buttons
  const departmentButtons = new Set();

  data.forEach((user) => {
    if (user.department) {
      departmentButtons.add(user.department);
    }
  });

  departmentButtons.forEach((department) => {
    const button = document.createElement("button");
    button.innerText = department;
    button.classList.add("filter-btn");

    // Toggle department filter
    button.addEventListener("click", () =>
      filterByDepartment(department, button)
    );
    departmentPanel.appendChild(button);
  });

  // Create company buttons dynamically based on data
  const companyPanel = document.getElementById("company-filter-panel");
  companyPanel.innerHTML = ""; // Clear existing buttons
  const companyButtons = new Set();

  data.forEach((user) => {
    if (user.companyName) {
      companyButtons.add(user.companyName);
    }
  });

  companyButtons.forEach((company) => {
    const button = document.createElement("button");
    button.innerText = company;
    button.classList.add("filter-btn");

    // Toggle company filter
    button.addEventListener("click", () => filterByCompany(company, button));
    companyPanel.appendChild(button);
  });
}

function filterByDepartment(department) {
  console.log(`Filtering by department: ${department}`);

  // Step 1: Filter nodes to keep only those in the specified department
  const filteredNodes = window.allNodes.filter(
    (node) => node.group === department
  );
  const filteredNodeIds = filteredNodes.map((node) => node.id);

  console.log("Filtered nodes:", filteredNodes);
  console.log("Filtered node IDs:", filteredNodeIds);

  // Step 2: Filter edges connected to at least one filtered node
  const filteredEdges = window.allEdges.filter(
    (edge) =>
      filteredNodeIds.includes(edge.from) || filteredNodeIds.includes(edge.to)
  );

  console.log("Filtered edges:", filteredEdges);

  // Step 3: Include any additional nodes referenced by the edges
  const additionalNodeIds = new Set();
  filteredEdges.forEach((edge) => {
    if (!filteredNodeIds.includes(edge.from)) additionalNodeIds.add(edge.from);
    if (!filteredNodeIds.includes(edge.to)) additionalNodeIds.add(edge.to);
  });

  const additionalNodes = window.allNodes.filter((node) =>
    additionalNodeIds.has(node.id)
  );

  console.log("Additional nodes to include:", additionalNodes);

  // Combine filtered nodes with additional nodes
  const allIncludedNodes = [...filteredNodes, ...additionalNodes];

  console.log("All nodes to display:", allIncludedNodes);

  // Step 4: Update the network with the filtered data
  if (network) {
    network.setData({
      nodes: new vis.DataSet(allIncludedNodes),
      edges: new vis.DataSet(filteredEdges),
    });
  } else {
    console.error("Network is not initialized");
  }
}

// Function to Filter by Company Name
function filterByCompany(companyName) {
  console.log(`Filtering by company: ${companyName}`);

  // Step 1: Filter company nodes
  const filteredCompanyNodes = window.allNodes.filter((node) =>
    node.id.startsWith(`companyName-${companyName}`)
  );

  const companyNodeIds = filteredCompanyNodes.map((node) => node.id);

  // Step 2: Find all user nodes connected to the filtered company nodes
  const connectedUserEdges = window.allEdges.filter((edge) =>
    companyNodeIds.includes(edge.to)
  );

  const connectedUserIds = connectedUserEdges.map((edge) => edge.from);

  const userNodes = window.allNodes.filter((node) =>
    connectedUserIds.includes(node.id)
  );

  // Step 3: Include department nodes connected to the users
  const departmentEdges = window.allEdges.filter(
    (edge) =>
      connectedUserIds.includes(edge.from) && edge.to.startsWith("department-")
  );

  const departmentNodeIds = departmentEdges.map((edge) => edge.to);

  const departmentNodes = window.allNodes.filter((node) =>
    departmentNodeIds.includes(node.id)
  );

  // Step 4: Include only groups where all members belong to the same company
  const validGroupNodes = [];
  const validGroupEdges = [];

  window.allNodes
    .filter((node) => node.group === "groups")
    .forEach((groupNode) => {
      const groupEdges = window.allEdges.filter(
        (edge) => edge.to === groupNode.id
      );

      const groupUserIds = groupEdges.map((edge) => edge.from);

      const allUsersInSameCompany = groupUserIds.every((userId) =>
        connectedUserIds.includes(userId)
      );

      if (allUsersInSameCompany) {
        validGroupNodes.push(groupNode);
        validGroupEdges.push(...groupEdges);
      }
    });

  // Step 5: Filter edges to include all necessary connections
  const filteredEdges = [
    ...connectedUserEdges, // Company-User edges
    ...departmentEdges, // User-Department edges
    ...validGroupEdges, // User-Group edges
  ];

  // Combine all relevant nodes
  const allIncludedNodes = [
    ...filteredCompanyNodes, // Company nodes
    ...userNodes, // User nodes
    ...departmentNodes, // Department nodes
    ...validGroupNodes, // Group nodes
  ];

  console.log("Filtered company nodes:", filteredCompanyNodes);
  console.log("Filtered user nodes:", userNodes);
  console.log("Filtered department nodes:", departmentNodes);
  console.log("Valid group nodes:", validGroupNodes);
  console.log("Filtered edges:", filteredEdges);

  // Step 6: Update the network with the filtered data
  if (network) {
    network.setData({
      nodes: new vis.DataSet(allIncludedNodes),
      edges: new vis.DataSet(filteredEdges),
    });
  } else {
    console.error("Network is not initialized");
  }
}

fetchData(); // Fetch data on page load
