const db = require("../../models");

module.exports = function (app) {
    app.get("/api/projects", function (req, res) {
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

    app.get("/api/category", function (req, res) {
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
};

