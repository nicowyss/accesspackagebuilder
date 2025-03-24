document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch groups data
    const groupResponse = await fetch("/buildermanual/group-members");
    const groups = await groupResponse.json();

    // Fetch companies and departments
    const filterResponse = await fetch("/buildermanual/companies-departments");
    const { companies, departments } = await filterResponse.json();

    const allGroupsList = document.getElementById("all-groups");
    const defaultGroupList = document.getElementById("default-group");
    const companyGroupList = document.getElementById("company-group");
    const departmentGroupList = document.getElementById("department-group");

    // Define group colors based on groupType
    const groupColors = {
      "Mail-Security": "#f4b400",      // Yellow
      "Distribution List": "#f4b400",      // Yellow
      "Security": "#4285f4",  // Blue
      "On-Premise": "#800080", // Purple
      "M365": "#db4437",      // Red
      "Dynamic": "#0f9d58",   // Green
    };

    // Populate All Groups list (only top 300)
    groups.slice(0, 300).forEach((group) => {
      if (!group.groupType || group.groupType === "Unknown") return; // Skip groups without groupType

      const listItem = document.createElement("li");

      let groupTypeLabel = group.groupType; // Default label
      let isFixedItem = false; // Flag for fixed-item

      // Apply color based on group type
      listItem.style.color = groupColors[groupTypeLabel] || "#6c757d";

      // Apply class based on fixed-item condition
      listItem.className = isFixedItem
        ? "sortable-item fixed-groups"
        : "sortable-item";
      listItem.dataset.id = group.id;
      listItem.innerHTML = `<strong>${group.displayName}</strong><br><p>(Members: ${group.count}) - ${groupTypeLabel}</p>`;

      allGroupsList.appendChild(listItem);
    });

    // Populate Company Group with fixed filter items
    companies.forEach((company) => {
      const listItem = document.createElement("li");
      listItem.className = "sortable-item fixed-item"; // Fixed styling
      listItem.dataset.id = `company-${company}`;
      listItem.innerHTML = `<strong>${company}</strong>`;
      companyGroupList.appendChild(listItem);
    });

    // Populate Department Group with fixed filter items
    departments.forEach((department) => {
      const listItem = document.createElement("li");
      listItem.className = "sortable-item fixed-item"; // Fixed styling
      listItem.dataset.id = `department-${department}`;
      listItem.innerHTML = `<strong>${department}</strong>`;
      departmentGroupList.appendChild(listItem);
    });

    // Define separate sortable configurations for each column
    const sortableConfigAllGroups = {
      group: {
        name: "shared",
        pull: true, // Items can be dragged out
        put: true, // Items can be dropped into this column
      },
      animation: 150,
      ghostClass: "ghost",
      scroll: true,
      scrollSensitivity: 100,
      scrollSpeed: 10,
      filter: ".fixed-groups", // Blocks moving fixed items
      onMove: (evt) => !evt.related.classList.contains("fixed-groups"), // Blocks moving fixed items
    };

    const sortableConfigDefaultGroup = {
      group: {
        name: "shared",
        pull: true, // Clone the items dragged from other columns (no removal from origin)
        put: true, // Allow dropping into this column
      },
      animation: 150,
      ghostClass: "ghost",
      scroll: true,
      scrollSensitivity: 100,
      scrollSpeed: 10,
    };

    const sortableConfigCompanyGroup = {
      group: {
        name: "shared",
        pull: true, // Allows dragging out
        put: true, // Allows dropping into this column
      },
      animation: 200,
      ghostClass: "ghost",
      scroll: true,
      scrollSensitivity: 100,
      scrollSpeed: 15,
      filter: ".fixed-item", // Blocks moving fixed items
      onMove: (evt) => !evt.related.classList.contains("fixed-item"), // Blocks moving fixed items
    };

    const sortableConfigDepartmentGroup = {
      group: {
        name: "shared",
        pull: true, // Allows dragging out
        put: true, // Allows dropping into this column
      },
      animation: 100,
      ghostClass: "ghost",
      scroll: true,
      scrollSensitivity: 80,
      scrollSpeed: 10,
      filter: ".fixed-item", // Blocks moving fixed items
      onMove: (evt) => !evt.related.classList.contains("fixed-item"), // Blocks moving fixed items
    };

    // Initialize sortable lists with separate configurations
    Sortable.create(allGroupsList, sortableConfigAllGroups);
    Sortable.create(defaultGroupList, sortableConfigDefaultGroup);
    Sortable.create(companyGroupList, sortableConfigCompanyGroup);
    Sortable.create(departmentGroupList, sortableConfigDepartmentGroup);

    // Create the Download JSON button manually if not already in HTML
    const downloadButton = document.getElementById("download-json-btn-manual");

    if (downloadButton) {
      downloadButton.addEventListener("click", function () {
        console.log("Download button clicked");

        const data = {
          defaultAccessPackage: {
            Default: getDefaultAccessPackages(defaultGroupList),
          },
          companyAccessPackages: getAccessPackages(companyGroupList, "company"),
          departmentAccessPackages: getAccessPackages(
            departmentGroupList,
            "department"
          ),
        };

        const jsonData = JSON.stringify(data, null, 2);

        // Create a Blob from the JSON data
        const blob = new Blob([jsonData], { type: "application/json" });

        // Create a link to trigger download
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "access-packages.json"; // File name for download
        link.click();
      });
    } else {
      console.log("Button not found! Please check the ID of the button.");
    }

    // Helper function to trim the name (Remove Members: count)
    function trimGroupName(name) {
      return name.split("(")[0].trim();
    }

    // Helper function to create the access package structure for Default Column
    function getDefaultAccessPackages(list) {
      const accessPackages = [];

      // Loop through all items in the Default column
      list.querySelectorAll(".sortable-item").forEach((item) => {
        const itemName = trimGroupName(item.textContent);
        accessPackages.push(itemName); // Add group name directly
      });

      return accessPackages;
    }

    // Helper function to create the access package structure for Companies and Departments
    function getAccessPackages(list, type) {
      const accessPackages = {};
      let currentFixedItem = null;
      let hasGroupsUnderCurrent = false; // Flag to track if the current fixed-item has associated groups

      // Loop through all items in the list (companies or departments)
      list
        .querySelectorAll(".sortable-item")
        .forEach((item, index, allItems) => {
          const itemName = trimGroupName(item.textContent);

          if (item.classList.contains("fixed-item")) {
            // This is a fixed item (company or department), check if it has associated groups
            hasGroupsUnderCurrent = false; // Reset flag for this fixed-item

            // Check if the next item (if any) is not a fixed-item (i.e., it is a group)
            for (let i = index + 1; i < allItems.length; i++) {
              if (!allItems[i].classList.contains("fixed-item")) {
                hasGroupsUnderCurrent = true; // There are groups under this fixed-item
                break;
              }
            }

            if (hasGroupsUnderCurrent) {
              // Only add to the second layer if it has associated groups below it
              currentFixedItem = itemName;
              accessPackages[currentFixedItem] = []; // Create an empty array for this second layer
            } else {
              currentFixedItem = null; // No groups under this fixed-item, so ignore it
            }
          } else {
            // This is a group, add it under the current fixed item (second layer) if there is one
            if (currentFixedItem) {
              accessPackages[currentFixedItem].push(itemName); // Add group to the third layer
            }
          }
        });

      // Filter out fixed-items that have no groups under them
      for (const key in accessPackages) {
        if (accessPackages[key].length === 0) {
          delete accessPackages[key]; // Remove the fixed-item from the result if it has no groups
        }
      }

      return accessPackages;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
