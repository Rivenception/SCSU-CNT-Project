$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    $(document).on("click", "#submit", handleFormSubmit);
    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // Getting the initial list of Time Entries
    getLastEntries();

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
        console.log(newEntry);
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
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='duplicate-entry fa fa-files-o aria-hidden='true'></i></td>");
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='delete-entry fa fa-trash-o'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving tableRows and getting them ready to be rendered to the page
    function getLastEntries() {
        console.log("Getting latest entries for ");
        var rowsToAdd = [];
        var route = "/api/clocking/entries/";
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
        var id = $(this).parent("td").parent("tr").data("tableRow");
        console.log(id);
        var route = "/api/clocking/entries/" + id;
        console.log(route);
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var duplicateEntry = {
                    studentName: data[i].studentName,
                    date: data[i].date,
                    timeType: data[i].timeType,
                    timeEntry: data[i].timeEntry,
                }
                console.log(duplicateEntry);
                console.log("entry duplicated");
                submitTableRow(duplicateEntry);
            }
        })
    }

    // On-click button and Function for requesting query and downloading to csv file
    $(document).on("click", "#download2csv", download2csv);

    function download2csv() {
        var route = "/api/clocking/entries/";
        
        // Perform a GET request to the specified route
        $.get(route, function (data) {
            var transformedData = [];

            // Loop through the data and create new objects based on the specified fields
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].clock_id,
                    student_id: data[i].Student.student_id,
                    name: data[i].studentName,
                    date: data[i].date,
                    type: data[i].timeType,
                    time: data[i].timeEntry,
                    createdAt: data[i].createdAt,
                    updatedAt: data[i].updatedAt,
                };
                transformedData.push(newEntry);
            }

            // Now we will convert this transformed data into CSV format using a simple method

            var csv = 'id, student_id, name, date, type, time, createdAt, updatedAt\n'; // CSV header
            
            // Loop through transformedData and create CSV rows
            for (var j = 0; j < transformedData.length; j++) {
                var row = [
                    transformedData[j].id,
                    transformedData[j].student_id,
                    transformedData[j].name,
                    transformedData[j].date,
                    transformedData[j].type,
                    transformedData[j].time,
                    transformedData[j].createdAt,
                    transformedData[j].updatedAt,
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
            link.setAttribute("download", "timesheet.csv");

            // Trigger a click event to download the file
            link.click();

            // Optionally, revoke the object URL after the download
            URL.revokeObjectURL(url);
        });
    }

    function getTotal() {
        var route = "/api/clocking/entries/";
        console.log("Attempting to get totals"),
        $.get(route, function (data) {
            // Step 1: Prepare the structure to hold the total hours for each student
            const totalHours = {};
        
            // Step 2: Loop through the data and process each record
            for (let i = 0; i < data.length; i++) {
                const record = data[i];
                const studentId = record.Student.student_id;
                const date = record.date;
                const timeType = record.timeType;
                const timeEntry = record.timeEntry;
        
                // Initialize the student entry if it doesn't exist
                if (!totalHours[studentId]) {
                    totalHours[studentId] = {
                        runningTotal: 0,  // Running total of hours worked
                        records: []  // Store the records for this student
                    };
                }
        
                // Step 3: Store each record by student and date
                totalHours[studentId].records.push({ date, timeType, timeEntry });
            }
        
            // Step 4: Process each student and their records
            for (let studentId in totalHours) {
                // Get the student's records and group by date
                const studentRecords = totalHours[studentId].records;
        
                // Group records by date
                const groupedByDate = studentRecords.reduce((acc, record) => {
                    if (!acc[record.date]) {
                        acc[record.date] = [];
                    }
                    acc[record.date].push(record);
                    return acc;
                }, {});
        
                // Step 5: For each date, sort the records by time and calculate the total hours
                for (let date in groupedByDate) {
                    const recordsForDate = groupedByDate[date];
        
                    // Sort records by time
                    recordsForDate.sort((a, b) => {
                        return new Date(`${date}T${a.timeEntry}`) - new Date(`${date}T${b.timeEntry}`);
                    });
        
                    // Initialize variables to track the "Time In" and "Time Out"
                    let timeIn = null;
                    let totalForDate = 0;
        
                    // Step 6: Pair "Time In" and "Time Out" to calculate total hours
                    for (let record of recordsForDate) {
                        const time = new Date(`${date}T${record.timeEntry}`);
                        if (record.timeType === "Time In") {
                            timeIn = time;  // Store the "Time In" time
                        } else if (record.timeType === "Time Out" && timeIn) {
                            // Calculate the time worked if we have a "Time In"
                            const hoursWorked = (time - timeIn) / (1000 * 60 * 60); // Convert milliseconds to hours
                            totalForDate += hoursWorked;
                            timeIn = null;  // Reset timeIn after calculating the hours worked
                        }
                    }
        
                    // Add the total hours worked for the day to the student's running total
                    totalHours[studentId].runningTotal += totalForDate;
                }
            }
        
            // Step 7: Display the running total hours for each student
            console.log("Total Hours Worked All Time:");
            for (let studentId in totalHours) {
                console.log(`Student ID: ${studentId}, Total Hours Worked All Time: ${totalHours[studentId].runningTotal}`);
            }
        });
    }

    getTotal();
});