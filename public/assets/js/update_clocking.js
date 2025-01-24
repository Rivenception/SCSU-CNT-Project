$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var userName = $('#hidden-studentName').text();
    var entryId = $('#hidden-logId').text();
    var updating = true;

    // Getting the initial list of Time Entries
    getLastEntries();

    $(document).on("click", "#submit", handleFormSubmit);
    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit() {
        console.log("Add Button Triggered");
        event.preventDefault()

        var dateSelect = $('#date');
        var timeSelect = $('#timeInput');
        var nameSelect = $('#inputGroupStudent');
        var typeSelect = $('#in-out');

        // Constructing a newPost object to hand to the database
        var newEntry = {
            date: dateSelect.val().trim(),
            timeEntry: timeSelect.val().trim(),
            studentName: nameSelect.text().trim(),
            timeType: typeSelect.val().trim(),
        };

        if (updating) {
            console.log("fetching updates");
            newEntry.clock_id = entryId;
            updateTableEntry(newEntry);
            getLastEntries();
            displayMessage("Punch Clock Record# " + entryId + " updated")
        } else {
            submitTableRow(newEntry);
        }
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
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='duplicate-entry fa fa-files-o aria-hidden='true'></i></td>");
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
        var route = "/api/clocking/entries/"  + entryId;
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
    function updateTableEntry(entry) {
        $.ajax({
            method: "PUT",
            url: "/api/clocking/entries/" + entryId,
            data: entry
        })
            .then(function () {
                var baseUrl = window.location.href;
                console.log(baseUrl)

                // window.location.href = "/eng/" + userName;
            });
    }

    function updateForm() {
        console.log("Attempting to update form");
        var entryId = $("#hidden-logId").text();
        var route = "/api/clocking/entries/" + entryId;
        var studentInput = $("#inputGroupStudent");
        var inputType = $("#in-out");
        var inputTime = $("#timeInput");
        var inputDate = $("#date");
        // For loop that gets all students and dynamically creates list in the html for the respective projects.
        $.get(route, function (data) {
            console.log(data);

            let entryDate = data[0].date;
            console.log(entryDate);
            inputDate.val(entryDate);
            let entryTime = data[0].timeEntry;
            console.log(entryTime);
            inputTime.val(entryTime);
            let dropdownStudent = data[0].Student.student_id;
            console.log(dropdownStudent);
            studentInput.val(dropdownStudent);
            let inOut = data[0].timeType;
            console.log(inOut);
            inputType.val(inOut);
        })
    };

    var updating = $('#isUpdate').text();

    if (updating === "true") {
        updateForm() 
    } 
});