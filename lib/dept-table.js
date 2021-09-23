const db = require('../config/connection');

const departmentFunctions = {
    addDept: function (dept) {
        // let dept = 'roster_db.department';
        let sql = 'INSERT INTO department (dept_name) VALUES (?)';
        let query = db.query(sql, dept.addDeptName, (err, result) => {
            // if (err) throw err;
            console.table(result);
        });
    },
    getDept: function () {
        let sql = 'SELECT * FROM department';
        let query = db.query(sql, (err, result) => {
            // if (err) throw err;
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