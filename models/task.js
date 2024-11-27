const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        task_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taskNotes: {
            type: DataTypes.STRING,
            allowNull: true,
            len: [1]
        },
        assignedTo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        priority: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        requestor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dueDate: {
            type: DataTypes.DATE,
            allowNull: false,
            len: [1]
        },
        status: {
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

    Task.associate = function (models) {
        Task.hasOne(models.Project, {
            foreignKey: {
                name: 'projectName',
                allowNull: false,
            },
        });
    };

    Task.associate = function (models) {
        Task.belongsTo(models.Student, {
            foreignKey: {
                name: 'assignedTo',
                allowNull: false,
            },
            targetKey: 'studentName'
        });
    };

    return Task;
};