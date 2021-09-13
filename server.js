const express = require('express');
const app = express();
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const PORT = process.env.PORT || 8080

//Express Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


console.table([
    {
        Department ID: SELECT dept_id FROM department WHERE department_id = '*'
        
    }
])

//Connect to DATABASE
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Justfuckingwork1!',
        database: 'roster_db'
    }, console.log('Connected to DATABASE roster_db')
)

app.post('/api/add-movie'(req, res) => {
    const query = `INSERT INTO movies (movie_name) VALUES (?)`
    const { movieName } = req.body
    db.query(query, movieName, (err, result) => {
        if (err) {
            res.status(400).json(err)
        }
        res.json({
            message: "success!",
            data: result
        })
    })
})
