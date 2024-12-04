const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Login = sequelize.define("Login", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            len: [1]
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
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

    // Login.associate = function (models) {
    //     // Affiliate has many Projects through the ProjectAffiliate join table
    //     Login.belongsToMany(models.Project, {
    //         through: models.ProjectAffiliate, // This specifies the junction table
    //         foreignKey: 'affiliateName',      // Foreign key in the junction table
    //         otherKey: 'projectSponsor',       // Other key in the junction table
    //         as: 'projects',                   // Alias for the association
    //     });
    // };

    return Login;
};