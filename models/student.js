const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        student_id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        project: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        status: {
            type: DataTypes.STRING,
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

    Student.associate = function (models) {
        // We're saying that a Timesheet should belong to an Employee
        // A Timesheet can't be created without an Employee due to the foreign key constraint
        Student.hasMany(models.Timesheet, {
            foreignKey: {
                name: 'FKstudent_id',
                allowNull: false,
            },
            // foreignKeyConstraint: true,
            // sourceKey: 'employee_id'
        });
    };

    return Student;
};