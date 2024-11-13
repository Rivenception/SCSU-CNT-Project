const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`...`);
const { document } = new JSDOM(`...`).window;
global.$ = require('jquery')(window);
global.document = document;

module.exports = function (sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
        transaction_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        affiliateName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        projectAffiliation: {
            type: DataTypes.STRING,
            allowNull: false,
            len: [1]
        },
        paymentStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        paymentAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1]
        },
        lastPayment: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        nextPayment: {
            type: DataTypes.DATEONLY,
            allowNull: true,
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

    Transaction.associate = function (models) {
        Transaction.belongsTo(models.Affiliate, {
            foreignKey: {
                name: 'affiliateName',
                allowNull: false,
            },
        });
    };

    return Transaction;
};