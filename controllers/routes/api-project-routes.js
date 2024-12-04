const db = require("../../models");

module.exports = function (app) {
    app.get("/api/prj", function (req, res) {
        console.log('Received request for projects');
        db.Project.findAll({
            order: [
                ['projectName', 'ASC']
            ],
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.get("/api/projects/entries/:id", function (req, res) {
        db.Project.findOne({
                where: {
                    project_id: req.body.id
                }
            }).then(function (dbProject) {
                res.json(dbProject);
            });
    });
    
    app.post("/api/projects", function (req, res) {
        db.Project.create(req.body).then(function (dbProject) {
                res.json(dbProject);
            });
    });

    app.delete("/api/projects/entries/:id", function (req, res) {
        db.Project.destroy({
            where: {
                project_id: req.params.id
            }
        }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.put("/api/projects/entries/:id", function (req, res) {
        db.Project.update(req.body,
            {
                where: {
                    project_id: req.body.id
                }
            }).then(function (dbProject) {
                res.json(dbProject);
            });
    });

};

