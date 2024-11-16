const db = require("../../models");

// errorHandler.js
function handleError(res, error) {
    console.error('Error:', error); // Log the error for debugging
    res.status(500).json({ error: 'An internal server error occurred.' }); // Respond with a 500 status and error message
}

function dbEmptyCheck(res, data) {
    // Check if the data array is empty
    if (data.length === 0) {
        return res.status(404).json({ message: 'No students found.' });
    }
    console.log('Students retrieved:', data); // Log the retrieved data
    return true; // Return true if data is not empty
}

module.exports = function (app) {
    // First function has some features to help debugging.
    app.get("/api/students", function (req, res) {
        console.log('Received request for students'); //Check api being called
        db.Student.findAll({
            order: [
                ['status', 'ASC'],
                ['studentName', 'ASC']
            ],
        })
        .then(function (dbStudent) {
            // Check if any students were found
            if (!dbEmptyCheck(res, dbStudent)) {
                return; // Exit if the check indicates no students were found
            }
            res.json(dbStudent); // Send the retrieved students as a JSON response
        })
        .catch(function (error) {
            handleError(res, error); // Call the error handling function
        });
    });

    app.get("/api/students/:user", function (req, res) {
        console.log('Received request for students'); //Check api being called
        db.Student.findAll({
            where: {
                student_id: req.params.user
            },
            order: [
                ['status', 'ASC'],
                ['studentName', 'ASC']
            ],
        })
        .then(function (dbStudent) {
            // Check if any students were found
            if (!dbEmptyCheck(res, dbStudent)) {
                return; // Exit if the check indicates no students were found
            }
            res.json(dbStudent); // Send the retrieved students as a JSON response
        })
        .catch(function (error) {
            handleError(res, error); // Call the error handling function
        });
    });

    app.get("/api/students/eng", function (req, res) {
        db.Student.findAll({
            where: {
                dept: 'Engineering'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.get("/api/students/mfg", function (req, res) {
        db.Student.findAll({
            where: {
                dept: 'Manufacturing'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.get("/api/students/pm", function (req, res) {
        db.Student.findAll({
            where: {
                dept: 'Program Management'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.get("/api/students/certs", function (req, res) {
        db.Student.findAll({
            where: {
                dept: 'Certification'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.get("/api/students/:user", function (req, res) {
        db.Student.findOne({
            where: {
                student_id: req.params.user
            },
            include: [db.cntTimesheet]
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.post("/api/students", function (req, res) {
        db.Student.create(req.body).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.put("/api/students/:user", function (req, res) {
        db.Student.update(req.body,
            {
                where: {
                    student_id: req.params.user
                }
            }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

};