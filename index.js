const connection = require('./config/connection');
const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
const {
    exit
} = require('process');

function startApp() {
    inquirer
        .prompt([{
            name: 'menuChoice',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "View By Department", "View All Roles", "View All Employees", "Add Department", "Add Role", "Add Employee", "Update Employee Role", "View By Manager", "Exit"
            ]
        }]).then(function (answer) {
            switch (answer.menuChoice) {
                case 'View By Department':
                    viewByDepartment();
                    break;
                case 'View All Roles':
                    viewAllRoles();
                    break;
                case 'View All Employees':
                    viewAllEmployees();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Role':
                    addARole();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateRole();
                case 'View By Manager':
                    viewByManager();
                    break;
                case 'Exit':
                    exit();
                    break;
            }
        })
}
startApp();
//     console.log(JSON.stringify(answer.menuChoice));
//     if (answer.menuChoice === "View All Employees") {
//         viewAllEmployees();
//     } else if (answer === "View By Department") {
//         viewByDepartment();
//     } else if (answer === "View By Manager") {
//         viewByManager();
//     } else if (answer === "Add Employee") {
//         addEmployee();
//     } else if (answer === "Remove Employee") {
//         removeEmployee();
//     } else if (answer === "Update Role") {
//         updateRole();
//     } else if (answer === "View All Roles") {
//         viewAllRoles();
//     } else if (answer === "Exit") {
//         exit();
//     }
// })
// }
// startApp();

// function viewAllEmployees() {
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

function viewAllEmployees() {
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, emprole.title, department.department_name AS department, emprole.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN employee AS manager on manager.id = employee.manager_id RIGHT JOIN emprole ON (emprole.id = employee.role_id) INNER JOIN department ON (department.id = emprole.department_id) ORDER BY employee.id;",
        function (err, result) {
            if (err) throw err;
            console.table(result);
            startApp();
        })
}

function viewByDepartment() {
    connection.query("SELECT department.department_name AS department, emprole.title, employee.id, employee.first_name, employee.last_name FROM employee LEFT JOIN emprole ON (emprole.id = employee.role_id) LEFT JOIN department ON (department.id = emprole.department_id) ORDER BY department.department_name;",
        function (err, result) {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW EMPLOYEE BY DEPARTMENT');
            console.log('\n');
            console.table(result);
            startApp();
        });
}

function viewByManager() {
    connection.query(`SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.department_name AS department, employee.id, employee.first_name, employee.last_name, emprole.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN emprole ON (emprole.id = employee.role_id)
    INNER JOIN department ON (department.id = emprole.department_id)
    ORDER BY manager;`,

        function (err, res) {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW EMPLOYEE BY MANAGER');
            console.log('\n');
            console.table(res);
            startApp();
        });
}

function viewAllRoles() {
    connection.query(`SELECT emprole.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN emprole ON (emprole.id = employee.role_id)
    LEFT JOIN department ON (department.id = emprole.department_id)
    ORDER BY emprole.title;`,
        function (err, res) {
            if (err) throw err;
            console.log('\n');
            console.log('VIEW EMPLOYEE BY ROLE');
            console.log('\n');
            console.table(res);
            startApp();
        });
}

async function addEmployee() {
    const addName = await inquirer.prompt(askName());
    connection.query(`SELECT emprole.id, emprole.title FROM emprole ORDER by emprole.id;`, async (err, res) => {
        if (err) throw err;
        const {
            role
        } = await inquirer.prompt([{
            name: 'role',
            type: 'list',
            choices: () => res.map(res => res.title),
            message: 'What is the employee role?: '
        }]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query(`SELECT * FROM employee`, async (err, res) => {
            if (err) throw err;
            let choices = res.map(res => `${res.first_name} ${res.last_name}`);
            choices.push('none');
            let {
                manager
            } = await inquirer.prompt([{
                name: 'manager',
                type: 'list',
                choices: choices,
                message: 'Choose the employees Manager: '
            }]);
            let managerId;
            let managerName;
            if (manager === 'none') {
                managerId = null;
            } else {
                for (const data of res) {
                    data.fullName = `${data.first_name} ${data.last_name}`;
                    if (data.fullName === manager) {
                        managerId = data.id;
                        managerName = data.fullName;
                        console.log(managerId);
                        console.log(managerName);
                        continue;
                    }
                }
            }
            console.log('Employee has been added. Please refer to view all employees table to verify...');
            connection.query(
                'INSERT INTO employee SET ?', {
                    first_name: addName.first,
                    last_name: addName.last,
                    role_id: roleId,
                    manager_id: managerId
                },
                (err, res) => {
                    if (err) throw err;
                    startApp();
                }
            );
        });
    });

}

async function addARole() {
    const addRole = await inquirer.prompt(askRole());
    connection.query(`SELECT emprole.id, emprole.title FROM emprole ORDER by emprole.id;`, async (err, res) => {
        if (err) throw err;
        const {
            role
        } = await inquirer.prompt([{
            name: 'department',
            type: 'list',
            choices: () => res.map(res => res.department_name),
            message: 'To what department does this role belong?: '
        }]);
        let deptId;
        for (const row of res) {
            if (row.title === deptId) {
                deptId = row.id;
                continue;
            }
        }
        console.log('Role has been added. Please refer to view all roles table to verify...');
        connection.query(
            'INSERT INTO emprole SET ?', {
                title: addRole.title,
                salary: addRole.salary,
                department_id: addRole.deptId
            },
            (err, res) => {
                if (err) throw err;
                startApp();
            }
        );
    });
}

async function addDepartment() {
    const addADept = await inquirer.prompt(askDept());
    connection.query(`SELECT department.id, department.department_name FROM department ORDER by department.id;`, async (err, res) => {
        if (err) throw err;
        // const {
        //     dept
        // } = await inquirer.prompt([{
        //     name: 'department',
        //     type: 'list',
        //     choices: () => res.map(res => res.department_name),
        //     message: 'What is the new department name?: '
        // }]);
        let deptId;
        for (const row of res) {
            if (row.title === deptId) {
                deptId = row.id;
                continue;
            }
        }
        console.log('Department has been added. Please refer to view all departments table to verify...');
        connection.query(
            'INSERT INTO department SET ?', {
                department_name: addADept.department_name,
            },
            (err, res) => {
                if (err) throw err;
                startApp();
            }
        );
    });
}

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

async function removeEmployee() {
    const answer = await inquirer.prompt([{
        name: "first",
        type: "input",
        message: "Enter the employee ID number for the employee you wish to remove: "
    }]);
    connection.query('DELETE FROM employee WHERE ?', {
            id: answer.first
        },
        function (err) {
            if (err) throw err;
        }
    )
    console.log('Employee has been removed!');
};

function askId() {
    return ([{
        name: "name",
        type: "input",
        message: "What is the employees ID #? "
    }]);
}

async function updateRole() {
    const employeeId = await inquirer.prompt(askId());
    connection.query('SELECT emprole.id, emprole.title FROM emprole ORDER BY emprole.id;', async (err, res) => {
        if (err) throw err;
        const {
            role
        } = await inquirer.prompt([{
            name: 'role',
            type: 'list',
            choices: () => res.map(res => res.title),
            message: 'What is the employees new role? '
        }]);
        let roleId;
        for (const row of res) {
            if (row.title === role) {
                roleId = row.id;
                continue;
            }
        }
        connection.query(`UPDATE employee
        SET role_id = ${roleId}
        WHERE employee.id = ${employeeId.name}`, async (err, res) => {
            if (err) throw err;
            console.log('Role has been updated')
            startApp();
        });
    });
}

function askName() {
    return ([{
        name: "first",
        type: "input",
        message: "Enter the employees first name:"
    }, {
        name: "last",
        type: "input",
        message: "Enter the employees last name:"
    }]);
}

function askRole() {
    return ([{
        name: "name",
        type: "input",
        message: "What is the role title?"
    }, {
        name: "salary",
        type: "input",
        message: "What is the annual salary for this role?"
    }, {
        name: "dept",
        type: "input",
        message: "To what department does this role belong?"
    }]);
}

function askDept() {
    return ([{
        name: "name",
        type: "input",
        message: "What is the department name?"
    }]);
}