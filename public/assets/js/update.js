$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var userName = $('#hidden-employeeId').text();
    var entryId = $('#hidden-logId').text();
    var nameSelect = $('#inputGroupEmployee');
    var dateSelect = $('#date');
    var categorySelect = $("#inputGroupCategory");
    var taskSelect = $('#inputGroupTask');
    var timeSelect = $('#inputGroupTime');
    var programId = $('#inputGroupProgram');
    var inputEcr = $('#inputGroupEcr');
    var inputNotes = $('#inputGroupNotes');
    var dept = $('#dept').text();
    var deptURL = '';

    updating = true;

    $(document).on("click", "#timeSubmit", handleFormSubmit);
    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // Getting the initial list of Time Entries
    getLastEntries();
    checkDept();

    // Function that checks html to confirm department called from routes
    function checkDept() {
        deptURL = '';
        if (dept === 'Engineering') {
            deptURL = "eng";
        } else if (dept === 'Manufacturing') {
            deptURL = "mfg";
        } else if (dept === 'Program Management') {
            deptURL = "pm";
        };
    };

    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body, title, or author
        if (!nameSelect.val() || !dateSelect.val().trim() || !categorySelect.val() || !taskSelect.val() || !timeSelect.val() || !programId.val().trim()) {
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
            employee_id: userName,
        };

        if (updating) {
            console.log("fetching updates");
            newEntry.id = entryId;
            updateTimeblock(newEntry);
        } else {
            submitTimeblock(newEntry);
        }
    };

    // Submits a new timeblock entry
    function submitTimeblock(data) {
        $.post("/api/timesheets", data)
            .then(getLastEntries);
    }

    // Function for creating a new list row for timeblocks

    // for some reason this is not working
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("timeblock", newEntry[i].id);
            newTr.append("<td id='logId-"  + newEntry[i].id + "'>" + newEntry[i].id + "</td>");
            newTr.append("<td id='tableName'><a href='/" + deptURL + "/" + newEntry[i].employee_id + "'>" + newEntry[i].name + "</td>");
            newTr.append("<td id='tableDate'>" + newEntry[i].date + "</td>");
            newTr.append("<td id='tableCategory'>" + newEntry[i].category + "</td>");
            newTr.append("<td id='tableTask'>" + newEntry[i].task + "</td>");
            newTr.append("<td id='tableTime'>" + newEntry[i].timespent + "</td>");
            newTr.append("<td id='tableProgram'><a href='/rfb/" + newEntry[i].program + "'>" + newEntry[i].program + "</td>");
            newTr.append("<td id='tableECR'><a href='/rfb/ecr/" + newEntry[i].ecr + "'>" + newEntry[i].ecr + "</td>");
            newTr.append("<td id='tableNotes'>" + newEntry[i].notes + "</td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getLastEntries() {
        var rowsToAdd = [];
        var route = "";
        if (updating) {
            route = "/api/timesheets/entries/" + entryId;
        } else {
            route = "/api/timesheets/limit=20/" + userName;
        }
        console.log(route);
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].id,
                    employee_id: data[i].employee_id,
                    name: data[i].name,
                    date: data[i].date,
                    category: data[i].category,
                    task: data[i].task,
                    ecr: data[i].ecr,
                    timespent: data[i].timespent,
                    program: data[i].program,
                    notes: data[i].notes,
                }
                // console.log(newEntry);
                rowsToAdd.push(newEntry);
                // console.log(rowsToAdd);
            }
            renderList(createRow(rowsToAdd));

             // prefills the values for these the log entry to the html form for faster edits from the user
             programId.attr("value", ($("#logId-" + entryId).parent("tr").children("#tableProgram").text()))
             inputNotes.attr("value", ($("#logId-" + entryId).parent("tr").children("#tableNotes").text()))
             inputEcr.attr("value", ($("#logId-" + entryId).parent("tr").children("#tableECR").text()))

             // pre-selects the current log entry options to the html form for faster edits from the user
             $("#inputGroupCategory > option").each(function() {
                if (this.value === ($("#logId-" + entryId).parent("tr").children("#tableCategory").text())) {
                    this.selected = true
                }
            });
            $("#inputGroupTask > option").each(function() {
                if (this.value === ($("#logId-" + entryId).parent("tr").children("#tableTask").text())) {
                    this.selected = true
                }
            });
            $("#inputGroupTime > option").each(function() {
                if (this.value === ($("#logId-" + entryId).parent("tr").children("#tableTime").text())) {
                    this.selected = true
                }
            });
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

    // Function for handling what to render when there are no authors
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("There are no entries for the selected employee");
        tableContainer.append(alertDiv);
    }

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var id = $(this).parent("td").parent("tr").data("timeblock");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "api/timesheets/entries/" + id
        })
            .then(getLastEntries);
    }

    // working on editing
    $(document).on("click", ".edit-entry", handleEdit);

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
        var currentEntry = $(this).parent("td").parent("tr").data("timeblock");
        updating = true;
        window.location.href = "/update/" + currentEntry
    }

    // Update a given post, bring user to the blog page when done ***NEED TO IMPLEMENT SWITCH BETWEEN DEPARTMENTS***
    function updateTimeblock(entry) {
        $.ajax({
            method: "PUT",
            url: "/api/timesheets/entries/" + entryId,
            data: entry
        })
            .then(function () {
                window.location.href = "/eng/" + userName;
            });
    }

});