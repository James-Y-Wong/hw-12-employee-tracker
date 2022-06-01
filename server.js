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

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// connecting to mysql database
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

// initial function that prompts user on what they want to do
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
    // for each user selected option, will run corresponding function
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

// function to view all employees
function viewEmployee() {
    db.query('SELECT employee.id AS "ID", first_name AS "First Name", last_name AS "Last Name", title AS "Title", department_name AS "Department", salary AS "Salary", manager_id AS "Manager" FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id', function (err, results) {
        if (err) {
            throw (err);
        } else {
            console.log("\n-----------------");
            // prints table in command-line
            console.table("\n", results, "\n---------------");
            init();
        }
    });
};


// function to add employee
function addEmployee() {
    // prompts user for input
    inquirer.prompt([
        {
            type: "input",
            message: "First name?",
            name: "firstName",
            // validates that there is data
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
            // validates that there is data
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
            // validates that there is data
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
            // validates that there is data
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
        // inserts user inputed data into database using template literals
        db.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${roleID}", "${managerID}")`, function (err, results) {
            if (err) {
                throw (err);
            } else console.log("A new employee has been added successfully!");
        });
        // prints table after entering data into table
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


// function to update employee role
function updateEmployeeRole() {
    // prompts for user input
    inquirer.prompt([
        {
            type: "input",
            message: "Employee ID?",
            name: "employeeID",
            // validates that there is data
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
            // validates that there is data
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
        // inserts user input data into table using template literals
        db.query(`INSERT INTO employee(employee.id, role_id) VALUES ("${employeeID}", "${roleID}")`, function (err, results) {
            if (err) {
                throw (err);
            } else console.log("A new role for selected employee has been added successfully!");
        });
        // prints table to command-line
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

// function to view all roles
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

// function to add roles
function addRole() {
    // prompts user input
    inquirer.prompt([
        {
            type: "input",
            message: "Role Name?",
            name: "roleName",
            // validates that there is data
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
            // validates that there is data
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
            // validates that there is data
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
        // inserts user input data in to database using template literals
        db.query(`INSERT INTO role(title, salary, department_id) VALUES ("${roleName}", "${salary}", "${department}")`, function (err, results) {
            if (err) {
                throw (err);
            } else console.log("A new role has been added successfully!");
        });
        // prints table after user input in commmand-line
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

// function to print all departments in command-line
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

// function to add department
function addDepartment() {
    // prompts for user input data
    inquirer.prompt([
        {
            type: "input",
            message: "Department Name?",
            name: "departmentName",
            // validates that there is data
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
        // inserts user input data into database using template literals
        db.query(`INSERT INTO department(department_name) VALUES ("${departmentName}");`, function (err, results) {
            if (err) {
                throw (err);
            } else {
                console.log("A new department has been added successfully!");
            }
        });
        // prints table after user input data is added to table
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

// function to end server connection when selecting quit
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

// triggers initial function
init();