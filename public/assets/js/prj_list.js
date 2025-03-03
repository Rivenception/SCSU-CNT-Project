$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    // Getting the initial list of Time Entries
    getLastEntries();

    // Function for creating a new list row for tableRows
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].id);
            newTr.append("<td id='projectId#"  + newEntry[i].project_id + "'>" + newEntry[i].project_id + "</td>");
            newTr.append("<td id='tableProject'><a href='/prj/" + newEntry[i].project + "'>" + newEntry[i].project + "</td>");
            newTr.append("<td id='tableSponsor'>" + newEntry[i].sponsor + "</td>");
            newTr.append("<td id='tableNotes'>" + newEntry[i].status + "</td>");
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='duplicate-entry fa fa-files-o aria-hidden='true'></i></td>");
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='delete-entry fa fa-trash-o'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving tableRows and getting them ready to be rendered to the page
    function getLastEntries() {
        var rowsToAdd = [];
        var route = "/api/prj";
        console.log(route);
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    project_id: data[i].project_id,
                    project: data[i].projectName,
                    sponsor: data[i].projectSponsor,
                    status: data[i].status,
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

    // On-click button and Function for requesting query and downloading to csv file
    $(document).on("click", "#download2csv", download2csv);

    function download2csv() {
        var route = "/api/prj";
        
        // Perform a GET request to the specified route
        $.get(route, function (data) {
            var transformedData = [];
    
            // Loop through the data and create new objects based on the specified fields
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    project_id: data[i].project_id,
                    project: data[i].projectName,
                    sponsor: data[i].projectSponsor,
                    status: data[i].status,
                };
                transformedData.push(newEntry);
            }
    
            // Now we will convert this transformed data into CSV format using a simple method
    
            var csv = 'project_id, project, sponsor, status\n'; // CSV header
            
            // Loop through transformedData and create CSV rows
            for (var j = 0; j < transformedData.length; j++) {
                var row = [
                    transformedData[j].project_id,
                    transformedData[j].project,
                    transformedData[j].sponsor,
                    transformedData[j].status,
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
            link.setAttribute("download", "projects.csv");
    
            // Trigger a click event to download the file
            link.click();
    
            // Optionally, revoke the object URL after the download
            URL.revokeObjectURL(url);
        });
    }

});