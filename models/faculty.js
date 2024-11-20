const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Faculty = sequelize.define("Faculty", {
        facultyName: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        faculty_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        dept: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        manager: {
            type: DataTypes.STRING,
            allowNull: true,
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

    Faculty.associate = function (models) {
        Faculty.hasMany(models.Student, {
            foreignKey: {
                name: 'supervisor',
                allowNull: false,
            },
        });
    };

    return Faculty;
};