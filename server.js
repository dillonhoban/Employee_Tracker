const inquirer = require('inquirer');
const util = require('util');
const mysql = require('mysql');
const consoleTable = require('console.table');
const {
    connect
} = require('http2');

// Establishing connection to the sever
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "T1a2c3o4!!",
    database: "employee_trackerDB"
});

connection.query = util.promisify(connection.query);

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    start();
});

// Function to prompt the start of the session and receive users choice
function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View all Employees", "Add Employee", "View all Roles", "Add Role", "View all Departments", "Add Department", "Update Role", "Quit"]
        })
        .then(answer => {
            switch (answer.action) {
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "View all Departments":
                    viewDepartments();
                    break;
                case "View all Roles":
                    viewRoles();
                    break;
                case "View all Employees":
                    viewEmployees();
                    break;
                case "Update Employee Role":
                    updateEmployee();
                    break;
                case "Quit":
                    console.log('Session ended, goodbye :)')
                    connection.end();
            };
        });
};

// Function to Add a new department
function addDepartment() {
    inquirer.prompt(
        [{
            name: 'department',
            type: 'input',
            message: 'What is the name of the department you would like to create?'
        }]
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?", {
                    department: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Congratulations, your" + answer.department + "was created!");
                    // re-prompt the user
                    start();
                }
            );
        })
    )
}
// Function to Add new role
function addRole() {

};
// Function to Add a new employee
function addEmployee() {

};
// Function to View the departments
function viewDepartments() {
    console.table(connection.query("SELECT name AS departments FROM departments"))
    console.log("-----------------------------------");
    start();
};
// Function to View all current roles in the company
function viewRoles() {

};
// Function to View all Employees
function viewEmployees() {

};
// Function to Update employee records
function updateEmployee() {

};