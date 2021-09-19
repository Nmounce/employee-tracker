const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const departmentFunctions = require('./lib/dept-table');
const employeeFunctions = require('./lib/emp-table');
const roleFunctions = require('./lib/role-table');

//Blank array to be filled with pushed constructors classes
const rosterArray = [];

//Intro question that starts the app
const mainQuestion = {
    name: 'intro',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View', 'Add', 'Update', 'Delete']
};

//SELECTIONS
const selectView = {
    name: 'view',
    type: 'list',
    message: 'What would you like to view?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Manager ID', 'View Employees by Department', 'View Department Salaries']
};

const selectAdd = {
    name: 'add',
    type: 'list',
    message: 'What would you like to add?',
    choices: ['Add a Department', 'Add a Role', 'Add an Employee']
};


const selectUpdate = {
    name: 'update',
    type: 'list',
    message: 'What would you like to update?',
    choices: ['Update an Employee Role', 'Update Manager']
};

const selectDelete = {
    name: 'delete',
    type: 'list',
    message: 'What would you like to delete?',
    choices: ['Delete Department', 'Delete Role', 'Delete Employee']
};


//ADDS
//add department
const addDept = {
    name: 'dept_name',
    type: 'input',
    message: 'What is the name of the department?',
};

//add role
function addRole(deptList) {
    return [{
        name: 'role_title',
        type: 'input',
        message: 'What is the role title?',
    }, {
        name: 'role_salary',
        type: 'input',
        message: 'What is the annual salary for this role?'
    }, {
        name: 'dept_id',
        type: 'list',
        message: 'What department does this role belong to?',
        choices: deptList
    }]
};

//add employee
const addEmp = [{
    name: 'first_name',
    type: 'input',
    message: 'What is the employees first name?'
}, {
    name: 'last_name',
    type: 'input',
    message: 'What is the employees last name?'
}, {
    name: 'role_id',
    type: 'list',
    message: 'What is the employees role?',
    choices: ['Accountant', 'Account Manager', 'Lawyer', 'Lead Engineer', 'Legal Team Lead', 'Salesperson', 'Software Engineer']
}, {
    name: 'manager_id',
    type: 'input',
    message: 'Who is the employees manager?'
}];


//func that renders all input

function mainQues() {
    inquirer.prompt(mainQuestion).then((appStart) => {
        if (appStart.intro === 'View') {
            showView();
        }
        if (appStart.intro === 'Add') {
            showAdd();
        }
        if (appStart.intro === 'Update') {
            showUpdate();
        } else if (appStart.intro === 'Delete') {
            showDelete();
        };
    });
}

//departments
function showView() {
    inquirer.prompt(selectView)
        .then(response => {
            if (response.view === 'View All Departments') {
                departmentFunctions.getDept();
            }
            if (response.view === 'View All Roles') {
                roleFunctions.getRole();
            }
            if (response.view === 'View All Employees') {
                employeeFunctions.getEmp();
            };
        });
}

function showAdd() {
    inquirer.prompt(selectAdd)
        .then(response => {
            if (response.add === 'Add a Department') {
                departmentFunctions.getDept()
                    .then(deptInfo => {
                        inquirer.prompt()
                            .then(response => {
                                departmentFunctions.addDept(response);
                            })
                    });
            }
            if (response.add === 'Add a Role') {
                //get a list of all departments in the database
                departmentFunctions.getDept()
                    .then(deptInfo => {
                        //ask the user for new role info, send in our dept list 
                        inquirer.prompt()
                            .then(response => {
                                //query to add role to database
                                roleFunctions.addRole(response);
                            })
                    });
            }
            if (response.add === 'Add an Employee') {
                employeeFunctions.addEmp()
                    .then(empInfo => {
                        inquirer.prompt(addEmp(empInfo))
                            .then(response => {
                                employeeFunctions.addEmp(response);
                            })
                    });
            }
        })
}

function showUpdate() {
    inquirer.prompt(selectUpdate)
        .then(response => {
            if (response.update === 'Update an Employee Role') {
                employeeFunctions.updateEmp();
            }
            if (response.update === 'Update Manager') {
                employeeFunctions.updateMgr();
            }
        });
}

function showDelete() {
    inquirer.prompt(selectDelete)
        .then(response => {
            if (response.delete === 'Delete Department') {
                departmentFunctions.deleteDept();
            }
            if (response.delete === 'Delete Role') {
                roleFunctions.deleteRole();
            }
            if (response.delete === 'Delete Employee') {
                employeeFunctions.deleteEmployee();
            }
        });
}



mainQues();