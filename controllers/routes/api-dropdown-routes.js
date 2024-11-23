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
    // SELECT id, studentName, date, projectName, category, logNotes, createdAt, createdAt, updatedAt FROM cntTimesheet WHERE category = category
    app.get("/api/category/:category", function (req, res) {
        console.log('Received request for categories from the cntTimesheets table');
        db.cntTimesheet.findAll({
            attributes: ['id','studentName','date','projectName','category','logNotes','createdAt','updatedAt'],
            where: {
                category: req.params.category,
            },
            order: [
                ['category', 'ASC']
            ],
        }).then(function (dbcntTimesheet) {
            res.json(dbcntTimesheet);
        });
    });
};

