const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node',
    password : "9777258"
})

module.exports = pool.promise()