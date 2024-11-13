const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Affiliate = sequelize.define("Affiliate", {
        affiliateName: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        projectAffiliation: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        createdAt: {
            type: DataTypes.DATE,
            timestamps: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            timestamps: true,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
            onUpdate: DataTypes.NOW,
            allowNull: false
        }
    });

    Affiliate.associate = function (models) {
        // Affiliate has many Projects through the ProjectAffiliate join table
        Affiliate.belongsToMany(models.Project, {
            through: models.ProjectAffiliate, // This specifies the junction table
            foreignKey: 'affiliateName',      // Foreign key in the junction table
            otherKey: 'projectSponsor',       // Other key in the junction table
            as: 'projects',                   // Alias for the association
        });

        Affiliate.hasMany(models.Transaction, {
            foreignKey: {
                name: 'affiliateName',
                allowNull: false,
            },
        });

        Affiliate.hasMany(models.AffiliateContact, {
            foreignKey: {
                name: 'affiliateName',
                allowNull: false,
            },
        });
    };

    return Affiliate;
};