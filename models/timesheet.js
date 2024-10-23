module.exports = function (sequelize, DataTypes) {
    var Timesheet = sequelize.define("Timesheet", {
        employee_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        timespent: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        program: {
            type: DataTypes.STRING,
            defaultValue: "9999",
            allowNull: false,
            validate: {
                len: [4]
            },
        },
        ecr: {
            type: DataTypes.STRING,
            defaultValue: "",
            len: [5]
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        // company: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     len: [1]
        // },
        // task_type: {
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

    Timesheet.associate = function (models) {
        // We're saying that a Timesheet should belong to an Employee
        // A Timesheet can't be created without an Employee due to the foreign key constraint
        Timesheet.belongsTo(models.Employee, {
            foreignKey: {
                name: 'FKemployee_id',
                allowNull: false,
            },
            // foreignKeyConstraint: true,
            // targetKey: 'employee_id',
            // constraints: false
        });
    };

    return Timesheet;
};