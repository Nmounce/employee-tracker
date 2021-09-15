const db = require('../config/connection');
const inquirer = require('inquirer');

const departmentFunctions = {
    addDept: function () {
        let dept = 'roster_db.department';
        let sql = 'INSERT INTO dept SET ?';
        let query = db.query(sql, dept, (err, result) => {
            if (err) throw err;
            console.table(result);
        });
    },
    getDept: function () {
        let sql = 'SELECT * FROM department';
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
        });
    },
    getDeptId: function () {
        let sql = `SELECT * FROM dept WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
        });
    },
    deleteDept: function () {
        let sql = `DELETE FROM dept WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
        });
    },
}

module.exports = departmentFunctions;