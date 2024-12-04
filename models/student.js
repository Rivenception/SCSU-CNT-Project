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
            // primaryKey: true,
            unique: true, // This makes student_id unique
            len: [1]
        },
        studentName: {
            type: DataTypes.STRING,
            unique: true, // This makes student_id unique
            // primaryKey: true,
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
            index: true               // Add this line to create an index
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

    Student.associate = function (models) {
        Student.hasMany(models.cntTimesheet, {
            foreignKey: {
                name: 'studentName',
                allowNull: false,
            },
            sourceKey: 'studentName',
        });

        Student.belongsTo(models.Faculty, {
            foreignKey: {
                name: 'supervisor',
                allowNull: false,
            },
            targetKey: 'facultyName',
        });

        // Student.hasOne(models.Faculty, {
        //     foreignKey: {
        //         name: 'facultyName',
        //         allowNull: false,
        //     },
        // });

        Student.hasMany(models.Clocking, {
            foreignKey: {
                name: 'studentName',
                allowNull: false,
            },
            sourceKey: 'studentName',
        });

        Student.hasMany(models.Task, {
            foreignKey: {
                name: 'assignedTo',
                allowNull: false,
            },
            sourceKey: 'studentName',
        });
    };

    return Student;
};