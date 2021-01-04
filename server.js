const inquirer = require('inquirer');
const util = require('util');
const mysql = require('mysql');
const cTable = require('console.table');
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
            choices: ["Add Department", "Add Role", "Add Employee", "View all Departments", "View all Roles", "View all Employees", "Update Employee Role", "Quit"]
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
    inquirer
        .prompt([{
            name: 'department',
            type: 'input',
            message: 'What is the name of the department you would like to create?'
        }])
        .then(function (answer) {
            connection.query("INSERT INTO departments SET ?", {
                    name: answer.department
                },
                function (err) {
                    if (err) throw err;
                    console.log("Congratulations, the " + answer.department + " department was created!");
                    // re-prompt the user
                    console.log("-----------------------------------");
                    start();
                }
            );
        })

};
// Function to Add new role
function addRole() {
    inquirer
        .prompt([{
                name: 'role',
                type: 'input',
                message: 'What is the new role you would like to add?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the starting salary for this position?'
            },
            {
                name: 'departmentID',
                type: 'input',
                message: 'Enter the Department ID for this position.'
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO roles SET ?", {
                    title: answer.role,
                    salary: answer.salary,
                    department_id: answer.departmentID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Congratulations, the " + answer.role + " role was created!");
                    // re-prompt the user
                    console.log("-----------------------------------");
                    start();
                }
            );
        })

};
// Function to Add a new employee
function addEmployee() {
    inquirer
        .prompt([{
                name: 'firstName',
                type: 'input',
                message: 'Congratulations on getting hired! What is your first name?'
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is your last name?'
            },
            {
                name: 'roleID',
                type: 'input',
                message: 'Please enter the Role ID for your position (Manager = 1, Salesperson = 2, Accountant = 3, Human Resources Rep = 4...)'
            },
            {
                name: 'managerID',
                type: 'input',
                message: "Please enter your Manager's ID Number (provided by manager)"
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO employee SET ?", {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Congratulations, the " + answer.role + " role was created!");
                    // re-prompt the user
                    console.log("-----------------------------------");
                    start();
                }
            );
        })


};
// Function to View the departments
function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].name);
        }
        //console.table(connection.query("SELECT name AS departments FROM departments"))
        console.log("-----------------------------------");
        start();
    })
};
// Function to View all current roles in the company
function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
        }
        //console.table(connection.query("SELECT name AS departments FROM departments"))
        console.log("-----------------------------------");
        start();
    })
};
// Function to View all Employees
function viewEmployees() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].first_name);
        }
        //console.table(connection.query("SELECT name AS departments FROM departments"))
        console.log("-----------------------------------");
        start();
    })
};
// Function to Update employee records
function updateEmployee() {

};