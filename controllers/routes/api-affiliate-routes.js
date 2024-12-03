const db = require("../../models");

module.exports = function (app) {
    app.get("/api/contacts", function (req, res) {
        console.log('Received request for contacts');
        db.AffiliateContact.findAll({
            order: [
                ['affiliateName', 'ASC']
            ],
        }).then(function (dbAffiliateContact) {
            res.json(dbAffiliateContact);
        });
    });
    
    app.post("/api/contacts", function (req, res) {
        db.AffiliateContact.create(req.body).then(function (dbAffiliateContact) {
                res.json(dbAffiliateContact);
            });
    });

    app.delete("/api/contacts/entries/:id", function (req, res) {
        db.AffiliateContact.destroy({
            where: {
                person_id: req.params.id
            }
        }).then(function (dbAffiliateContact) {
            res.json(dbAffiliateContact);
        });
    });

    app.put("/api/contacts/entries/:id", function (req, res) {
        db.AffiliateContact.update(req.body,
            {
                where: {
                    person_id: req.body.id
                }
            }).then(function (dbAffiliateContact) {
                res.json(dbAffiliateContact);
            });
    });

};

