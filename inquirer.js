const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const departmentFunctions = require('./lib/dept-table');
const empFunctions = require('./lib/emp-table');
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
const addDept = [{
    name: 'addDeptName',
    type: 'input',
    message: 'What is the name of the department?',
}];

//add role
const addRole = [{
    name: 'addRoleName',
    type: 'input',
    message: 'What is the role title?',
}, {
    name: 'addRoleSalary',
    type: 'input',
    message: 'What is the annual salary for this role?'
}, {
    name: 'addRoleDept',
    type: 'input',
    message: 'What department does this role belong to?',
    choices: ['Customer Service', 'Engineering', 'Finance', 'Legal', 'Sales']
}];

//add employee
const addEmp = [{
    name: 'addFirstName',
    type: 'input',
    message: 'What is the employees first name?'
}, {
    name: 'addLastName',
    type: 'input',
    message: 'What is the employees last name?'
}, {
    name: 'addEmpRole',
    type: 'list',
    message: 'What is the employees role?',
    choices: ['Accountant', 'Account Manager', 'Lawyer', 'Lead Engineer', 'Legal Team Lead', 'Salesperson', 'Software Engineer']
}, {
    name: 'addManager',
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
                departmentFunctions.getDept(response)
            }
            if (response.view === 'View All Roles') {
                roleFunctions.getRole();
            }
            if (response.view === 'View All Employees') {
                empFunctions.getEmp();
            }
        });
}

function showAdd() {
    inquirer.prompt(selectAdd)
        .then(response => {
            if (response.selectAdd === 'Add a Department') {
                departmentFunctions.addDept(),
                inquirer.prompt(addDept);
            }
            if (response.add === 'Add a Role') {
                roleFunctions.addRole();
                inquirer.prompt(addRole);
            }
            if (response.add === 'Add an Employee') {
                empFunctions.addEmp();
                inquirer.prompt(addEmp);
            }
        });
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