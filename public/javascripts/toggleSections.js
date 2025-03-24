document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleExcludedUsers');
    const content = document.getElementById('excludedUsersContent');

    toggleButton.addEventListener('click', function () {
        if (content.style.display === 'none' || !content.style.display) {
            content.style.display = 'block'; // Show the section
            toggleButton.innerHTML = '⬆️ Excluded Users ⬆️'; // Change arrow to up
        } else {
            content.style.display = 'none'; // Hide the section
            toggleButton.innerHTML = '⬇️ Excluded Users ⬇️'; // Change arrow to down
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleUnassignedGroups');
    const content = document.getElementById('excludedUnassignedGroupContent');

    toggleButton.addEventListener('click', function () {
        if (content.style.display === 'none' || !content.style.display) {
            content.style.display = 'block'; // Show the section
            toggleButton.innerHTML = '⬆️ Unassigned Groups ⬆️'; // Change arrow to up
        } else {
            content.style.display = 'none'; // Hide the section
            toggleButton.innerHTML = '⬇️ Unassigned Groups ⬇️'; // Change arrow to down
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleMapFilters');
    const content = document.getElementById('filter-panels');

    toggleButton.addEventListener('click', function () {
        if (content.style.display === 'none' || !content.style.display) {
            content.style.display = 'block'; // Show the section
            toggleButton.innerHTML = '⬆️ Filters ⬆️'; // Change arrow to up
        } else {
            content.style.display = 'none'; // Hide the section
            toggleButton.innerHTML = '⬇️ Filters ⬇️'; // Change arrow to down
        }
    });
});
