const db = require('../config/connection');
const roleFunctions = {
    addRole: function () {
        let role = 'roster_db.empRole';
        let sql = 'INSERT INTO role SET ?';
        let query = db.query(sql, role, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Role Added");
        });
    },
    getRole: function () {
        let sql = 'SELECT * FROM employee JOIN department ON emprole.dept_id = department.dept_id';
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Roles fetched...");
        });
    },
    getRoleId: function () {
        let sql = `SELECT * FROM role WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Role fetched...");
        });
    },
    updateRole: function () {
        let newTitle = 'Updated title';
        let sql = `UPDATE role SET title = ${newTitle} WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Role updated...");
        });
    },
    deleteRole: function () {
        let sql = `DELETE FROM role WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            if (err) throw err;
            console.table(result);
            res.send("Role deleted...");
        });
    },
}

module.exports = roleFunctions;