const express = require('express');
const mysql = require('mysql2');

const PORT = process.envv.PORT | 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'employeetracker_db'
    },
    console.log('connected!')
);

db.connect(async (err) => {
    if (err) throw err;
    console.log('Employee Tracker connected');
    start();
});

const start = async () => {
    try {
        const userQuestions = await inquirer.prompt([
            {
                name: 'options',
                type: 'list',
                message: 'Pick an action:',
                choices: [
                    'View all departments',
                    'View all roles',
                    'View all employees',
                    'Add department',
                    'Add a role',
                    'Add employee',
                    'Update employee role',
                    'Exit?'
                ],
            }
        ]);
        selections(userQuestions.options);
    } catch (err) {
        console.log(err);
    }
};


//View all departments

//View all roles

//View all employees

// Add department

// Add a role

// Add employee

// AND update an employee role



// CHECK OFF TASKS WHEN DONE

//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids (_)

//WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role (_)

//WHEN I choose to view all employees
//THEN I am presented with a formatted table showing employee data, 
//including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to (_)

//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database (_)

//WHEN I choose to add a role
//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database (_)

//WHEN I choose to add an employee
//THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database (_)

//WHEN I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database (_)

