$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var hiddenURL = $('#hiddenId').text();
    var addHours = document.getElementById("#total-hours");
    var addCosts = document.getElementById("#total-cost");

    // Getting the initial list of Time Entries
    getEntries();
    getTime();

    // Function for creating a new list row for timeblocks
    function createRow(newTimeEntry) {
        var allEntries = [];
        for (var i = 0; i < newTimeEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("timeblock", newTimeEntry[i].id);
            newTr.append("<td>" + newTimeEntry[i].id + "</td>");
            newTr.append("<td>" + newTimeEntry[i].name + "</td>");
            newTr.append("<td>" + newTimeEntry[i].date + "</td>");
            newTr.append("<td>" + newTimeEntry[i].category + "</td>");
            newTr.append("<td>" + newTimeEntry[i].task + "</td>");
            newTr.append("<td>" + newTimeEntry[i].timespent + "</td>");
            newTr.append("<td>" + newTimeEntry[i].program + "</td>");
            newTr.append("<td>" + newTimeEntry[i].ecr + "</td>");
            newTr.append("<td>" + newTimeEntry[i].notes + "</td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getEntries() {
        var rowsToAdd = [];
        var route = "/api/timesheets/programs/ecr/" + hiddenURL;
        console.log(route);
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newTimeEntry = {
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
                // console.log(newTimeEntry);
                rowsToAdd.push(newTimeEntry);
                // console.log(rowsToAdd);
            }
            renderList(createRow(rowsToAdd));
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

    // Function for handling what to render when there are no posts
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("There are no entries for the selected employee");
        tableContainer.append(alertDiv);
    }

    function getTime() {
        var route = "/api/timesheets/programs/ecr/" + hiddenURL;
        let totalMinutes = 0;
        $.get(route, function (data) {
            for (var i = 0; i < data.length; i++) {
                number = data[i].timespent;
                totalMinutes += number
            }
            totalHours = totalMinutes / 60;
            totalCost = totalHours * 100;
            addHours.innerHTML = "Current Hours: " + totalHours;
            addCosts.innerHTML = "Total Cost: $" + totalCost;
        })
            .then(function () {

            })
    };
});