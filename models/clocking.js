const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Clocking = sequelize.define("Clocking", {
        clock_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        studentName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            len: [1]
        },
        timeType: {
            type: DataTypes.ENUM('Time In', 'Time Out'),
            allowNull: false
        },
        timeEntry: {
            type: DataTypes.TIME, // This stores the time in HH:MM:SS format
            allowNull: false
        },
        // student_id: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     len: [1]
        // },
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

    Clocking.associate = function (models) {
        Clocking.belongsTo(models.Student, {
            foreignKey: {
                name: 'studentName',
                allowNull: false,
            },
        });
    };

    return Clocking;
};