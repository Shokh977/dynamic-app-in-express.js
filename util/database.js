// const mysql = require("mysql2");
const Sequelize = require("sequelize");

//  Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//     host: 'localhost',
//     dialect: /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
//   });

const sequelize = new Sequelize("node", "root", "9777258", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node",
//   password: "9777258",
// });

// module.exports = pool.promise();
