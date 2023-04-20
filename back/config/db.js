const mysql = require('mysql')
const db = mysql.createConnection({
host: "host",
user: "sidx",
password: "Sid$igma3",
database:"login", 
port: 8080
})

module.exports = db;
