$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var proj = $('#project').text();
    var userName = $('#student-id').text();
    var nameSelect = $('#inputGroupEmployee');
    var dateSelect = $('#date');
    var categorySelect = $("#inputGroupCategory");
    var taskSelect = $('#inputGroupTask');
    var timeSelect = $('#inputGroupTime');
    var programId = $('#inputGroupProgram');
    var inputEcr = $('#inputGroupEcr');
    var inputNotes = $('#inputGroupNotes');
    var projURL = '';

    $(document).on("click", "#timeSubmit", handleFormSubmit);
    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // Getting the initial list of Time Entries
    checkProj();
    getLastEntries();

    // Function that checks html to confirm department called from routes
    function checkProj() {
        projURL = '';
        if (proj === 'Admin') {
            projURL = "1";
            $("#projSelect > option").each(function() {
                if (this.value === proj) {
                    this.selected = true
                }
            });
        } else if (proj === 'Batteries & Chips') {
            projURL = "2";
            $("#projSelect > option").each(function() {
                if (this.value === proj) {
                    this.selected = true
                }
            });
        } else if (proj === 'Super Capacitors') {
            projURL = "3";
            $("#projSelect > option").each(function() {
                if (this.value === proj) {
                    this.selected = true
                }
            });
        } else if (proj === 'Quantum') {
            projURL = "4";
            $("#projSelect > option").each(function() {
                if (this.value === proj) {
                    this.selected = true
                }
            });
        } else if (proj === 'Direct Air Capture') {
            projURL = "5";
            $("#projSelect > option").each(function() {
                if (this.value === proj) {
                    this.selected = true
                }
            });
        } else if (proj === 'Fuel Cells') {
            projURL = "6";
            $("#projSelect > option").each(function() {
                if (this.value === proj) {
                    this.selected = true
                }
            });
        };
    };

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit() {
        // Wont submit the post if we are missing a body, title, or author
        if (!nameSelect.val() || !dateSelect.val().trim() || !categorySelect.val() || !taskSelect.val() || !timeSelect.val() || !programId.val().trim()) {
            return;
        }
        // Constructing a newPost object to hand to the database
        var newEntry = {
            employee_id: userName,
            name: nameSelect.val(),

            // may need to reformat date information for mySQL?
            date: dateSelect.val(),
            category: categorySelect.val(),
            task: taskSelect.val(),
            timespent: timeSelect.val(),
            program: programId.val().trim(),
            ecr: inputEcr.val(),
            notes: inputNotes.val(),
        };
        submitTableRow(newEntry);
    };

    // Submits a new tableRow entry
    function submitTableRow(data) {
        $.post("/api/timesheets", data)
            .then(getLastEntries);
    }

    // Function for creating a new list row for tableRows
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].id);
            newTr.append("<td id='priority"  + newEntry[i].priority + "'>" + newEntry[i].priority + "</td>");
            newTr.append("<td id='dueDate"  + newEntry[i].due + "'>" + newEntry[i].due + "</td>");
            newTr.append("<td id='tableProject'><a href='/task/prj/" + newEntry[i].project_id + "'>" + newEntry[i].project + "</td>");
            newTr.append("<td id='tableTask'>" + newEntry[i].task + "</td>");
            newTr.append("<td id='tableAssignment'><a href='task/stu/" + newEntry[i].student_id + "'>" + newEntry[i].assigned + "</td>");
            newTr.append("<td id='tableRequestor'>" + newEntry[i].requestor + "</td>");
            newTr.append("<td id='tableStatus'><a href='task/status/" + newEntry[i].status + "'>" + newEntry[i].status + "</td>");
            newTr.append("<td id='tableNotes'>" + newEntry[i].notes + "</td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='duplicate-entry fa fa-files-o aria-hidden='true'></i></td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='delete-entry fa fa-trash-o'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving tableRows and getting them ready to be rendered to the page
    function getLastEntries() {
        checkProj();
        var rowsToAdd = [];
        if (userName.trim()) {
            var route = "/api/task/stu/" + userName;
        } else if (proj.trim()) {
            var route = "/api/task/prj/" + projURL;
        } else {
            var route = "/api/task";
        };
        console.log(route);
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    task_id: data[i].task_id,
                    priority: data[i].priority,
                    due: data[i].dueDate,
                    project_id: data[i].Project.project_id,
                    project: data[i].projectName,
                    task: data[i].task,
                    assigned: data[i].assignedTo,
                    student_id: data[i].Student.student_id,
                    requestor: data[i].requestor,
                    status: data[i].status,
                    notes: data[i].taskNotes,
                }
                // console.log(newEntry);
                rowsToAdd.push(newEntry);
                // console.log(rowsToAdd);
            }
            renderList(createRow(rowsToAdd));
        });
    }

    // A function for rendering the list of tableRows to the page
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
        alertDiv.text("Please contact your administrator to have your employeeID entered. If the user has an employeeID then the user hasn't logged any hours yet!");
        tableContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var id = $(this).parent("td").parent("tr").data("tableRow");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "api/timesheets/entries/" + id
        })
            .then(getLastEntries);
    }

    $(document).on("click", ".edit-entry", handleEdit);

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
        console.log("yes");
        var currentEntry = $(this).parent("td").parent("tr").data("tableRow");
        console.log(currentEntry);
        window.location.href = "/update/" + currentEntry
    }

    $(document).on("click", ".duplicate-entry", duplicate);

    //Set default date of today
    var today = new Date();
    var dd = ("0" + (today.getDate())).slice(-2);
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    // This function figures out which post we want to edit and takes it to the appropriate url
    function duplicate() {
        // console.log($(this));
        // console.log($(this).parent("td"));
        // console.log($(this).parent("td").parent("tr"));
        console.log($(this).parent("td").parent("tr").children("#tableECR"));
        console.log($(this).parent("td").parent("tr").children("#tableECR").text());
        console.log($(this).parent("td").parent("tr").children("#tableProgram"));
        console.log($(this).parent("td").parent("tr").children("#tableProgram").text());
        duplicateEntry = {
            employee_id: userName,
            name: $(this).parent("td").parent("tr").children("#tableName").text(),
            date: today,
            category: $(this).parent("td").parent("tr").children("#tableCategory").text(),
            task: $(this).parent("td").parent("tr").children("#tableTask").text(),
            timespent: $(this).parent("td").parent("tr").children("#tableTime").text(),
            program: $(this).parent("td").parent("tr").children("#tableProgram").text(),
            ecr: $(this).parent("td").parent("tr").children("#tableECR").text(),
            notes: $(this).parent("td").parent("tr").children("#tableNotes").text(),
        }
        console.log(duplicateEntry.ecr);
        submitTableRow(duplicateEntry);

        // window.location.href = "/update/" + currentEntry
    }

});