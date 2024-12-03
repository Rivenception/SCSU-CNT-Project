/* const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;  */

$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var studentId = $("#student-id");
    var name = $('#name')
    var position = $('#deptSelect');
    var email = $("#title");
    var supervisor = $('#salary');
    var status = $('#statusSelect');
    var userName = $('#hidden-studentId').text();

    $(document).on("click", "#submit", handleFormSubmit);

    getAllStudents();

    // A function for handling what happens when the form to create a new Student is submitted
    function handleFormSubmit() {
        // Wont submit if data is missing.

        console.log(studentId.val().trim());
        console.log(position.text().trim());
        console.log(name.val().trim());
        console.log(status.val().trim());

        if (!studentId.val().trim() || !name.val().trim() || !email.val().trim()) {
            return;
        }
        // Constructing a newStudent object to hand to the database
        var newStudent = {
            student_id: studentId.val().trim(),
            studentName: name.val().trim(),
            email: email.val().trim(),
            position: position.val().trim(),
            supervisor: supervisor.val().trim(),
            status: status.val().trim(),
        };

        if (userName && (userName != "")) {
            console.log("fetching updates");
            updateStudent(newStudent);
        } else {
            submitStudent(newStudent);
        }
    };

    // Submits a new Student entry
    function submitStudent(data) {
        $.post("/api/contacts", data)
        .then(getAllStudents);
    }

    
    // Function for creating a new list row for timeblocks
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].studentId);
            newTr.append("<td id='tableStudentId'>" + newEntry[i].student_id + "</td>");
            newTr.append("<td id='tableName'>" + newEntry[i].studentName + "</td>");
            newTr.append("<td id='tableEmail'>" + newEntry[i].email + "</td>");
            newTr.append("<td id='tablePosition'>" + newEntry[i].position + "</td>");
            newTr.append("<td id='tableSupervisor'>" + newEntry[i].supervisor + "</td>");
            newTr.append("<td id='tableStatus'>" + newEntry[i].status + "</td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getAllStudents() {
        var rowsToAdd = [];
        var route = "";
        if (userName && (userName != "")) {
            route = "/api/students/" + userName;
        } else {
            route = "/api/students";
        };
        $.get(route, function (data) {
            if (userName && (userName != "")) {
                data = [data];
            };
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    student_id: data[i].student_id,
                    studentName: data[i].studentName,
                    email: data[i].email,
                    position: data[i].position,
                    supervisor: data[i].supervisor,
                    status: data[i].status,
                }
                rowsToAdd.push(newEntry);
            }
            renderList(createRow(rowsToAdd));

            if (userName && (userName != "")) {
                student_id.attr("value", ($("tr").children("#tableStudentId").text()))
                studentName.attr("value", ($("tr").children("#tableName").text()))
                email.attr("value", ($("tr").children("#tableEmail").text()))
                supervisor.attr("value", ($("tr").children("#tableSupervisor").text()))

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

    // Function for handling what to render when the Student is not in the database
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("Please contact your administrator to have your StudentID entered");
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
    function updateStudent(entry) {
        console.log(entry);
        $.ajax({
            method: "PUT",
            url: "/api/students/" + userName,
            data: entry
        })
            .then(function () {
                window.location.href = "/admin";
            });
    }
});

