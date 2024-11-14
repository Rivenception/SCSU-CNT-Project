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
            defaultValue: "Admin",
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: "Daily Log",
            allowNull: false,
        },
        logNotes: {
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
        });

        cntTimesheet.belongsTo(models.Project, {
            foreignKey: {
                name: 'projectName',
                allowNull: false,
            },
        });
    };
    

    return cntTimesheet;
};