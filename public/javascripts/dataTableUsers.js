$(document).ready(function () {
    var table = $('.user-table').DataTable({
        paging: true, // Enable pagination
        lengthChange: true, // Enable number of items per page
        searching: true, // Enable search box
        ordering: true, // Enable column ordering
        info: true, // Show table information
        responsive: true, // Make table responsive
        processing: true, // Show processing indicator
        columnDefs: [
            // Highlight empty cells with red background
            {
                targets: '_all',
                createdCell: function (td, cellData) {
                    if (cellData === "" || cellData === null) {
                        $(td).css('background-color', '#DC143C');
                    }
                }
            }
        ],
        initComplete: function () {
            var api = this.api();

            // Create external filter controls
            api.columns().every(function (index) {
                var column = this;

                // Create a dropdown for each column and append it to a container
                var filterContainer = $('#filter-container');
                var columnName = $(column.header()).text(); // Get the column name
                var select = $('<select><option value="">' + columnName + '</option></select>')
                    .appendTo(filterContainer)
                    .on('change', function () {
                        var val = $(this).val();
                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                    });

                // Populate filter options
                column.data().unique().sort().each(function (d) {
                    select.append('<option value="' + d + '">' + d + '</option>');
                });
            });
        }
    });

    // Reset Filters Button functionality
    $('#reset-filters-btn').on('click', function () {
        // Clear all column search inputs
        $('.user-table').DataTable().search('').columns().search('').draw();

        // Reset dropdowns to default (empty) state
        $('#filter-container select').each(function () {
            $(this).val('').trigger('change'); // Reset the dropdown
        });
    });
});
