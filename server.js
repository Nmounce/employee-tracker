const express = require('express');
const mysql = require('mysql2')
const fs = require('fs');
const inquirer = require('inquirer');
const cTable = require('console.table');

const dept = require('./lib/dept-table');
const role = require('./role-table');
const emp = require('./emp-table');

const PORT = process.env.PORT || 8080

//Express Middleware
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());


//create connection
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Justfuckingwork1!',
    database: 'roster'
});

//connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Roster connected...')
});

const app = express();

//create db 
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE roster';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created... ')
    })
});

//Listen for request
app.listen('8080', () => {
    console.log('Server started on port 8080');
});