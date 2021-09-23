const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    // port: process.env.PORT || 3001,
    user: 'root',
    password: 'Justfuckingwork1!',
    database: 'employees'
});

//connect to database
connection.connect((err) => {
    if (err) throw err;
    console.log('Employee Tracker connected...')
});

module.exports = connection;