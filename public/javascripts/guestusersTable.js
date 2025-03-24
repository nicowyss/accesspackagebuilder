$(document).ready(function () {
  var table = $("#guestUsersTable").DataTable({
    ajax: {
      url: "/guestAccess/guestUsersTable",
      dataSrc: "", // Directly use the array of guest users
    },
    columns: [
      {
        title: "Account Enabled",
        data: "accountEnabled",
        render: function (data) {
          return data ? "✔️ Enabled" : "❌ Disabled"; // Format account status
        },
      },
      {
        title: "Display Name",
        data: "displayName",
      },
      {
        title: "Email",
        data: "mail",
        defaultContent: "N/A", // Handle cases where mail is missing
      },
      {
        title: "Domain",
        data: "domain",
      },
      {
        title: "Active Roles",
        data: "roles.active",
        render: function (data) {
          return data.length > 0 ? data.join(", ") : "None";
        },
      },
      {
        title: "Eligible Roles",
        data: "roles.eligible",
        render: function (data) {
          return data.length > 0 ? data.join(", ") : "None";
        },
      },
      {
        data: "groups",
        title: "Groups",
        render: function (data) {
          return data
            .map(group => {
              let emoji = "❓"; // Default emoji
              let groupTypeLabel = group.type; // Read groupTypeLabel from JSON

              // Assign emojis based on groupTypeLabel
              switch (groupTypeLabel) {
                case "Dynamic":
                  emoji = "🔄"; // Dynamic
                  break;
                case "M365":
                  emoji = "🔷"; // M365
                  break;
                case "On-Premise":
                  emoji = "🏢"; // On-Premise
                  break;
                case "Mail-Security":
                  emoji = "📬"; // Mail-Security
                  break;
                case "Distribution List":
                  emoji = "📩"; // Distribution List
                  break;
                case "Security":
                  emoji = "🔐"; // Security
                  break;
              }

              return `${emoji} ${group.name} (${groupTypeLabel})`;
            })
            .join("<br>"); // Separate groups with line breaks
        }
      },
      {
        title: "Creation Type",
        data: "creationType",
      },
      {
        title: "Risk Score",
        data: "riskScore",
        render: function (data) {
          if (data === "High") return "🔴 High";
          if (data === "Medium") return "🟡 Medium";
          if (data === "Low") return "🟢 Low";
          return "⚪ Unknown"; // Default if no value
        },
      },
    ],
    responsive: true, // Make it mobile-friendly
    lengthMenu: [10, 25, 50, 100], // Allow different page sizes
    pageLength: 10, // Default to 10 entries per page
    processing: true, // Show processing indicator
    language: {
      emptyTable: "No guest users available",
      loadingRecords: "Loading...",
      lengthMenu: "Show _MENU_ entries",
      search: "Search:",
      zeroRecords: "No matching users found",
    },
    initComplete: function () {
      var api = this.api();
      var filterContainer = $("#filter-container");

      // Filter columns by index
      var filterColumns = {
        3: "Domain",
        4: "Active Roles",
        5: "Eligible Roles",
        8: "Risk Score",
      };

      Object.keys(filterColumns).forEach(function (index) {
        var column = api.column(index);
        var columnName = filterColumns[index];

        var select = $('<select><option value="">' + columnName + '</option></select>')
          .appendTo(filterContainer)
          .on("change", function () {
            var val = $(this).val();
            column.search(val ? "^" + val + "$" : "", true, false).draw();
          });

        // Populate filter options
        column
          .data()
          .unique()
          .sort()
          .each(function (d) {
            select.append('<option value="' + d + '">' + d + "</option>");
          });
      });

      // Reset button functionality
      $("#reset-filters-btn").on("click", function () {
        table.search("").columns().search("").draw();
        $("#filter-container select").val("").trigger("change");
      });
    },
  });
});
