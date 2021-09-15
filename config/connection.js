const mysql2 = require('mysql2');

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Justfuckingwork1!',
    database: 'roster_db'
});

//connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Roster connected...')
});

module.exports = db;