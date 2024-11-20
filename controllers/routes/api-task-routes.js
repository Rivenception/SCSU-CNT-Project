const db = require("../../models");

module.exports = function (app) {
    app.get("/api/task", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            order: [
                ['task_id', 'ASC']
            ],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });
    
    app.get("/api/task/:project", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            include: [db.Student],
            where: {
                project_id: req.params.project
            },
            order: [
                ['task_id', 'ASC']
            ],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.get("/api/task/:student", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            include: [db.Student],
            where: {
                studentName: req.params.student
            },
            order: [
                ['task_id', 'ASC']
            ],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.post("/api/task", function (req, res) {
        db.Timesheet.create(req.body,
            {
                include: [db.Student],
            }).then(function (dbTimesheet) {
                res.json(dbTimesheet);
            });
    });

    app.delete("/api/task/entries/:id", function (req, res) {
        db.Timesheet.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.put("/api/task/entries/:id", function (req, res) {
        db.Timesheet.update(req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbTimesheet) {
                res.json(dbTimesheet);
            });
    });

};

