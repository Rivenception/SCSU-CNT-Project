$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

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

        submitTableRow(newEntry);
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
        var route = "/api/cnttimesheets/users/"  + userName;
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
        console.log($(this).parent("td").parent("tr").children("#tableNotes"));
        console.log($(this).parent("td").parent("tr").children("#tableNotes").text());
        duplicateEntry = {
            student_id: userName,
            studentName: $(this).parent("td").parent("tr").children("#tableName").text(),
            date: today,
            projectName: $(this).parent("td").parent("tr").children("#tableProject").text(),
            category: $(this).parent("td").parent("tr").children("#tableCategory").text(),
            logNotes: $(this).parent("td").parent("tr").children("#tableNotes").text(),
        }
        console.log("entry duplicated");
        submitTableRow(duplicateEntry);
    }

    // On-click button and Function for requesting query and downloading to csv file
    $(document).on("click", "#download2csv", download2csv);

    function download2csv() {
        var route = "/api/cnttimesheets/users/"  + userName;

        // Perform a GET request to the specified route
        $.get(route, function (data) {
            var transformedData = [];
    
            // Loop through the data and create new objects based on the specified fields
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
                };
                transformedData.push(newEntry);
            }
    
            // Now we will convert this transformed data into CSV format using a simple method
    
            var csv = 'id, student_id, project_id, name, date, project, category, notes\n'; // CSV header
            
            // Loop through transformedData and create CSV rows
            for (var j = 0; j < transformedData.length; j++) {
                var row = [
                    transformedData[j].id,
                    transformedData[j].student_id,
                    transformedData[j].project_id,
                    transformedData[j].name,
                    transformedData[j].date,
                    transformedData[j].project,
                    transformedData[j].category,
                    transformedData[j].notes,
                ].join(","); // Join each field with a comma to create a row
                csv += row + "\n"; // Add the row to the CSV string
            }
    
            // Create a Blob from the CSV data
            var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    
            // Create an object URL for the Blob
            var url = URL.createObjectURL(blob);
    
            // Create a link element to trigger the download
            var link = document.createElement("a");
            link.setAttribute("href", url);
            link.setAttribute("download", "students.csv");
    
            // Trigger a click event to download the file
            link.click();
    
            // Optionally, revoke the object URL after the download
            URL.revokeObjectURL(url);
        });
    }
});