const db = require('../config/connection');

const roleFunctions = {
    getRole: function (role) {
        // let rol = 'roster_db.emprole';
        const sql = `SELECT * FROM emprole JOIN department ON emprole.dept_id = department.dept_id`;
        let query = db.query(sql, (err, result) => {
            // if (err) throw err;
            console.table(result);
        });
    },
    getRoleId: function () {
        let sql = `SELECT * FROM role WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            // if (err) throw err;
            console.table(result);
        });
    },
    updateRole: function () {
        let newTitle = 'Updated title';
        let sql = `UPDATE role SET title = ${newTitle} WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            // if (err) throw err;
            console.table(result);
        });
    },
    deleteRole: function () {
        let sql = `DELETE FROM role WHERE id = ${req.params.id}`;
        let query = db.query(sql, (err, result) => {
            // if (err) throw err;
            console.table(result);
        });
    },
}

module.exports = roleFunctions;