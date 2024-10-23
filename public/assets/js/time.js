// trialing a router switch to calculate total time logged for tasks by week as a tool for metrics later.

var route = ''
var htmlHeader = $(".header");
var hiddenURL = $('#hiddenId').text();

function checkHeader() {
    if (htmlHeader === 'Engineering') {
        route = "/api/timesheets/programs/ecr/" + hiddenURL;
    } else if (htmlHeader === 'Manufacturing') {
        route = "/api/timesheets/programs/" + hiddenURL;
    } else if (htmlHeader === 'Program Management') {
        route = "pm";
    };
};

function getTime() {
    var route = "/api/timesheets/programs/ecr/" + ecr;
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
};

checkHeader();
getTime();