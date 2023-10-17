const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const idList = []
const teamMembers = []

const appMenu = () => {
    function buildTeam() {
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "which is your intern name?",

            },
            {
                type: "input",
                name: "internId",
                message: "which is your engineer ID?",
            },
            {
                type: "input",
                name: "internEmail",
                message: "which is your intern email?",
            },
            {
                type: "input",
                name: "internSchool",
                message: "which is your intern school?",
            },

        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
            teamMembers.push(intern);
            idList.push(answers.internId);
            //console.log(intern);
            createTeam();
        })
    }


    function addEngineer() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "which is your engineer name?",

            },
            {
                type: "input",
                name: "engineerId",
                message: "which is your engineer ID?",
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "which is your engineer email?",
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "which is your engineer Github?",
            },

        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
            teamMembers.push(engineer);
            idList.push(answers.engineerId);
            //console.log(engineer);
            createTeam();
        })
    }


    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "i don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            if (userChoice.memberChoice === "Engineer") {
                // add Engineer 
                addEngineer();
            } else if (userChoice.memberChoice === "Intern") {
                //add intern
                addIntern();
            } else {
                // build team function 
                buildTeam();
            }
        })
    }


    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "what is the team manager's name? ",
                validate: answers => {
                    if (answers !== "") {
                        return true
                    }
                    return "Please enter at least one Character."
                }
            },
            {
                type: "input",
                name: "managerId",
                message: "what is the team manager's ID",
            },
            {
                type: "input",
                name: "managerEmail",
                message: "what is the team manager's email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "what is the team manager's office number?"
            },

        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            //console.log(manager);
            teamMembers.push(manager);
            idList.push(answers.managerId);
            createTeam();

        })
    }

    createManager();
}
appMenu();