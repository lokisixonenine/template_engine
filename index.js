const Manager = require("./Develop/lib/Manager");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const inquirer = require("inquirer");
const path = require("path");

let teamArray = [];

function addEmployee() {
    inquirer.prompt([{
        type: "list",
        name: "type",
        message: "What employee would you like to add?",
        choices: [
            "Manager",
            "Engineer",
            "Employee",
            "Intern",
        ]

    }]).then(function (answer) {
        if (answer.type === "Engineer") {
            createEngineer();
        } else if (answer.type === "Intern") {
            createIntern();
        } else if (answer.type === "Manager") {
            createManager();
        } else if (answer.type === "Employee") {
            createEmployee();
        } else {
            render(teamArray);
        }

    })
};

const questions = [{
        type: "input",
        message: "What is your team manager's name?",
        name: "managerName"
    },
    {
        type: "input",
        message: "What is your manager's ID number?",
        name: "managerId"
    },
    {
        type: "input",
        message: "What is your manager's email address?",
        name: "managerEmail"
    },
    {
        type: "number",
        message: "What is this person's office number?",
        name: "managerOffice"
    }
];

const generalQuestions = [{
        type: "input",
        message: "What is this employee's name?",
        name: "employeeName"
    },
    {
        type: "input",
        message: "What is the employee's ID number?",
        name: "employeeId"
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "employeeEmail"
    },
    {
        type: "list",
        message: "What is the type of employee?",
        name: "employeeType",
        choices: ["Intern", "Engineer"]
    }
];

const managerQuesion = [{
    type: "number",
    message: "What is this employee's office phone number?",
    name: "managerOffice"
}];
const engineerQuestion = [{
    type: "input",
    message: "What is this engineer's github username?",
    name: "engineerGithub"
}];
const internQuestion = [{
    type: "input",
    message: "What school did/does this intern attend?",
    name: "internSchool"
}];

const continueQuestion = [{
    type: "confirm",
    message: "Do you want to add another employee?",
    name: "continue"
}]

function continuePrompt() {
    inquirer
        .prompt({
            type: "confirm",
            message: "Do you want to add another employee?",
            name: "continue"
        })
        .then((results) => {
            if (results.continue) {
                addEmployee()
            } else {
                console.log(addEmployee)
                let html = render(addEmployee)
            }
        })
};

function addEmployee() {
    inquirer.prompt(generalQuestions)
        .then(answers => {
            if (answers.employeeType === "Intern") {
                inquirer.prompt(internQ)
                    .then(oneAnswer => {
                        const intern = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, oneAnswer.internSchool);
                        addEmployee.push(intern);
                        continuePrompt();
                    })
            } else {
                inquirer.prompt(engineerQ)
                    .then(oneAnswer => {
                        const engineer = new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, oneAnswer.engineerGithub);
                        addEmployee.push(engineer);
                        continuePrompt();
                    })
            }
        })
}

function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOffice);
            addEmployee.push(manager);
            continuePrompt();
        });
}
init();
