const db = require("../../models");

// errorHandler.js
function handleError(res, error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'An internal server error occurred.' }); // Respond with a 500 status and error message
}

function dbEmptyCheck(res, data) {
    // Check if the data array is empty
    if (data.length === 0) {
        return res.status(404).json({ message: 'No Faculty found.' });
    }
    console.log('Faculty retrieved:', data); // Log the retrieved data
    return true; // Return true if data is not empty
}

module.exports = function (app) {
    // First function has some features to help debugging.
    app.get("/api/faculty", function (req, res) {
        console.log('Received request for faculty'); //Check api being called
        db.Faculty.findAll({
            order: [
                ['facultyName', 'ASC']
            ],
        })
        .then(function (dbFaculty) {
            // Check if any faculty were found
            if (!dbEmptyCheck(res, dbFaculty)) {
                return; // Exit if the check indicates no faculty were found
            }
            res.json(dbFaculty); // Send the retrieved faculty as a JSON response
        })
        .catch(function (error) {
            handleError(res, error); // Call the error handling function
        });
    });

    app.get("/api/faculty/:user", function (req, res) {
        console.log('Received request for faculty'); //Check api being called
        db.Faculty.findAll({
            where: {
                Faculty_id: req.params.user
            },
            order: [
                ['facultyName', 'ASC']
            ],
        })
        .then(function (dbFaculty) {
            // Check if any faculty were found
            if (!dbEmptyCheck(res, dbFaculty)) {
                return; // Exit if the check indicates no faculty were found
            }
            res.json(dbFaculty); // Send the retrieved faculty as a JSON response
        })
        .catch(function (error) {
            handleError(res, error); // Call the error handling function
        });
    });

    app.get("/api/faculty/:user", function (req, res) {
        db.Faculty.findOne({
            where: {
                faculty_id: req.params.user
            },
            include: [db.cntTimesheet]
        }).then(function (dbFaculty) {
            res.json(dbFaculty);
        });
    });

    app.post("/api/faculty", function (req, res) {
        db.Faculty.create(req.body).then(function (dbFaculty) {
            res.json(dbFaculty);
        });
    });

    app.delete("/api/faculty/entries/:user", function (req, res) {
        db.Faculty.destroy({
                where: {
                    faculty_id: req.params.user
                }
            }).then(function (dbFaculty) {
            res.json(dbFaculty);
        });
    });

    app.put("/api/faculty/entries/:user", function (req, res) {
        db.Faculty.update(req.body,
            {
                where: {
                    faculty_id: req.params.user
                }
            }).then(function (dbFaculty) {
            res.json(dbFaculty);
        });
    });

};