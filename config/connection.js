const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Justfuckingwork1!',
    database: 'employees_db'
});

//connect to database
connection.connect(function (err) {
    if (err) throw err;
    console.log('Employee Tracker connected...')
});

module.exports = connection;