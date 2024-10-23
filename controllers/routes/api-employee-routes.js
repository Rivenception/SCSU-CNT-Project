var db = require("../../models");
const { Op } = require('sequelize');

module.exports = function (app) {
    app.get("/api/employees", function (req, res) {
        db.Employee.findAll({
            order: [
                ['status', 'ASC'],
                ['dept', 'ASC'],
                ['name', 'ASC']
            ],
        }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.get("/api/employees/eng", function (req, res) {
        db.Employee.findAll({
            where: {
                dept: 'Engineering'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.get("/api/employees/mfg", function (req, res) {
        db.Employee.findAll({
            where: {
                dept: 'Manufacturing'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.get("/api/employees/pm", function (req, res) {
        db.Employee.findAll({
            where: {
                dept: 'Program Management'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.get("/api/employees/certs", function (req, res) {
        db.Employee.findAll({
            where: {
                dept: 'Certification'
            },
            order: [
                ['name', 'ASC']
            ],
        }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.get("/api/employees/:user", function (req, res) {
        db.Employee.findOne({
            where: {
                employee_id: req.params.user
            },
            include: [db.Timesheet]
        }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.post("/api/employees", function (req, res) {
        db.Employee.create(req.body).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

    app.put("/api/employees/:user", function (req, res) {
        db.Employee.update(req.body,
            {
                where: {
                    employee_id: req.params.user
                }
            }).then(function (dbEmployee) {
            res.json(dbEmployee);
        });
    });

};