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

inquirer.prompt([
    {
        type: "list",
        name: "options",
        message: "What would you like to do?"
    }
])


// more middleware
app.use((req, res) => {
    res.status(404).end();
});
  
// confirms port when running
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});