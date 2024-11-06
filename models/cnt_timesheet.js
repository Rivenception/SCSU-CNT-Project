module.exports = function (sequelize, DataTypes) {
    var cntTimesheet = sequelize.define("cntTimesheet", {
        // student_id: {
        //     type: DataTypes.INTEGER,
        // },
        studentName: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        projectName: {
            type: DataTypes.STRING,
            defaultValue: "",
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        dailyNotes: {
            type: DataTypes.TEXT,
            allowNull: false,
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

    cntTimesheet.associate = function (models) {
        // We're saying that a cntTimesheet should belong to an Student
        // A cntTimesheet can't be created without an Student due to the foreign key constraint
        cntTimesheet.belongsTo(models.Student, {
            foreignKey: {
                name: 'studentName',
                allowNull: false,
            },
            foreignKeyConstraint: true,
            targetKey: 'studentName',
            constraints: false
        });
    };

    return cntTimesheet;
};