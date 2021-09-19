const db = require('../config/connection');

const employeeFunctions = {
    addEmp: function (emp) {
        // let emp = 'roster_db.employee';
        let sql = 'INSERT INTO employee (first_name, last_name) VALUES (?, ?)';
        let query = db.query(sql, emp.addEmpName, (err, result) => {
            if (err) throw err;
            console.table(result);
        });
    },
    getEmp: function () {
        let sql = 'SELECT * FROM employee';
        let query = db.query(sql, (err, result) => {
            console.table(result);
        });
    },
    getEmployeeId: function () {
        let sql = `SELECT * FROM employee WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            console.table(result);
        });
    },
    updateEmployee: function () {
        let newTitle = 'Updated role';
        let sql = `UPDATE employee SET role = ${newTitle} WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            console.table(result);
        });
    },
    updateMgr: function () {
        let newMgr = 'Updated manager';
        let sql = `UPDATE employee SET manager = ${newMgr} WHERE id = ${req.params.manager_id}`;
        let query = db.query(sql, (err, result) => {
            console.table(result);
        });
    },
    deleteEmployee: function () {
        let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            console.table(result);
        });
    },
};

module.exports = employeeFunctions;