$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var status = $('#status').text();

    // Getting the initial list of Time Entries
    getLastEntries();

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

    // Function for retrieving tableRows and getting them ready to be rendered to the page
    function getLastEntries() {
        var rowsToAdd = [];
        var route = "/api/task/status/" + status;
        console.log(route);
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].task_id,
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

    //Set default date of today
    var today = new Date();
    var dd = ("0" + (today.getDate())).slice(-2);
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

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

    $(document).on("click", ".delete-entry", handleDeleteButtonPress);
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

    // Submits a new tableRow entry
    function submitTableRow(data) {
        $.post("/api/tasks", data)
            .then(getLastEntries);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function duplicate() {
        // console.log($(this));
        // console.log($(this).parent("td"));
        // console.log($(this).parent("td").parent("tr"));
        console.log($(this).parent("td").parent("tr").children("#tablePriority"));
        console.log($(this).parent("td").parent("tr").children("#tablePriority").text());

        duplicateEntry = {
            priority: $(this).parent("td").parent("tr").children("#tablePriority").text(),
            dueDate: today,
            projectName: $(this).parent("td").parent("tr").children("#tableProject").text(),
            task: $(this).parent("td").parent("tr").children("#tableTask").text(),
            assignedTo: $(this).parent("td").parent("tr").children("#tableAssignment").text(),
            requestor: $(this).parent("td").parent("tr").children("#tableRequestor").text(),
            projectName: $(this).parent("td").parent("tr").children("#tableProject").text(),
            status: $(this).parent("td").parent("tr").children("#tableStatus").text(),
            logNotes: $(this).parent("td").parent("tr").children("#tableNotes").text(),
        }
        console.log("entry duplicated");
        submitTableRow(duplicateEntry);

        // window.location.href = "/update/" + currentEntry
    }
    
    // On-click button and Function for requesting query and downloading to csv file
    $(document).on("click", "#download2csv", download2csv);

    function download2csv() {
        var route = "/api/task/status/" + status;
        
        // Perform a GET request to the specified route
        $.get(route, function (data) {
            var transformedData = [];
    
            // Loop through the data and create new objects based on the specified fields
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].task_id,
                    priority: data[i].priority,
                    due: data[i].dueDate,
                    project_id: data[i].Project.project_id,
                    project: data[i].projectName,
                    task: data[i].task,
                    assigned: data[i].assignedTo,
                    student_id: data[i].Student.student_id,
                    requestor: data[i].requestor,
                    status: data[i].status,
                    notes: data[i].taskNotes
                };
                transformedData.push(newEntry);
            }
    
            // Now we will convert this transformed data into CSV format using a simple method
    
            var csv = 'id,priority,due,project_id,project,task,assigned,student_id,requestor,status,notes\n'; // CSV header
            
            // Loop through transformedData and create CSV rows
            for (var j = 0; j < transformedData.length; j++) {
                var row = [
                    transformedData[j].id,
                    transformedData[j].priority,
                    transformedData[j].due,
                    transformedData[j].project_id,
                    transformedData[j].project,
                    transformedData[j].task,
                    transformedData[j].assigned,
                    transformedData[j].student_id,
                    transformedData[j].requestor,
                    transformedData[j].status,
                    transformedData[j].notes
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
            link.setAttribute("download", "tasks.csv");
    
            // Trigger a click event to download the file
            link.click();
    
            // Optionally, revoke the object URL after the download
            URL.revokeObjectURL(url);
        });
    }
});