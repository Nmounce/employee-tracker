const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const departmentFunctions = require('./lib/dept-table')
// const schema = require('./db/schema');
//create connection



//Blank array to be filled with pushed constructors classes
const rosterArray = [];

//Intro question that starts the app
const mainQuestion = {
    name: 'intro',
    type: 'list',
    message: 'What would you like to do?',
    choices: ['View', 'Add', 'Update', 'Delete']
};

const selectView = {
    name: 'view',
    type: 'list',
    message: 'What would you like to view?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees', 'View Employees by Manager ID', 'View Employees by Department', 'View Department Salaries']
};

//SELECTIONS
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
    message: `What is the name of the department?`,
}];

//add role
const addRole = [{
    name: 'addRoleName',
    type: 'input',
    message: 'What is the role title?'
}, {
    name: 'addRoleSalary',
    type: 'input',
    message: 'What is the annual salary for this role?'
}, {
    name: 'addRoleDept',
    type: 'input',
    message: 'What department does this role belong to?'
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
    type: 'input',
    message: 'What is the employees role?',
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
            selectAdd();
        }
        if (appStart.intro === 'Update') {
            selectUpdate();
        } else if (appStart.intro === 'Delete') {
            selectDelete();
        };
    });
}

function showView() {
    inquirer.prompt(selectView)
        .then(response => {
            if (response.view === 'View All Departments') {
                departmentFunctions.getDept();
            }
    })

    // if (mainQues.selectView === 'View All Roles') {
    //     return $ {
    //         schema.emprole
    //     };
    // }
    // if (mainQues.selectView === 'View All Employees') {
    //     return $ {
    //         schema.employee
    //     };
    // } if (mainQues.selectView === 'View Employees by Manager ID') {
    //     return $ {
    //         schema.employee.manager_id
    //     };
    // } if (mainQues.selectView === 'View Employees by Department') {
    //     return $ {
    //         schema.employee
    //     }
    // } if (mainQues.selectView === 'View Department Salaries') {
    //     return $ {
    //         schema.employee
    //     }
    // else {
    //     return null
    // }
};
// //func to call manager info and build team
// function managerInfo() {
//     inquirer.prompt(managerQ).then((buildManager) => {
//         let manager = new Manager(buildManager.managerName, buildManager.managerId, buildManager.managerEmail, buildManager.managerOffice);
//         teamMemberArray.push(manager);
//         addAnother();
//     });
// }

// //func to add another TM
// function addAnother() {
//     inquirer.prompt(addAnotherTM).then((addTo) => {
//         //yes adds another tm to array and recalls addTMLoop func.
//         if (addTo.add === true) {
//             addTMLoop();
//         }
//         if (addTo.add === false) {
//             //no renders file and closes app
//             renderHTML(teamMemberArray);
//         }
//     });
// }

// //func to choose type of TM
// function addTMLoop() {
//     inquirer.prompt(addAnotherTMRole).then((TMRole) => {
//         if (TMRole.role === 'Engineer') {
//             log.yellow('Enter the Engineers Information');
//             inquirer.prompt(engineerQ).then((buildEngineer) => {
//                 let engineer = new Engineer(buildEngineer.engineerName, buildEngineer.engineerId, buildEngineer.engineerEmail, buildEngineer.engineerGithub)
//                 teamMemberArray.push(engineer);
//                 addAnother();
//             });
//         } else if (TMRole.role === 'Intern') {
//             log.blue('Enter the Interns Information');
//             inquirer.prompt(internQ).then((buildIntern) => {
//                 let intern = new Intern(buildIntern.internName, buildIntern.internId, buildIntern.internEmail, buildIntern.internSchool)
//                 teamMemberArray.push(intern);
//                 addAnother();
//             });
//         }
//     });
// }

// //func to write array info to HTML when all tm's have been enetered
// function renderHTML(file) {
//     console.log('hello');
//     const htmlDoc = render(file);
//     fs.writeFile(outputPath, htmlDoc,
//         function () {
//             log.green(`Team Profile Completed`);
//         });
// }

// //call start application
// introQues();

mainQues();