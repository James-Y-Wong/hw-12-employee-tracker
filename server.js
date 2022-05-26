// requiring dependencies
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');
const figlet = require('figlet');

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
    console.log(figlet.textSync("Employee Tracker")),
    console.log(`\nConnected to the staff_db database.`),
    console.log('\n---------------')
);


function init() {
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
    db.query('SELECT employee.id AS "ID", first_name AS "First Name", last_name AS "Last Name", title AS "Title", department_name AS "Department", salary AS "Salary", manager_id AS "Manager" FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
        if (err) {
            throw (err);
        } else {
            console.log("\n-----------------");
            console.table("\n", results, "\n---------------");
            init();
        }
    });
};



function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            message: "First name?",
            name: "firstName",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
        {
            type: "input",
            message: "Last name?",
            name: "lastName",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
        {
            type: "input",
            message: "Role ID?",
            name: "roleID",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
        {
            type: "input",
            message: "Manager ID?",
            name: "managerID",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
    ])
    .then((data) => {
        const firstName = data.firstName;
        const lastName = data.lastName;
        const roleID = data.roleID;
        const managerID = data.managerID;
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleID}", "${managerID}")`, function (err, results) {
            if (err) {
                throw (err);
            } else console.log("A new employee has been added successfully!");
        });
        db.query('SELECT employee.id AS "ID", first_name AS "First Name", last_name AS "Last Name", title AS "Title", department_name AS "Department", salary AS "Salary", manager_id AS "Manager" FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
            if (err) {
                throw (err);
            } else {
                console.log("\n-----------------");
                console.table("\n", results, "\n---------------");
                init();
            }
        });
    });
};

function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: "input",
            message: "Employee ID?",
            name: "employeeID",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
        {
            type: "input",
            message: "New Role ID?",
            name: "roleID",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
    ])
    .then((data) => {
        const employeeID = data.employeeID;
        const roleID = data.roleID;
        db.query(`INSERT INTO employee(employee.id, role_id) VALUES ("${employeeID}", "${roleID}")`, function (err, results) {
            if (err) {
                throw (err);
            } else console.log("A new role for selected employee has been added successfully!");
        });
        db.query('SELECT employee.id AS "ID", first_name AS "First Name", last_name AS "Last Name", title AS "Title", department_name AS "Department", salary AS "Salary", manager_id AS "Manager" FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
            if (err) {
                throw (err);
            } else {
                console.log("\n-----------------");
                console.table("\n", results, "\n---------------");
                init();
            }
        });
    });
};

function viewRole() {
    db.query('SELECT role.id AS "ID", title AS "Title", department_name AS "Department", salary AS "Salary" FROM role JOIN department ON role.department_id = department.id', function (err, results) {
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
    inquirer.prompt([
        {
            type: "input",
            message: "Role Name?",
            name: "roleName",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
        {
            type: "input",
            message: "Salary?",
            name: "salary",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
        {
            type: "input",
            message: "Department ID?",
            name: "department",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
    ])
    .then((data) => {
        const roleName = data.roleName;
        const salary = data.salary;
        const department = data.department;
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${roleName}", "${salary}", "${department}")`, function (err, results) {
            if (err) {
                throw (err);
            } else console.log("A new role has been added successfully!");
        });
        db.query('SELECT role.id AS "ID", title AS "Title", department_name AS "Department", salary AS "Salary" FROM role JOIN department ON role.department_id = department.id', function (err, results) {
            if (err) {
                throw (err);
            } else {
                console.log("\n-----------------");
                console.table("\n", results, "\n---------------");
                init();
            }
        });
    });
};

function viewDepartment() {
    db.query('SELECT department.id AS "ID", department_name AS "Department" FROM department', function (err, results) {
        if (err) {
            throw (err);
        } else {
            console.log("\n-----------------");
            console.table("\n", results, "\n---------------");
            init();
        }
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            message: "Department Name?",
            name: "departmentName",
            validate: (data) => {
                if (data !== "") {
                    return true;
                }
                return "Please enter at least one character";
            },
        },
    ])
    .then ((data) => {
        const departmentName = data.departmentName;
        db.query(`INSERT INTO department(department_name) VALUES ("${departmentName}");`, function (err, results) {
            if (err) {
                throw (err);
            } else {
                console.log("A new department has been added successfully!");
            }
        });
        db.query('SELECT department.id AS "ID", department_name AS "Department" FROM department', function (err, results) {
            if (err) {
                throw (err);
            } else {
                console.log("\n-----------------");
                console.table("\n", results, "\n---------------");
                init();
            }
        });
    });
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