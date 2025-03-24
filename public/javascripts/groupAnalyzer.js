document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch groups data
    const groupResponse = await fetch("/buildermanual/group-members");
    const fetechedgroups = await groupResponse.json();

    // Filter out groups with undefined groupType and limit to the first 300
    const groups = fetechedgroups.filter(group => group.groupType !== 'Unknown').slice(0, 300);

    // Populate dropdown with group options
    const groupSelect = document.getElementById("groupSelect");
    groups.forEach((group) => {
      const option = document.createElement("option");
      option.value = group.id;
      option.textContent = `${group.displayName} (${group.count} members)`;
      groupSelect.appendChild(option);
    });

    // Event listener to trigger Group Membership Analyzer
    groupSelect.addEventListener("change", async () => {
      const groupId = groupSelect.value;
      if (groupId) {
        fetchGroupMembers(groupId);
      } else {
        $("#groupmembershiptable").DataTable().clear().draw(); // Clear table if no group is selected
      }
    });

    // Initialize DataTable on page load
    initializeDataTable();
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
});

// Initializes DataTable (empty at first)
function initializeDataTable() {
  $("#groupmembershiptable").DataTable({
    paging: true,
    lengthChange: true,
    responsive: true,
    info: true,
    searching: true,
    ordering: true,
    pageLength: 10, // Number of rows per page
    columns: [
      { title: "Account Enabled" },
      { title: "User Type" },
      { title: "Name" },
      { title: "Department" },
      { title: "Office Location" },
      { title: "Country" },
      { title: "Company Name" },
    ],
    language: {
      search: "🔍 Search:",
      lengthMenu: "Show _MENU_ entries",
      info: "Showing _START_ to _END_ of _TOTAL_ members",
      emptyTable: "No members found.",
    },
    destroy: true, // Allows re-initialization with new data
  });
}

// Fetches group members from the API
async function fetchGroupMembers(groupId) {
  try {
    const response = await fetch(`/buildermanual/group-membership/${groupId}`);
    const members = await response.json();

    if (!members || members.length === 0) {
      $("#groupmembershiptable").DataTable().clear().draw(); // Clear table if no data
      return;
    }

    // Convert data into DataTable format
    const formattedData = members.map((member) => [
      member.accountEnabled ? "✔️ Enabled" : "❌ Disabled",
      member.userType || "N/A",
      member.displayName || "N/A",
      member.department || " ",
      member.officeLocation || " ",
      member.country || " ",
      member.companyName || " ",
    ]);

    // Ensure DataTable is initialized before updating
    const table = $("#groupmembershiptable").DataTable();
    table.clear();
    table.rows.add(formattedData).draw(); // Update table with new data

  } catch (error) {
    console.error("Error fetching group members:", error);
  }
}
