//Updated for Sequelize syntax

require("dotenv").config(); 

// Dependencies
var Sequelize = require("sequelize");

if (process.env.NODE_ENV === "production") {
  // Use the JawsDB URL on Heroku
  sequelize = new Sequelize(process.env.JAWSDB_MARIA_URL, {
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });
} else {
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
}

// Export sequelize for use.
module.exports = sequelize;
