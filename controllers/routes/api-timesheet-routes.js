const moment = require("moment");
const { sequelize } = require("../../models");
var db = require("../../models");
const { Op } = require('sequelize');

module.exports = function (app) {
    app.get("/api/timesheets", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/users/:user", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                employee_id: req.params.user
            },
            order: [
                ['id', 'DESC']
            ],
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/entries/:id", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
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

    app.get("/api/timesheets/limit=50", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/limit=50/eng", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
                where: {
                    dept: 'Engineering'
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

    app.get("/api/timesheets/limit=50/mfg", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
                where: {
                    dept: 'Manufacturing'
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

    app.get("/api/timesheets/limit=50/pm", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
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

    app.get("/api/timesheets/limit=50/certs", function (req, res) {
        db.Timesheet.findAll({
            include: {
                model: db.Employee,
                where: {
                    dept: 'Certification'
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

    app.get("/api/timesheets/limit=50/:user?", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                employee_id: req.params.user
            },
            order: [
                ['id', 'DESC']
            ],
            limit: 50
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.get("/api/timesheets/programs/:rfb", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
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

    app.get("/api/timesheets/programs/ecr/:ecr", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
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

    app.get("/api/timesheets/:category", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
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
    app.get("/api/timesheets/tasks/eng/daily", function (req, res) {
        db.Timesheet.findAll({
            include: [{
                model: db.Employee,
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
    app.get("/api/timesheets/tasks/eng/weekly", function (req, res) {
        db.Timesheet.findAll({
            include: [{
                model: db.Employee,
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
    app.get("/api/timesheets/tasks/eng/monthly", function (req, res) {
        db.Timesheet.findAll({
            include: [{
                model: db.Employee,
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
    app.get("/api/timesheets/tasks/eng/quarterly", function (req, res) {
        db.Timesheet.findAll({
            include: [{
                model: db.Employee,
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
    app.get("/api/timesheets/tasks/:id", function (req, res) {
        db.Timesheet.findAll({
            include: [db.Employee],
            where: {
                employee_id: req.params.id,
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

    app.post("/api/timesheets", function (req, res) {
        db.Timesheet.create(req.body,
            {
                include: [db.Employee],
            }).then(function (dbTimesheet) {
                res.json(dbTimesheet);
            });
    });

    app.delete("/api/timesheets/entries/:id", function (req, res) {
        db.Timesheet.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbTimesheet) {
            res.json(dbTimesheet);
        });
    });

    app.put("/api/timesheets/entries/:id", function (req, res) {
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

