const mysql2 = require('mysql');
const inquirer = require('inquirer');
require('console.table');

const promptCommand = {
    viewAllEmployees: "View All Employees",
    viewByDepartment: "View By Department",
    viewByManager: "View By Manager",
    addEmployee: "Add Employee",
    deleteEmployee: "Delete Employee",
    updateRole: "Update Role",
    updateEmployeeManager: "Update Employee Manager",
    viewAllRoles: "View All Roles",
    exit: "Exit",
};

const db = mysql2.createConnection({
    host: 'localhost',
    port: 3000,
    user: 'root',
    password: 'Justfuckingwork1!',
    database: 'employees'
});

//connect to database
db.connect(err => {
    // if (err) throw err;
    console.log('Roster connected...')
    prompt();
});

function prompt() {
    inquirer.prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                promptCommand.viewAllEmployees,
                promptCommand.viewByDepartment,
                promptCommand.viewByManager,
                promptCommand.viewAllRoles,
                promptCommand.addEmployee,
                promptCommand.removeEmployee,
                promptCommand.updateRole,
                promptCommand.exit
            ]
        })
        .then(answer => {
            console.log('answer', answer);
            switch (answer.action) {
                case promptCommand.viewAllEmployees:
                    viewAllEmployees();
                    break;
                case promptCommand.viewByDepartment:
                    viewByDepartment();
                    break;
                case promptCommand.viewByManager:
                    viewByManager();
                    break;
                case promptCommand.addEmployee:
                    addEmployee();
                    break;
                case promptCommand.removeEmployee:
                    removeEmployee();
                    break;
                case promptCommand.updateRole:
                    updateRole();
                    break;
                case promptCommand.viewAllRoles:
                    viewAllRoles();
                    break;
                case promptCommand.exit:
                    exit();
                    break;
            }
        });
}

function viewAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW ALL EMPLOYEES');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

function viewByDepartment() {
    const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY department.name;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY DEPARTMENT');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

function viewByManager() {
    const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY manager;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY MANAGER');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

function viewAllRoles() {
    const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
    FROM employee
    LEFT JOIN role ON (role.id = employee.role_id)
    LEFT JOIN department ON (department.id = role.department_id)
    ORDER BY role.title;`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('VIEW EMPLOYEE BY ROLE');
        console.log('\n');
        console.table(res);
        prompt();
    });
}

async function addEmployee() {
    const addName = await inquirer.prompt(askName());
    connection.query(`SELECT role.id, role.title FROM role ORDER by role.id;`, async (err, res) => {
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
                    manager_id: parseInt(managerId)
                },
                (err, res) => {
                    if (err) throw err;
                    prompt();
                }
            );
        });
    });

}

function remove(input) {
    const promptQ = {
        yes: "yes",
        no: "no (view all employees on the main table)"
    };
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "In order to proceed, the employees ID number must be entered. Do you know the employees ID #?",
        choices: [promptQ.yes, promptQ.no]
    }]).then(answer => {
        if (input === 'delete' && answer.action === "yes") removeEmployee();
        else if (input === 'role' && answer.action === "yes") updateRole();
        else viewAllEmployees();
    });
};

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
    connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
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
            prompt();
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