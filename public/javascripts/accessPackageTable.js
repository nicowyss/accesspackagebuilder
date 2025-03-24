// Fetches the data from the /access-packages route
function fetchAccessPackageData() {
  return fetch("/builder/access-packages")
    .then((response) => response.json())
    .then((accessPackageData) => {
      // console.log("Access Package Data from Backend:", accessPackageData);
      return accessPackageData; // Return the fetched data for further processing
    })
    .catch((error) => {
      console.error("Error fetching access packages data:", error);
      return null;
    });
}

// Renders the default access package table
function renderDefaultTable(accessPackageData) {
  const defaultTableBody = document.getElementById("defaultAccessPackagesBody");

  // Create a single row for all groups
  const row = document.createElement("tr");
  const staticCell = document.createElement("td");
  staticCell.textContent = "AP-Default";
  const cell = document.createElement("td");

  // Join all group names with a comma and add them to the cell
  cell.textContent = accessPackageData.defaultAccessPackage.join(", ");

  // Append the cell to the row and the row to the table body
  row.appendChild(staticCell);
  row.appendChild(cell);
  defaultTableBody.appendChild(row);
}

// Renders the company access package table
function renderCompanyTable(accessPackageData) {
  const companyTableBody = document.getElementById("companyAccessPackagesBody");

  for (const companyName in accessPackageData.companyAccessPackages) {
    const row = document.createElement("tr");
    const formattedPackageName = "AP-C-" + companyName;
    const companyCell = createTableCell(formattedPackageName); // Company name cell
    const groupsCell = createTableCell(
      accessPackageData.companyAccessPackages[companyName].join(", ")
    ); // Group names cell
    row.appendChild(companyCell);
    row.appendChild(groupsCell);
    companyTableBody.appendChild(row);
  }
}

// Renders the department access package table
function renderDepartmentTable(accessPackageData) {
  const departmentTableBody = document.getElementById(
    "departmentAccessPackagesBody"
  );
  for (const department in accessPackageData.departmentAccessPackages) {
    const row = document.createElement("tr");
    const formattedPackageName = "AP-D-" + department;
    const departmentCell = createTableCell(formattedPackageName); // Department name cell
    const groupsCell = createTableCell(
      accessPackageData.departmentAccessPackages[department].join(", ")
    ); // Group names cell
    row.appendChild(departmentCell);
    row.appendChild(groupsCell);
    departmentTableBody.appendChild(row);
  }
}

// Renders the unassigned groups table
function renderUnassignedGroupsTable(accessPackageData) {
  const unassignedTableBody = document.getElementById("unassignedGroupsBody");

  // Sort unassignedGroups in ascending order by group name
  const sortedUnassignedGroups = accessPackageData.unassignedGroups.sort(
    (a, b) => a.group.localeCompare(b.group)
  );
  sortedUnassignedGroups.forEach((unassigned) => {
    const row = document.createElement("tr");
    const groupCell = createTableCell(unassigned.group); // Unassigned group cell
    const groupTypeCell = createTableCell(unassigned.groupType); // Group type cell
    const userCell = createTableCell(unassigned.userName || unassigned.userId); // Use userName if available, fallback to userId
    const departmentCell = createTableCell(unassigned.userDepartment); // Department cell
    const companyCell = createTableCell(unassigned.userCompany); // Company cell
    row.appendChild(groupCell);
    row.appendChild(groupTypeCell);
    row.appendChild(userCell);
    row.appendChild(departmentCell);
    row.appendChild(companyCell);
    unassignedTableBody.appendChild(row);
  });
}

// Renders the excluded users section
function renderExcludedUsers(accessPackageData) {
  const excludedUsersContainer = document.getElementById(
    "excludedUsersContainer"
  );
  if (
    accessPackageData.excludedUsers &&
    accessPackageData.excludedUsers.length > 0
  ) {
    for (let i = 0; i < accessPackageData.excludedUsers.length; i++) {
      const user = accessPackageData.excludedUsers[i];

      const row = document.createElement("tr");

      const userAccountEnabledCell = document.createElement("td");
      userAccountEnabledCell.textContent = user.userAccountEnabled ? "✔️ Enabled" : "❌ Disabled"; // Use "N/A" if userAccountEnabled is missing

      const userTypeCell = document.createElement("td");
      userTypeCell.textContent = user.userType || "N/A"; // Use "N/A" if UserType is missing

      const userNameCell = document.createElement("td");
      userNameCell.textContent = user.userName || "N/A"; // Use "N/A" if userName is missing

      const departmentCell = document.createElement("td");
      departmentCell.textContent = user.userDepartment || " "; // Use "N/A" if department is missing

      const companyCell = document.createElement("td");
      companyCell.textContent = user.userCompany || " "; // Use "N/A" if company is missing

      // Append the cells to the row
      row.appendChild(userAccountEnabledCell);
      row.appendChild(userTypeCell);
      row.appendChild(userNameCell);
      row.appendChild(departmentCell);
      row.appendChild(companyCell);

      // Append the row to the container
      excludedUsersContainer.appendChild(row);
    }
  } else {
    excludedUsersContainer.textContent = "No excluded users.";
  }
}

// Helper function to create a table row
function createTableRow(accessPackageData) {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  cell.textContent = accessPackageData;
  row.appendChild(cell);
  return row;
}

// Helper function to create a table cell
function createTableCell(accessPackageData) {
  const cell = document.createElement("td");
  cell.textContent = accessPackageData;
  return cell;
}

// Initialize DataTables after all tables are rendered
function initializeDataTables() {
  // Initialize DataTables for each table
  $("#defaultAccessPackages").DataTable({
    paging: true,
    lengthChange: true, // Enable number of items per page
    responsive: true, // Make table responsive
    info: true, // Show table information
    searching: true,
    ordering: true,
    pageLength: 5, // Number of rows per page
  });

  $("#companyAccessPackages").DataTable({
    paging: true,
    lengthChange: true, // Enable number of items per page
    responsive: true, // Make table responsive
    info: true, // Show table information
    searching: true,
    ordering: true,
    pageLength: 5, // Number of rows per page
  });

  $("#departmentAccessPackages").DataTable({
    paging: true,
    lengthChange: true, // Enable number of items per page
    responsive: true, // Make table responsive
    info: true, // Show table information
    searching: true,
    ordering: true,
    pageLength: 5, // Number of rows per page
  });

  $("#unassignedAccessPackages").DataTable({
    paging: true,
    lengthChange: true, // Enable number of items per page
    responsive: true, // Make table responsive
    info: true, // Show table information
    searching: true,
    ordering: true,
    pageLength: 10, // Number of rows per page
  });

  $("#excludedUsers").DataTable({
    paging: true,
    lengthChange: true, // Enable number of items per page
    responsive: true, // Make table responsive
    info: true, // Show table information
    searching: true,
    ordering: true,
    pageLength: 10, // Number of rows per page
  });
}

// Function to trigger JSON download
function triggerDownload(data) {

  if (data.defaultAccessPackage && Array.isArray(data.defaultAccessPackage)) {
    data.defaultAccessPackage = { "Default": data.defaultAccessPackage };
  }

  const jsonBlob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(jsonBlob);
  link.download = "access-packages.json";
  link.click();
  URL.revokeObjectURL(link.href); // Clean up the object URL
}

// Main function to render all tables
function renderTables(accessPackageData) {
  if (accessPackageData) {
    renderDefaultTable(accessPackageData);
    renderCompanyTable(accessPackageData);
    renderDepartmentTable(accessPackageData);
    renderUnassignedGroupsTable(accessPackageData);
    renderExcludedUsers(accessPackageData);
    initializeDataTables();
    // Attach download functionality to the button
    document
      .getElementById("download-json-btn")
      .addEventListener("click", () => triggerDownload(accessPackageData));

    console.log("Finished: All Access Packagee: Loaded");
  } else {
    console.error("Failed to load access package data.");
  }
}

// Initialize everything on page load
window.onload = function () {
  fetchAccessPackageData().then((accessPackageData) =>
    renderTables(accessPackageData)
  );
};
