const db = require("../../models");

module.exports = function (app) {
    app.get("/api/clocking/entries", function (req, res) {
        console.log('Received request for project Clockings');
        db.Clocking.findAll({
            include: [db.Student],
            order: [
                ['date', 'ASC']
            ],
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
                    ['date', 'DESC']
                ],
        }).then(function (dbClocking) {
            res.json(dbClocking);
        });
    });

    app.post("/api/clocking", function (req, res) {
        db.Clocking.create(req.body,
            {
                include: [db.Student],
            }).then(function (dbClocking) {
                res.json(dbClocking);
            });
    });

    app.delete("/api/clocking/entries/:id", function (req, res) {
        db.Clocking.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (dbClocking) {
            res.json(dbClocking);
        });
    });

    app.put("/api/clocking/entries/:id", function (req, res) {
        db.Clocking.update(req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (dbClocking) {
                res.json(dbClocking);
            });
    });

};

