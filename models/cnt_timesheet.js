module.exports = function (sequelize, DataTypes) {
    var cntTimesheet = sequelize.define("cntTimesheet", {
        student_id: {
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
        timeIn: {
            type: DataTypes.STRING,
            allowNull: true,
            len: [1]
        },
        timeOut: {
            type: DataTypes.STRING,
            allowNull: true,
            len: [1]
        },
        project: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
            validate: {
                len: [30]
            },
        },
        weeklyGoal: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        dailyProg: {
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

    cntTimesheet.associate = function (models) {
        // We're saying that a Timesheet should belong to an Employee
        // A Timesheet can't be created without an Employee due to the foreign key constraint
        cntTimesheet.belongsTo(models.Student, {
            foreignKey: {
                name: 'FKstudent_id',
                allowNull: false,
            },
            // foreignKeyConstraint: true,
            // targetKey: 'employee_id',
            // constraints: false
        });
    };

    return cntTimesheet;
};