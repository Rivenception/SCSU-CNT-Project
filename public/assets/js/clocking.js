$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var dept = $('#dept').text();
    var userName = $('#hidden-studentName').text();
    var user_id = $('#hidden-student-id').text();
    var nameSelect = $('#inputGroupEmployee');
    var dateSelect = $('#date');
    var categorySelect = $("#inputGroupCategory");
    var taskSelect = $('#inputGroupTask');
    var timeSelect = $('#inputGroupTime');
    var programId = $('#inputGroupProgram');
    var inputEcr = $('#inputGroupEcr');
    var inputNotes = $('#inputGroupNotes');
    var deptURL = '';

    $(document).on("click", "#timeSubmit", handleFormSubmit);
    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // Getting the initial list of Time Entries
    getLastEntries();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit() {
        console.log("Add Button Triggered");
        // Wont submit the post if we are missing a body, title, or author
        if (!nameSelect.val() || !dateSelect.val().trim() || !categorySelect.val() || !taskSelect.val() || !timeSelect.val() || !programId.val().trim()) {
            var alertDiv = $("<div>");
            alertDiv.addClass("alert alert-danger");
            alertDiv.text("Make sure the program ID is not empty and all required fields are filled in.");
            tableContainer.prepend(alertDiv);
            return;
        }

        // Constructing a newPost object to hand to the database
        var newEntry = {
            employee_id: userName,
            name: nameSelect.text().trim(),

            // may need to reformat date information for mySQL?
            date: dateSelect.val(),
            category: categorySelect.val(),
            task: taskSelect.val(),
            timespent: timeSelect.val(),
            program: programId.val().trim(),
            ecr: inputEcr.val(),
            notes: inputNotes.val(),
            FKemployee_id: userName,
        };

        submitTableRow(newEntry);
    };

    // Submits a new tableRow entry
    function submitTableRow(data) {
        console.log("Posting new entry...")
        $.post("/api/clocking", data)
            .then(getLastEntries);
    }

    // Function for creating a new list row for tableRows
    function createRow(newEntry) {
        console.log("Creating Rows...");
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].id);
            newTr.append("<td id='logId#"  + newEntry[i].id + "'>" + newEntry[i].id + "</td>");
            newTr.append("<td id='tableName'><a href='/clocking/stu/" + newEntry[i].student_id + "'>" + newEntry[i].name + "</td>");
            newTr.append("<td id='tableDate'>" + newEntry[i].date + "</td>");
            newTr.append("<td id='tableType'>" + newEntry[i].type + "</td>");
            newTr.append("<td id='tableTimeEntry'>" + newEntry[i].time + "</td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='duplicate-entry fa fa-files-o aria-hidden='true'></i></td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='delete-entry fa fa-trash-o'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving tableRows and getting them ready to be rendered to the page
    function getLastEntries() {
        console.log("Getting latest entries for " + userName);
        var rowsToAdd = [];
        var route = "/api/clocking/stu/"  + userName;
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].clock_id,
                    student_id: data[i].Student.student_id,
                    name: data[i].studentName,
                    date: data[i].date,
                    type: data[i].timeType,
                    time: data[i].timeEntry,
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
        console.log("Delete Button Triggered");
        var id = $(this).parent("td").parent("tr").data("tableRow");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "api/clocking/entries/" + id
        })
            .then(getLastEntries);
    }

    $(document).on("click", ".edit-entry", handleEdit);

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
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
            program: $(this).parent("td").parent("tr").children("#tableProgram").text(),
            notes: $(this).parent("td").parent("tr").children("#tableNotes").text(),
        }
        console.log(duplicateEntry.ecr);
        submitTableRow(duplicateEntry);
    }
});