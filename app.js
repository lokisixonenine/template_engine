const Employee = require("./Develop/lib/Employee");
const Engineer = require("./Develop/lib/Engineer");
const Intern = require("./Develop/lib/Intern");
const Manager = require("./Develop/lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");


const questions = [{
        type: "input",
        name: "name",
        message: "What is the Manager's name?"
    },
    {
        type: "input",
        message: "What the Managers's employee id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is the Manager's email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is the Manager's office phone number?",
        name: "officePhoneNumber",
    },
    {
        type: "checkbox",
        message: "What type of team member would you like to add?",
        name: "member",
        choices: ["engineer", "intern"]
    }
];

const addEmployee = [{
        type: "input",
        name: "name",
        message: "What is the employee's name?"
    },
    {
        type: "input",
        message: "What is the employee's employee id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is the employee's email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is this employee's title?",
        name: "role",
    }
];


const addEngineer = [{
        type: "input",
        name: "name",
        message: "What is the engineer's name?"
    },
    {
        type: "input",
        message: "What is the engineer's employee id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is the engineer's email address?",
        name: "email",
    },
    {
        type: "input",
        message: "What is the engineer's github username?",
        name: "github",
    }
];

const addIntern = [{
        type: "input",
        name: "name",
        message: "What is the intern's name?"
    },
    {
        type: "input",
        message: "What is the intern's employee id?",
        name: "id",
    },
    {
        type: "input",
        message: "What is the intern's email?",
        name: "email",
    },
    {
        type: "input",
        message: "What school does the intern attend/What school did the intern attend?",
        name: "school",
    }
];

const addMoreMembers = [{
    type: "checkbox",
    message: "Add more members?",
    name: "choice",
    choices: ["true", "false"]
}]

const employeeType = [{
    type: "checkbox",
    message: "What type of team member would you like to add?",
    name: "member1",
    choices: ["engineer", "intern"]
}]

inquirer
    .prompt(questions)
    .then(function (user) {

        const templateMainFile = fs.readFileSync(`./Develop/templates/main.html`, {
            encoding: 'utf8'
        });

        const manager = new Manager(user.name, user.id, user.email, user.officePhoneNumber);

        let team = renderHTML(manager);
        let proceed = true;

        AddDontAdd(proceed, user.member[0], team, templateMainFile);
    })
    .catch(err => console.log(err));

function renderHTML(position) {
    const templateFile = fs.readFileSync(`./Develop/templates/${position.getRole().toLowerCase()}.html`, {
        encoding: 'utf8'
    });
    let temporaryFile = templateFile.replace('{{ name }}', position.name);
    temporaryFile = temporaryFile.replace('{{ role }}', position.getRole());
    temporaryFile = temporaryFile.replace('{{ id }}', position.id);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);
    temporaryFile = temporaryFile.replace('{{ email }}', position.email);

    if (position.getRole().toLowerCase() === "engineer") {
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
        temporaryFile = temporaryFile.replace('{{ github }}', position.github);
    } else if (position.getRole().toLowerCase() === "intern") {
        temporaryFile = temporaryFile.replace('{{ school }}', position.school);
    } else if (position.getRole().toLowerCase() === "manager") {
        temporaryFile = temporaryFile.replace('{{ officePhoneNumber }}', position.officePhoneNumber);
    }

    return temporaryFile;
}

async function AddDontAdd(proceed, activeEmployee, team, templateMainFile) {
    try {
        do {
            switch (activeEmployee) {

                case "engineer":
                    const engineer = await inquirer.prompt(addEngineer);
                    console.log(engineer);

                    let engineer1 = new Engineer(engineer.name, engineer.id, engineer.email, engineer.github);
                    let engineer1card = renderHTML(engineer1);
                    team = team + engineer1card
                    console.log(team);
                    let nextMember = await inquirer.prompt(addMoreMembers);
                    console.log(nextMember);

                    if (nextMember.choice[0] === "false") {
                        proceed = false;
                        console.log(proceed, "Adding member");
                        let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
                        fs.writeFileSync("index.html", temporaryMainFile);
                    } else if (nextMember.choice[0] === "true"); {
                        const newMember = await inquirer.prompt(employeeType);
                        activeEmployee = newMember.member1[0];
                    }
                    break;

                case "intern":
                    const intern = await inquirer.prompt(addIntern);
                    let intern1 = new Intern(intern.name, intern.id, intern.email, intern.school);
                    let intern1Card = renderHTML(intern1);
                    team = team + intern1Card
                    console.log(team);
                    let nextMember1 = await inquirer.prompt(addMoreMembers);

                    if (nextMember1.choice[0] === "false") {
                        proceed = false;
                        let temporaryMainFile = templateMainFile.replace('{{ team }}', team);
                        fs.writeFileSync("index.html", temporaryMainFile);
                    } else if (nextMember1.choice[0] === "true") {
                        const newMember1 = await inquirer.prompt(employeeType);
                        activeEmployee = newMember1.member1[0];
                    }
                    break;

            }
        } while (proceed)


    } catch (err) {
        console.log(err);
    }
}