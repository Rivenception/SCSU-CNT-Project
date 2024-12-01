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
            distinct: true,
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
};

