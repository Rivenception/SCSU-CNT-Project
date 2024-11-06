const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
        student_id: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        studentName: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                len: [1, 255]}
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        supervisor: {
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
        // We're saying that a cntTimesheet should belong to an Student
        // A cntTimesheet can't be created without an Student due to the foreign key constraint
        Student.hasMany(models.cntTimesheet, {
            foreignKey: {
                name: 'studentName',
                allowNull: false,
            },
            foreignKeyConstraint: true,
            sourceKey: 'studentName'
        });
    };

    return Student;
};