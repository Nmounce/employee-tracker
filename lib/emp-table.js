const db = require('../config/connection');
let emp = 'roster_db.employee';
const employeeFunctions = {
    addEmp: function () {
        let sql = 'INSERT INTO emp SET ?';
        let query = db.query(sql, emp, (err, result) => {
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
        let newTitle = 'Updated role';
        let sql = `UPDATE emp SET role = ${newTitle} WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employee updated...");
        });
    },
    updateMgr: function () {
        let newMgr = 'Updated manager';
        let sql = `UPDATE emp SET manager = ${newMgr} WHERE id = ${req.params.manager_id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Manager updated...");
        });
    },
    deleteEmp: function () {
        let sql = `DELETE FROM emp WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Employee deleted...");
        });
    },
};

module.exports = employeeFunctions;