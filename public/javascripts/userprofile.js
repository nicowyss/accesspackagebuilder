document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("userProfileToggle");
  const dropdownMenu = document.getElementById("userProfileDropdown");

  // Toggle dropdown visibility
  toggleButton.addEventListener("click", () => {
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none";
    } else {
      dropdownMenu.style.display = "block";
    }
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (event) => {
    if (
      !toggleButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.style.display = "none";
    }
  });
});
