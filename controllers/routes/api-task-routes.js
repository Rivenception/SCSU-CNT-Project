const db = require("../../models");

module.exports = function (app) {
    app.get("/api/task", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            order: [
                ['task_id', 'ASC']
            ],
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    app.get("/api/task/stu/:student", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            include: [
                {
                    model: db.Project,
                },
                {
                model: db.Student,
                where: {
                    student_id: req.params.student
                    }
                }],
                order: [
                    ['task_id', 'ASC']
                ],
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });
    
    app.get("/api/task/prj", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            include: [
                {
                model: db.Student,
                },
                {
                model: db.Project,
                }],
            order: [
                ['priority', 'ASC'],
                ['dueDate', 'ASC']
            ],
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    app.get("/api/task/prj/:project_id", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            include: [
                {
                    model: db.Student,
                },
                {
                model: db.Project,
                where: {
                    project_id: req.params.project_id
                    }
                }],
            order: [
                ['task_id', 'ASC']
            ],
        }).then(function (dbTask) {
            res.json(dbTask);
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

