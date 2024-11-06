const moment = require("moment");
const { sequelize } = require("../../models");
var db = require("../../models");
const { Op } = require('sequelize');

module.exports = function (app) {
    app.get("/api/cntTimesheets", function (req, res) {
        db.cntTimesheet.findAll({
            include: [db.Student],
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/cntTimesheets/users/:user", function (req, res) {
        db.cntTimesheet.findAll({
            include: [{
            model: db.Student,
            where: {
                studentId: req.params.user
            }}],
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/cntTimesheets/entries/:id", function (req, res) {
        db.cntTimesheet.findAll({
            include: [db.Student],
            where: {
                id: req.params.id
            },
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/cntTimesheets/limit=50", function (req, res) {
        db.cntTimesheet.findAll({
            include: [db.Student],
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // not in use atm.
    app.get("/api/cntTimesheets/limit=50/pm", function (req, res) {
        db.cntTimesheet.findAll({
            include: {
                model: db.Student,
                where: {
                    dept: 'Program Management'
                },
            },
            order: [
                ['date', 'DESC'],
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/cntTimesheets/limit=50/:user?", function (req, res) {
        db.cntTimesheet.findAll({
            include: [{
                model: db.Student,
                where: {
                    studentId: req.params.user
                }}],
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // --------------------------------- Functional to here!

    app.get("/api/cntTimesheets/programs/:rfb", function (req, res) {
        db.cntTimesheet.findAll({
            include: [db.Student],
            where: {
                program: req.params.rfb
            },
            order: [
                ['date', 'DESC'],
                ['id', 'DESC']
            ],
            limit: 5000
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/cntTimesheets/programs/ecr/:ecr", function (req, res) {
        db.cntTimesheet.findAll({
            include: [db.Student],
            where: {
                ecr: req.params.ecr
            },
            order: [
                ['date', 'DESC'],
                ['id', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/cntTimesheets/:category", function (req, res) {
        db.cntTimesheet.findAll({
            include: [db.Student],
            where: {
                category: req.params.category
            },
            order: [
                ['date', 'DESC'],
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // Data based on last Xn of days - Daily
    app.get("/api/cntTimesheets/tasks/eng/daily", function (req, res) {
        db.cntTimesheet.findAll({
            include: [{
                model: db.Student,
                where: {
                    dept: "Engineering"
                }
            }],
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(10, 'hours').toDate()
                }
            },
            order: [
                ['date', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // Data based on last Xn of days - Weekly
    app.get("/api/cntTimesheets/tasks/eng/weekly", function (req, res) {
        db.cntTimesheet.findAll({
            include: [{
                model: db.Student,
                where: {
                    dept: "Engineering"
                }
            }],
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(7, 'days').toDate()
                }
            },
            order: [
                ['date', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // Data based on last Xn of days - Monthly
    app.get("/api/cntTimesheets/tasks/eng/monthly", function (req, res) {
        db.cntTimesheet.findAll({
            include: [{
                model: db.Student,
                where: {
                    dept: "Engineering"
                }
            }],
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(30, 'days').toDate()
                }
            },
            order: [
                ['date', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // Data based on last Xn of days - Quarterly
    app.get("/api/cntTimesheets/tasks/eng/quarterly", function (req, res) {
        db.Timesheet.findAll({
            include: [{
                model: db.Student,
                where: {
                    dept: "Engineering"
                }
            }],
            where: {
                createdAt: {
                    [Op.gte]: moment().subtract(90, 'days').toDate()
                }
            },
            order: [
                ['date', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    // Data based on current day using moment.js formatting
    app.get("/api/cntTimesheets/tasks/:id", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Student],
            where: {
                Student_id: req.params.id,
                date: moment(new Date()).format("YYYY-MM-DD")
                // createdAt: {
                //     [Op.gte]: moment().subtract(1, 'days').toDate()
                // }
            },
            order: [
                ['date', 'DESC']
            ]
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.post("/api/cntTimesheets", function (req, res) {
        db.Timesheet.create(req.body,
            {
                include: [db.Student],
            }).then(function (dbTimesheet) {
                res.json(dbTimesheet);
            });
    });

    app.delete("/api/cntTimesheets/entries/:id", function (req, res) {
        db.Timesheet.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.put("/api/cntTimesheets/entries/:id", function (req, res) {
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

