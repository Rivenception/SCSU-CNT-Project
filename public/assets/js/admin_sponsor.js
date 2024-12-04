/* const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;  */

$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".table-container");

    var ProjectId = $("#Project-id");
    var name = $('#name')
    var position = $('#deptSelect');
    var email = $("#title");
    var status = $('#statusSelect');
    var userName = $('#hidden-ProjectId').text();

    $(document).on("click", "#submit", handleFormSubmit);

    getLastEntries();

    // A function for handling what happens when the form to create a new Project is submitted
    function handleFormSubmit() {
        // Wont submit if data is missing.

        console.log(ProjectId.val().trim());
        console.log(position.text().trim());
        console.log(name.val().trim());
        console.log(status.val().trim());

        if (!ProjectId.val().trim() || !name.val().trim() || !email.val().trim()) {
            return;
        }
        // Constructing a newProject object to hand to the database
        var newProject = {
            projectName: ProjectId.val().trim(),
            projectSponsor: name.val().trim(),
        };

        if (userName && (userName != "")) {
            console.log("fetching updates");
            updateProject(newProject);
        } else {
            submitProject(newProject);
        }
    };

    // Submits a new Project entry
    function submitProject(data) {
        $.post("/api/sponsors", data)
        .then(getLastEntries);
    }

    
    // Function for creating a new list row for timeblocks
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].projectId);
            newTr.append("<td id='tableSponsor'>" + newEntry[i].projectSponsor + "</td>");
            newTr.append("<td id='tableProject'>" + newEntry[i].projectName + "</td>");
            // newTr.append("<td id='tableStatus'>" + newEntry[i].status + "</td>");
            // newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getLastEntries() {
        var rowsToAdd = [];
        var route = "";
        if (userName && (userName != "")) {
            route = "/api/prj/" + userName;
        } else {
            route = "/api/prj";
        };
        $.get(route, function (data) {
            if (userName && (userName != "")) {
                data = [data];
            };
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    projectId: data[i].projectName,
                    projectName: data[i].projectName,
                    projectSponsor: data[i].projectSponsor,
                    status: data[i].status,
                }
                rowsToAdd.push(newEntry);
            }
            renderList(createRow(rowsToAdd));
        });
    }

    // A function for rendering the list of timeblocks to the page
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

    // Function for handling what to render when the Project is not in the database
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("Please contact your administrator to have your ProjectID entered");
        tableContainer.append(alertDiv);
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

    // Update a given post, bring user to the blog page when done
    function updateProject(entry) {
        console.log(entry);
        $.ajax({
            method: "PUT",
            url: "/api/prj/" + userName,
            data: entry
        })
            .then(function () {
                window.location.href = "/admin";
            });
    }
});

