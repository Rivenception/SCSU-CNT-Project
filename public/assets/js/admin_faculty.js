/* const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;  */

$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var facultyId = $("#employee-id");
    var name = $('#name')
    var email = $("#email");
    var dept = $('#deptSelect');
    var title = $("#title");
    var manager = $('#manager');
    var userName = $('#hidden-studentId').text();

    $(document).on("click", "#submit", handleFormSubmit);

    getAllFaculty();

    // A function for handling what happens when the form to create a new Faculty is submitted
    function handleFormSubmit() {
        // Wont submit if data is missing.

        console.log(facultyId.val().trim());
        console.log(name.val().trim());

        if (!facultyId.val().trim() || !name.val().trim()) {
            return;
        }
        // Constructing a newFaculty object to hand to the database
        var newFaculty = {
            faculty_id: facultyId.val().trim(),
            facultyName: name.val().trim(),
            email: email.val().trim(),
            dept: dept.val().trim(),
            title: title.val().trim(),
            manager: manager.val().trim(),
        };

        if (userName && (userName != "")) {
            console.log("fetching updates");
            updateFaculty(newFaculty);
        } else {
            submitFaculty(newFaculty);
        }
    };

    // Submits a new Faculty entry
    function submitFaculty(data) {
        $.post("/api/faculty", data)
        .then(getAllFaculty);
    }

    
    // Function for creating a new list row for timeblocks
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].facultyId);
            newTr.append("<td id='tableFacultyId'>" + newEntry[i].faculty_id + "</td>");
            newTr.append("<td id='tableName'>" + newEntry[i].facultyName + "</td>");
            newTr.append("<td id='tableEmail'>" + newEntry[i].email + "</td>");
            newTr.append("<td id='tablePosition'>" + newEntry[i].dept + "</td>");
            newTr.append("<td id='tableSupervisor'>" + newEntry[i].title + "</td>");
            newTr.append("<td id='tableStatus'>" + newEntry[i].manager + "</td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getAllFaculty() {
        var rowsToAdd = [];
        var route = "";
        if (userName && (userName != "")) {
            route = "/api/faculty/" + userName;
        } else {
            route = "/api/faculty";
        };
        $.get(route, function (data) {
            if (userName && (userName != "")) {
                data = [data];
            };
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    faculty_id: data[i].faculty_id,
                    facultyName: data[i].facultyName,
                    email: data[i].email,
                    dept: data[i].dept,
                    title: data[i].title,
                    manager: data[i].manager,
                }
                rowsToAdd.push(newEntry);
            }
            renderList(createRow(rowsToAdd));
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

    // Function for handling what to render when the faculty is not in the database
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("Please contact your administrator to have your FacultyID entered");
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
    function updateFaculty(entry) {
        console.log(entry);
        $.ajax({
            method: "PUT",
            url: "/api/faculty/" + userName,
            data: entry
        })
            .then(function () {
                window.location.href = "/admin";
            });
    }
});

