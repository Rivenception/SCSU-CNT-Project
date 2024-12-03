/* const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;  */

$(document).ready(function () {
    var tableBody = $("tbody");
    var tableContainer = $(".container");

    var name = $('#contact')
    var company = $('#company');
    var email = $('#email');
    var userName = $('#hidden-studentId').text();

    $(document).on("click", "#submit", handleFormSubmit);

    getLastEntries();

    // A function for handling what happens when the form to create a new contact is submitted
    function handleFormSubmit() {
        // Wont submit if data is missing.

        console.log(name.val().trim());
        console.log(company.val().trim());
        console.log(email.text().trim());

        // try to get a modal implemented for if certain fields are empty on submission
        // if (!name.val().trim() || !company.val().trim() || !email.val().trim()) {
        //     return;
        // }

        // Constructing a newcontact object to hand to the database
        var newContact = {
            personName: name.val().trim(),
            affiliateName: company.val().trim(),
            email: email.val().trim(),
        };

        if (userName && (userName != "")) {
            console.log("fetching updates");
            updateContact(newContact);
        } else {
            console.log("adding entry");
            console.log(newContact);
            submitContact(newContact);
        }
    };

    // Submits a new Contact entry
    function submitContact(data) {
        $.post("/api/contacts", data)
        .then(getLastEntries);
    }

    
    // Function for creating a new list row for timeblocks
    function createRow(newEntry) {
        var allEntries = [];
        for (var i = 0; i < newEntry.length; i++) {
            var newTr = $("<tr>");
            newTr.data("tableRow", newEntry[i].id);
            newTr.append("<td id='<td id=contact#" + newEntry[i].id + "'>" + newEntry[i].personName + "</td>");
            newTr.append("<td id='tableCompany'>" + newEntry[i].company + "</td>");
            newTr.append("<td id='tableEmail'>" + newEntry[i].email + "</td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='edit-entry fa fa-pencil-square-o aria-hidden='true'></i></td>");
            newTr.append("<td><i style='cursor:pointer;color:#a72b32' class='delete-entry fa fa-trash-o'></i></td>");
            allEntries.push(newTr)
        }
        return allEntries;
    }

    // Function for retrieving timeblocks and getting them ready to be rendered to the page
    function getLastEntries() {
        var rowsToAdd = [];
        var route = "";
        if (userName && (userName != "")) {
            route = "/api/contacts/" + userName;
        } else {
            route = "/api/contacts";
        };
        $.get(route, function (data) {
            if (userName && (userName != "")) {
                data = [data];
            };
            for (var i = 0; i < data.length; i++) {
                var newEntry = {
                    id: data[i].person_id,
                    personName: data[i].personName,
                    company: data[i].affiliateName,
                    email: data[i].email,
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

    // Function for handling what to render when the Contact is not in the database
    function renderEmpty() {
        var alertDiv = $("<div>");
        alertDiv.addClass("alert alert-danger");
        alertDiv.text("Please contact your administrator to have your studentId entered");
        tableContainer.append(alertDiv);
    }

    $(document).on("click", "#submit", function(event) {
        event.preventDefault();  // Prevent the form submission (and page reload)
        
        // Your logic for form submission (e.g., via AJAX)
        handleFormSubmit();
    });

    $(document).on("click", ".delete-entry", handleDeleteButtonPress);

    // Function for handling what happens when the delete button is pressed
    function handleDeleteButtonPress() {
        var id = $(this).parent("td").parent("tr").data("tableRow");
        console.log(id);
        $.ajax({
            method: "DELETE",
            url: "api/contacts/entries/" + id
        })
            .then(getLastEntries);
    }

    // This function figures out which post we want to edit and takes it to the appropriate url
    function handleEdit() {
        var currentEntry = $(this).parent("td").parent("tr").data("tableRow");
        console.log(currentEntry);
        window.location.href = "/admin/" + currentEntry
    }

    $(document).on("click", ".edit-entry", handleEdit);

    // Update a given post, bring user to the blog page when done
    function updateContact(entry) {
        console.log(entry);
        $.ajax({
            method: "PUT",
            url: "/api/contacts/" + userName,
            data: entry
        })
            .then(function () {
                window.location.href = "/admin";
            });
    }
});

