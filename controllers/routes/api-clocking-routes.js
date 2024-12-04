const db = require("../../models");

module.exports = function (app) {
    app.get("/api/clocking/entries", function (req, res) {
        console.log('Received request for project Clockings');
        db.Clocking.findAll({
            include: [{
                model: db.Student,
                attributes: ['student_id']  // Only fetch the student_id attribute
            }],
            order: [
                ['date', 'DESC'],
                ['timeEntry', 'DESC']
            ],
        }).then(function (dbClocking) {
            res.json(dbClocking);
        });
    });

    app.get("/api/clocking/entries/:id", function (req, res) {
        console.log('Received request for project Clockings');
        db.Clocking.findAll({
            where: {
                clock_id: req.params.id
            },
            include: [{
                model: db.Student,
                attributes: ['student_id']  // Only fetch the student_id attribute
            }],
        }).then(function (dbClocking) {
            res.json(dbClocking);
        });
    });

    app.get("/api/clocking/stu/:student", function (req, res) {
        console.log('Received request for student Clockings');
        db.Clocking.findAll({
            include: [
                {
                model: db.Student,
                where: {
                    student_id: req.params.student
                    }
                }],
                order: [
                    ['date', 'DESC'],
                    ['timeEntry', 'DESC']
                ],
        }).then(function (dbClocking) {
            res.json(dbClocking);
        });
    });

    app.post("/api/clocking", function (req, res) {
        db.Clocking.create(req.body,
            {
            }).then(function (dbClocking) {
                res.json(dbClocking);
            });
    });

    app.delete("/api/clocking/entries/:id", function (req, res) {
        db.Clocking.destroy({
            where: {
                clock_id: req.params.id
            }
        }).then(function (dbClocking) {
            res.json(dbClocking);
        });
    });

    app.put("/api/clocking/entries/:id", function (req, res) {
        db.Clocking.update(req.body,
            {
                where: {
                    clock_id: req.params.id
                }
            }).then(function (dbClocking) {
                res.json(dbClocking);
            });
    });

};

