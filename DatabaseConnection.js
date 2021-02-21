const mysql = require('mysql');
require('dotenv').config();
const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    database: process.env.DB_DB,
    password: process.env.DB_PASS
});

module.exports = connection;
