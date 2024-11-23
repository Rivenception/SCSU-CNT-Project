const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        project_id: {
            type: DataTypes.INTEGER,
            unique: true,
            autoIncrement: true,
        },
        projectName: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        projectSponsor: {
            type: DataTypes.STRING,
            allowNull: true,
            len: [1]
        },
        status: {
            type: DataTypes.ENUM('Active', 'Inactive'),
            allowNull: false,
            defaultValue: "Active",
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

    Project.associate = function (models) {
        Project.hasMany(models.cntTimesheet, {
            foreignKey: {
                name: 'projectName',
                allowNull: false,
            },
        });

        // Project has many Affiliates through the ProjectAffiliate join table
        Project.belongsToMany(models.Affiliate, {
            through: models.ProjectAffiliate, // This specifies the junction table
            foreignKey: 'projectSponsor',     // Foreign key in the junction table
            otherKey: 'affiliateName',        // Other key in the junction table
            as: 'affiliates',                 // Alias for the association
        });

        Project.hasMany(models.Task, {
            foreignKey: {
                name: 'projectName',
                allowNull: false,
            },
        });
    };

    return Project;
};