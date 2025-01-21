const db = require("../../models");

module.exports = function (app) {
    app.get("/api/drop/projects", function (req, res) {
        console.log('Received request for projects');
        db.Project.findAll({
            attributes: ['projectName'],
            order: [
                ['projectName', 'ASC']
            ],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.get("/api/drop/category", function (req, res) {
        console.log('Received request for categories from the cntTimesheets table');
        db.cntTimesheet.findAll({
            attributes: ['category'],
            order: [
                ['category', 'ASC']
            ],
        }).then(function (dbcntTimesheet) {
            res.json(dbcntTimesheet);
        });
    });

    app.get("/api/drop/sponsor", function (req, res) {
        console.log('Received request for projects');
        db.AffiliateContact.findAll({
            // attributes: ['affiliateName'],
            attributes: [
                [db.Sequelize.fn('DISTINCT', db.Sequelize.col('affiliateName')), 'affiliateName']
            ],
            distinct: true, //distinct:true didn't work with Sequelize. Needed to use above fn code from the docs. This may require update to db structure at a later date
            order: [
                ['affiliateName', 'ASC']
            ],
        }).then(function (dbAffiliateContact) {
            res.json(dbAffiliateContact);
        });
    });

    app.get("/api/drop/students", function (req, res) {
        console.log('Received request for students');
        db.Student.findAll({
            order: [
                ['status', 'ASC'],
                ['studentName', 'ASC']
            ],
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });

    app.get("/api/drop/faculty", function (req, res) {
        console.log('Received request for students');
        db.Faculty.findAll({
            order: [
                ['facultyName', 'ASC']
            ],
        }).then(function (dbFaculty) {
            res.json(dbFaculty);
        });
    });

    app.get("/api/drop/requestors1", function (req, res) {
        console.log('Received request for all requestors');
        db.Faculty.findAll({
            order: [
                ['facultyName', 'ASC']
            ],
            attributes: ['faculty_id', 'facultyName'],
        }).then(function (dbFaculty) {
            res.json(dbFaculty);
        });
    });

    app.get("/api/drop/requestors2", function (req, res) {
        console.log('Received request for all requestors');
        db.Student.findAll({
            order: [
                ['studentName', 'ASC']
            ],
            attributes: ['student_id', 'studentName'],
        }).then(function (dbStudent) {
            res.json(dbStudent);
        });
    });
};

