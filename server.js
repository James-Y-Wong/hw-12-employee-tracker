// requiring dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// declaring additional variable, PORT which designates 3001/local host, as well as enviroment variable for deployment
const PORT = process.env.PORT || 3001;
// create express instance
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'staff_db'
    },
    console.log(`Connected to the staff_db database.`)
);


function init() {
    console.log("\nEmployee Tracker");
    console.log('\n---------------');
    inquirer.prompt([
        {
            type: "list",
            name: "options",
            message: "What would you like to do?",
            choices: [
                "View All Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View All Departments",
                "Add Department",
                "Quit",
            ],
        },
    ])
    .then((data) => {
        switch (data.options) {
            case "View All Employees":
                viewEmployee();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "View All Roles":
                viewRole();
                break;
            case "Add Role":
                addRole();
                break;
            case "View All Departments":
                viewDepartment();
                break;
            case "Add Department":
                addDepartment();
                break;
            default:
                quit();
        }
    })
};

function viewEmployee() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};

function viewRole() {
    db.query('SELECT id, title FROM role', function (err, results) {
        if (err) {
            throw (err);
        } else {
            console.log("\n-----------------");
            console.table("\n", results, "\n---------------");
            init();
        }
    });
};

function addRole() {

};

function viewDepartment() {

};

function addDepartment() {

};

function quit() {
    console.log("Goodbye!");
    process.exit();
};


// more middleware
app.use((req, res) => {
    res.status(404).end();
});
  
// confirms port when running
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

init();