const db = require("../../models");

module.exports = function (app) {
    app.get("/api/task", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            order: [
                ['dueDate', 'ASC']
            ],
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    app.get("/api/task/status/:status", function (req, res) {
        console.log('Received request for project tasks');
        db.Task.findAll({
            include: [
                {
                    model: db.Project,
                },
                {
                model: db.Student,
                }],
                where: {
                    status: req.params.status
                },
                order: [
                    ['dueDate', 'DESC']
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
                    ['dueDate', 'DESC']
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
                ['dueDate', 'DESC'],
                ['priority', 'ASC']
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

    app.get("/api/task/entries/:id", function (req, res) {
        db.Task.findOne({
            include: [db.Student, db.Project],
            where: {
                task_id: req.params.id
            },
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    app.post("/api/tasks", function (req, res) {
        db.Task.create(req.body).then(function (dbTask) {
                res.json(dbTask);
            });
    });

    app.delete("/api/task/entries/:id", function (req, res) {
        db.Task.destroy({
            where: {
                task_id: req.params.id
            }
        }).then(function (dbTask) {
            res.json(dbTask);
        });
    });

    app.put("/api/task/entries/:id", function (req, res) {
        db.Task.update(req.body,
            {
                where: {
                    task_id: req.params.id
                }
            }).then(function (dbTask) {
                res.json(dbTask);
            });
    });

};

