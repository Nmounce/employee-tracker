const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql');

const startMenu = ['View All Employees', 'View By Department', 'View By Manager', 'Add Employee', 'Delete Employee', 'Update Role', 'Update Employee Manager', 'View All Roles', 'Exit'];

const startApp = () => {
    inquirer
        .prompt({
            name: 'menuChoice',
            type: 'list',
            message: 'What would you like to do?',
            choices: startMenu
        })
        .then(function (answer) {
            if (answer.action === 'View All Employees') {
                viewAllEmployees();
            } else if (answer.action === 'View By Department') {
                viewByDepartment();
            } else if (answer.action === 'View By Manager') {
                viewByManager();
            } else if (answer.action === 'Add Employee') {
                addEmployee();
            } else if (answer.action === 'Remove Employee') {
                removeEmployee();
            } else if (answer.action === 'Update Role') {
                updateRole();
            } else if (answer.action === 'View All Roles') {
                viewAllRoles();
            } else if (answer.action === 'Exit') {
                exit();
            }
        });
}
startApp();
// const viewAllEmployees() {
// const allEmpQuery = `SELECT employee.id, employee.first_name, employee.last_name, emprole.title, department.name AS department, emprole.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN emprole ON (emprole.id = employee.role_id)
//     INNER JOIN department ON (department.id = emprole.department_id)
//     ORDER BY employee.id;`;
//     let query = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW ALL EMPLOYEES');
//         console.log('\n');
//         console.table(result);
//         prompt();
//     });
// }

const viewAllEmployees = () => {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, emprole.title, department.name AS department, emprole.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee manager on manager.id = employee.manager_id INNER JOIN emprole ON (emprole.id = employee.role_id) INNER JOIN department ON (department.id = emprole.department_id) ORDER BY employee.id`, (err, results) => {
        if (err) return err;
        console.log(' ');
        console.table(results);
        startApp();
    })
}

// function viewByDepartment() {
//     const query = `SELECT department.name AS department, emprole.title, employee.id, employee.first_name, employee.last_name
//     FROM employee
//     LEFT JOIN emprole ON (emprole.id = employee.role_id)
//     LEFT JOIN department ON (department.id = emprole.department_id)
//     ORDER BY department.name;`;
//     let sql = db.query(sql, (err, result) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY DEPARTMENT');
//         console.log('\n');
//         console.table(result);
//         prompt();
//     });
// }

// function viewByManager() {
//     const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, emprole.title
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN emprole ON (emprole.id = employee.emprole_id && employee.manager_id != 'NULL')
//     INNER JOIN department ON (department.id = emprole.department_id)
//     ORDER BY manager;`;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY MANAGER');
//         console.log('\n');
//         console.table(res);
//         prompt();
//     });
// }

// function viewAllRoles() {
//     const query = `SELECT emprole.title, employee.id, employee.first_name, employee.last_name, department.name AS department
//     FROM employee
//     LEFT JOIN emprole ON (emprole.id = employee.role_id)
//     LEFT JOIN department ON (department.id = emprole.department_id)
//     ORDER BY emprole.title;`;
//     db.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY ROLE');
//         console.log('\n');
//         console.table(res);
//         prompt();
//     });
// }

// async function addEmployee() {
//     const addName = await inquirer.prompt(askName());
//     db.query(`SELECT emprole.id, emprole.title FROM emprole ORDER by emprole.id;`, async (err, res) => {
//         if (err) throw err;
//         const {
//             role
//         } = await inquirer.prompt([{
//             name: 'role',
//             type: 'list',
//             choices: () => res.map(res => res.title),
//             message: 'What is the employee role?: '
//         }]);
//         let roleId;
//         for (const row of res) {
//             if (row.title === 'role') {
//                 roleId = row.id;
//                 continue;
//             }
//         }
//         db.query(`SELECT * FROM employee`, async (err, res) => {
//             if (err) throw err;
//             let choices = res.map(res => `${res.first_name} ${res.last_name}`);
//             choices.push('none');
//             let {
//                 manager
//             } = await inquirer.prompt([{
//                 name: 'manager',
//                 type: 'list',
//                 choices: choices,
//                 message: 'Choose the employees Manager: '
//             }]);
//             let managerId;
//             let managerName;
//             if (manager === 'none') {
//                 managerId = null;
//             } else {
//                 for (const data of res) {
//                     data.fullName = `${data.first_name} ${data.last_name}`;
//                     if (data.fullName === 'manager') {
//                         managerId = data.id;
//                         managerName = data.fullName;
//                         console.log(managerId);
//                         console.log(managerName);
//                         continue;
//                     }
//                 }
//             }
//             console.log('Employee has been added. Please refer to view all employees table to verify...');
//             db.query(
//                 'INSERT INTO employee SET ?', {
//                     first_name: addName.first,
//                     last_name: addName.last,
//                     role_id: roleId,
//                     manager_id: parseInt(managerId)
//                 },
//                 (err, res) => {
//                     if (err) throw err;
//                     prompt();
//                 }
//             );
//         });
//     });

// }

// function remove(input) {
//     const promptQ = {
//         yes: "yes",
//         no: "no (view all employees on the main table)"
//     };
//     inquirer.prompt([{
//         name: "action",
//         type: "list",
//         message: "In order to proceed, the employees ID number must be entered. Do you know the employees ID #?",
//         choices: [promptQ.yes, promptQ.no]
//     }]).then(answer => {
//         if (input === 'delete' && answer.action === "yes") removeEmployee();
//         else if (input === 'role' && answer.action === "yes") updateRole();
//         else viewAllEmployees();
//     });
// };

// async function removeEmployee() {
//     const answer = await inquirer.prompt([{
//         name: "first",
//         type: "input",
//         message: "Enter the employee ID number for the employee you wish to remove: "
//     }]);
//     db.query('DELETE FROM employee WHERE ?', {
//             id: answer.first
//         },
//         function (err) {
//             if (err) throw err;
//         }
//     )
//     console.log('Employee has been removed!');
// };

// function askId() {
//     return ([{
//         name: "name",
//         type: "input",
//         message: "What is the employees ID #? "
//     }]);
// }

// async function updateemprole() {
//     const employeeId = await inquirer.prompt(askId());
//     db.query('SELECT emprole.id, emprole.title FROM emprole ORDER BY emprole.id;', async (err, res) => {
//         if (err) throw err;
//         const {
//             role
//         } = await inquirer.prompt([{
//             name: 'role',
//             type: 'list',
//             choices: () => res.map(res => res.title),
//             message: 'What is the employees new role? '
//         }]);
//         let roleId;
//         for (const row of res) {
//             if (row.title === 'role') {
//                 roleId = row.id;
//                 continue;
//             }
//         }
//         db.query(`UPDATE employee
//         SET emprole_id = ${roleId}
//         WHERE employee.id = ${employeeId.name}`, async (err, res) => {
//             if (err) throw err;
//             console.log('Role has been updated')
//             prompt();
//         });
//     });
// }

// function askName() {
//     return ([{
//         name: "first",
//         type: "input",
//         message: "Enter the employees first name:"
//     }, {
//         name: "last",
//         type: "input",
//         message: "Enter the employees last name:"
//     }]);
// }