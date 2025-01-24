$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var proj = $('#project').text();
    var userName = $('#student-id').text();
    var projURL = '';
    var userName = $('#hidden-employeeId').text();
    var entryId = $('#hidden-logId').text();
    var updating = true;


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
        // Want to build in a error modal if form values are not entered
        // if (!nameSelect.val() || !dateSelect.val().trim() || !categorySelect.val() || !taskSelect.val() || !timeSelect.val() || !programId.val().trim()) {
        //     return;
        // }

        var prioritySelect = $("#inputGroupPriority");
        var dateSelect = $('#date');
        var task = $('#inputGroupTask');
        var inputNotes = $('#inputGroupNotes');
        var statusSelect = $('#statusSelect');

        // Constructing a newPost object to hand to the database
        var newEntry = {
            priority: prioritySelect.val(),

            // $('#inputGroupSupervisor option:selected').text(),

            // may need to reformat date information for mySQL?
            dueDate: dateSelect.val(),
            projectName: $("#inputGroupProject option:selected").text(),
            task: task.val(),
            assignedTo: $("#inputGroupStudent option:selected").text(),
            requestor: $("#inputGroupRequestor option:selected").text(),
            status: statusSelect.val(),
            taskNotes: inputNotes.val(),
        };
            if (updating) {
                console.log("fetching updates for record# " + entryId);
                newEntry.task_id = entryId;
                console.log(newEntry);
                updateTableRow(newEntry);
                getLastEntries();
                displayMessage("Task Record# " + entryId + " updated")
            } else {
                submitTableRow(newEntry);
            }
    };

    // Submits a new tableRow entry
    function submitTableRow(data) {
        $.post("/api/tasks", data)
            .then(getLastEntries);
    }

    // Function for creating a new list row for tableRows
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].id);
            newTr.append("<td id='tablePriority'>" + newEntry[i].priority + "</td>");
            newTr.append("<td id='dueDate'>" + newEntry[i].due + "</td>");
            newTr.append("<td id='tableProject'><a href='/task/prj/" + newEntry[i].project + "'>" + newEntry[i].project + "</td>");
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

    // Function for retrieving tableRows and getting them ready to be rendered to the page if getting an array
    // function getLastEntries() {
    //     var rowsToAdd = [];
    //     var route = ""

    //     if (updating) {
    //         var route = "/api/task/entries/" + entryId;
    //     } else if (userName.trim()) {
    //         var route = "/api/task/stu/" + userName;
    //     } else if (proj.trim()) {
    //         var route = "/api/task/prj/" + projURL;
    //     } else {
    //         var route = "/api/task";
    //     };
    //     console.log(route);
    //     $.get(route, function (data) {
    //         console.log(data);
    //         console.log("Item at index", i, data[i]);
    //         for (var i = 0; i < data.length; i++) {
    //             var newEntry = {
    //                 id: data[i].task_id,
    //                 priority: data[i].priority,
    //                 due: data[i].dueDate,
    //                 project_id: data[i].Project.project_id,
    //                 project: data[i].projectName,
    //                 task: data[i].task,
    //                 assigned: data[i].assignedTo,
    //                 student_id: data[i].Student.student_id,
    //                 requestor: data[i].requestor,
    //                 status: data[i].status,
    //                 notes: data[i].taskNotes,
    //             }
    //             // console.log(newEntry);
    //             rowsToAdd.push(newEntry);
    //             // console.log(rowsToAdd);
    //         }
    //         renderList(createRow(rowsToAdd));
        
    //     });
    // }

    // Function for retrieving tableRows and getting them ready to be rendered to the page for single object
    function getLastEntries() {
        var rowsToAdd = [];
        var route = ""

        if (updating) {
            var route = "/api/task/entries/" + entryId;
        };
        console.log(route);
        $.get(route, function (data) {
                var newEntry = {
                    id: data.task_id,
                    priority: data.priority,
                    due: data.dueDate,
                    project_id: data.Project.project_id,
                    project: data.projectName,
                    task: data.task,
                    assigned: data.assignedTo,
                    student_id: data.Student.student_id,
                    requestor: data.requestor,
                    status: data.status,
                    notes: data.taskNotes,
                };
                // console.log(newEntry);
                rowsToAdd.push(newEntry);
                // console.log(rowsToAdd);
                renderList(createRow(rowsToAdd));
        });
    }

    // A function for rendering the list of tableRows to the page
    function renderList(rowsToAdd) {
        //use the below if you want to keep your last entry when rendering or re-rendering your list
        // tableBody.children().not(":last").remove();
        tableBody.children().remove();
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
            url: "api/task/entries/" + id
        })
            .then(getLastEntries);
    }

    $(document).on("click", ".edit-entry", handleEdit);

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
        var currentEntry = $(this).parent("td").parent("tr").data("tableRow");
        console.log(currentEntry);
        var baseUrl = window.location.href + "/update/" + currentEntry;
        console.log(baseUrl)

        window.location.href = baseUrl
    }

    function displayMessage(message) {
        // Set the text content of the #message element
        document.getElementById("message").innerText = message;
        
        // Remove the 'hidden' class from the parent div by using the ID 'hidden-message'
        document.getElementById("hidden-message").classList.remove("hidden");
    }
    
    // Update a given post, bring user to the blog page when done ***NEED TO IMPLEMENT SWITCH BETWEEN DEPARTMENTS***
    function updateTableRow(entry) {
        // entry.task_id = parseInt(entry.task_id, 10)
        // console.log("attempting to update: " + entry.task_id);
        // console.log(entry);
        $.ajax({
            method: "PUT",
            url: "/api/task/entries/" + entryId,
            data: entry
        })
            .then(function () {
                var baseUrl = window.location.href;
                console.log(baseUrl)

                // window.location.href = "/eng/" + userName;
            });
    }

      // Function to update the form with data from entry
  function updateForm() {
    console.log("Attempting to update form");
    var entryId = $("#hidden-logId").text();
    var route = "/api/task/entries/" + entryId;
    var priorityInput = $("#inputGroupPriority");
    var projectInput = $("#inputGroupProject");
    var studentInput = $("#inputGroupStudent");
    var requestorInput = $("#inputGroupRequestor");
    var statusInput = $("#statusSelect");
    var taskText = $("#inputGroupTask");
    var taskNote = $("#inputGroupNotes");
    var date = $("#date");
    // For loop that gets all students and dynamically creates list in the html for the respective projects.
      $.get(route, function (data) {

        let dropdownPriority = data.priority;
        priorityInput.val(dropdownPriority);
        console.log(dropdownPriority);
        let dropdownProject = data.projectName;
        projectInput.val(dropdownProject);
        console.log(dropdownProject);
        let dropdownStudent = data.Student.student_id;
        studentInput.val(dropdownStudent);
        console.log(dropdownStudent);
        // let dropdownRequestor = $("<option>").attr("value", data.requestor).text(data.requestor);
        let dropdownRequestor = data.requestor;
        console.log(dropdownRequestor);
        requestorInput.val(dropdownRequestor);
        let dropdownStatus = data.status;
        console.log(dropdownStatus);
        statusInput.val(dropdownStatus);
        let task = data.task;
        console.log(task);
        taskText.val(task);
        let comments = data.taskNotes;
        console.log(comments);
        taskNote.val(comments);
        let taskDate = data.dueDate;
        console.log(taskDate);
        date.val(taskDate);
      })
    };

    var updating = $('#isUpdate').text();

    if (updating === "true") {
        updateForm() 
    } 

});