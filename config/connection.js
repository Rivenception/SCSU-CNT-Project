//Updated for Sequelize syntax

require("dotenv").config(); 

// Dependencies
var Sequelize = require("sequelize");
var sequelize = new Sequelize("time_monitorDB", "root", process.env.MYSQLPASS, {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
 
});

// Export sequelize for use.
module.exports = sequelize;
