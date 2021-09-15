const db = require('../config/connection');
const departmentFunctions = {
    addDept: function () {
        let dept = {
            title: 'Department Id',
            body: 'Department Name',
        };
        let sql = 'INSERT INTO dept SET ?';
        let query = db.query(sql, post, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Department added");
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
    updateDept: function () {
        let newTitle = 'Updated title';
        let sql = `UPDATE dept SET title = ${newTitle} WHERE id = ${req.params.id}`;
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
