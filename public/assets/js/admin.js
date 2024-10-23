/* const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;  */

$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var employeeId = $("#employee-id");
    var name = $('#name')
    var department = $('#deptSelect');
    var title = $("#title");
    var salary = $('#salary');
    var status = $('#statusSelect');
    var userName = $('#hidden-employeeId').text();

    $(document).on("click", "#employeeSubmit", handleFormSubmit);

    getAllEmployees();

    // A function for handling what happens when the form to create a new employee is submitted
    function handleFormSubmit() {
        // Wont submit if data is missing.

        console.log(employeeId.val().trim());
        console.log(department.text().trim());
        console.log(name.val().trim());
        console.log(title.val().trim());

        if (!employeeId.val().trim() || !name.val().trim() || !title.val().trim()) {
            return;
        }
        // Constructing a newEmployee object to hand to the database
        var newEmployee = {
            employee_id: employeeId.val().trim(),
            name: name.val().trim(),
            dept: department.val().trim(),
            title: title.val().trim(),
            salary: salary.val().trim(),
            status: status.val().trim(),
        };

        if (userName && (userName != "")) {
            console.log("fetching updates");
            updateEmployee(newEmployee);
        } else {
            submitEmployee(newEmployee);
        }
    };

    // Submits a new employee entry
    function submitEmployee(data) {
        $.post("/api/employees", data)
        .then(getAllEmployees);
    }

    
    // Function for creating a new list row for timeblocks
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].employee_id);
            newTr.append("<td id='tableEmployeeId'>" + newEntry[i].employee_id + "</td>");
            newTr.append("<td id='tableName'>" + newEntry[i].name + "</td>");
            newTr.append("<td id='tableDept'>" + newEntry[i].dept + "</td>");
            newTr.append("<td id='tableTitle'>" + newEntry[i].title + "</td>");
            newTr.append("<td id='tableSalary'>" + newEntry[i].salary + "</td>");
            newTr.append("<td id='tableStatus'>" + newEntry[i].status + "</td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getAllEmployees() {
        var rowsToAdd = [];
        var route = "";
        if (userName && (userName != "")) {
            route = "/api/employees/" + userName;
        } else {
            route = "/api/employees";
        };
        $.get(route, function (data) {
            if (userName && (userName != "")) {
                data = [data];
            };
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    employee_id: data[i].employee_id,
                    name: data[i].name,
                    dept: data[i].dept,
                    title: data[i].title,
                    salary: data[i].salary,
                    status: data[i].status,
                }
                rowsToAdd.push(newEntry);
            }
            renderList(createRow(rowsToAdd));

            if (userName && (userName != "")) {
                employeeId.attr("value", ($("tr").children("#tableEmployeeId").text()))
                name.attr("value", ($("tr").children("#tableName").text()))
                title.attr("value", ($("tr").children("#tableTitle").text()))
                salary.attr("value", ($("tr").children("#tableSalary").text()))

                // pre-selects the current log entry options to the html form for faster edits from the user
                $("#deptSelect > option").each(function() {
                if (this.value === ($("tr").children("#tableDept").text())) {
                    this.selected = true
                }
                });
                $("#statusSelect > option").each(function() {
                    if (this.value === ($("tr").children("#tableStatus").text())) {
                        this.selected = true
                    }
                });
            }
        });
    }

    // A function for rendering the list of timeblocks to the page
    function renderList(rowsToAdd) {
        tableBody.children().not(":last").remove();
        tableContainer.children(".alert").remove();
        if (rowsToAdd.length) {
            // console.log(rowsToAdd);
            tableBody.prepend(rowsToAdd);
        }
        else {
            renderEmpty()
        }
    }

    // Function for handling what to render when the employee is not in the database
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("Please contact your administrator to have your employeeID entered");
        tableContainer.append(alertDiv);
    }

    $(document).on("click", ".edit-entry", handleEdit);

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
        var currentEntry = $(this).parent("td").parent("tr").data("tableRow");
        console.log(currentEntry);
        window.location.href = "/admin/" + currentEntry
    }

    // Update a given post, bring user to the blog page when done
    function updateEmployee(entry) {
        console.log(entry);
        $.ajax({
            method: "PUT",
            url: "/api/employees/" + userName,
            data: entry
        })
            .then(function () {
                window.location.href = "/admin";
            });
    }
});

