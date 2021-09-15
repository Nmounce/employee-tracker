//create table
emp id, first name, last name, job title, dept, salary, manager id
const db = require('../config/connection');
const empFunctions = {
    addEmp: function () {
        let emp = {
            title: 'Employee Id',
            body: 'Employee Name',
        };
        let sql = 'INSERT INTO emp SET ?';
        let query = db.query(sql, post, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employee added");
        });
    },
    getEmp: function () {
        let sql = 'SELECT * FROM emp';
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employees fetched...");
        });
    },
    getEmpid: function () {
        let sql = `SELECT * FROM emp WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employee fetched...");
        });
    },
    updateEmp: function () {
        let newTitle = 'Updated title';
        let sql = `UPDATE emp SET title = ${newTitle} WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employee updated...");
        });
    },
    deleteEmployee: function () {
        let sql = `DELETE FROM emp WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employee deleted...");
        });
    },
}

module.exports = empFunctions;