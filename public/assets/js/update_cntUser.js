$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var entryId = $('#hidden-logId').text();
    updating = true;

    var userName = $('#hidden-studentName').text();
    var nameSelect = $('#inputGroupStudent');
    var dateSelect = $('#date');
    var categorySelect = $("#inputGroupCategory");
    var inputNotes = $('#inputGroupNotes');

    $(document).on("click", "#timeSubmit", handleFormSubmit);
    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // Getting the initial list of Time Entries
    getLastEntries();

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit() {
        console.log("Add Button Triggered");

        // // Wont submit the post if we are missing a body, title, or author
        // if (!nameSelect.val() || !dateSelect.val().trim() || !categorySelect.val() || !taskSelect.val() || !timeSelect.val() || !programId.val().trim()) {
        //     var alertDiv = $("<div>");
        //     alertDiv.addClass("alert alert-danger");
        //     alertDiv.text("Make sure the program ID is not empty and all required fields are filled in.");
        //     tableContainer.prepend(alertDiv);
        //     return;
        // }

        // Constructing a newPost object to hand to the database
        var newEntry = {
            studentName: nameSelect.text().trim(),
            // may need to reformat date information for mySQL?
            date: dateSelect.val(),
            projectName: $('#inputGroupProject option:selected').text().trim(),
            category: categorySelect.val(),
            logNotes: inputNotes.val(),
        };
            if (updating) {
                console.log("fetching updates");
                newEntry.id = entryId;
                updateTableRow(newEntry);
                getLastEntries();
                displayMessage("Timekeeper Record# " + entryId + " updated")
            } else {
                submitTableRow(newEntry);
            }
    };

    // Submits a new tableRow entry
    function submitTableRow(data) {
        console.log("Posting new entry...")
        $.post("/api/cnttimesheets", data)
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
            newTr.append("<td id='tableName'><a href='/stu/" + newEntry[i].student_id + "'>" + newEntry[i].name + "</td>");
            newTr.append("<td id='tableDate'>" + newEntry[i].date + "</td>");
            newTr.append("<td id='tableProject'><a href='/prj/" + newEntry[i].project + "'>" + newEntry[i].project + "</td>");
            newTr.append("<td id='tableCategory'><a href='/stu/cat/" + newEntry[i].category + "'>" + newEntry[i].category + "</td>");
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
        console.log("Getting latest entries for " + userName);
        var rowsToAdd = [];
        var route = "/api/cnttimesheets/entries/"  + entryId;
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].id,
                    student_id: data[i].Student.student_id,
                    project_id: data[i].Project.project_id,
                    name: data[i].studentName,
                    date: data[i].date,
                    project: data[i].projectName,
                    category: data[i].category,
                    notes: data[i].logNotes,
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
        alertDiv.text("This user hasn't logged any hours yet! Please enter your first record");
        tableContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        console.log("Delete Button Triggered");
        var id = $(this).parent("td").parent("tr").data("tableRow");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "api/cnttimesheets/entries/" + id
        })
            .then(getLastEntries);
    }

    $(document).on("click", ".edit-entry", handleEdit);

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
        var currentEntry = $(this).parent("td").parent("tr").data("tableRow");
        console.log("Currently Updating table record number:" + currentEntry);
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
        $.ajax({
            method: "PUT",
            url: "/api/cntTimesheets/entries/" + entryId,
            data: entry
        })
            .then(function () {
                var baseUrl = window.location.href;
                console.log(baseUrl)

                // window.location.href = "/eng/" + userName;
            });
    }

});