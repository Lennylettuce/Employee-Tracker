const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'Moosebear1!@',
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
        const questions = await inquirer.prompt([
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
                    'Update employee role'
                ],
            }
        ]);
        choices(questions.options);
    } catch (err) {
        console.log(err);
    }
};

const choices = async (options) => {
    if (options === 'View all departments') {
        viewDepartment();
    }
    if (options === 'View all roles') {
        viewRoles();
    }
    if (options === 'View all employees') {
        viewEmployees();
    }
    if (options === 'Add department') {
        addDepartment();
    }
    if (options === 'Add a role') {
        addRoles();
    }
    if (options === 'Add employee') {
        addEmployee();
    }
    if (options === 'Update employee role') {
        updateEmployee();
    }
};

//View all departments

const viewDepartment = () => {
    const query = 'SELECT * FROM department';
    db.query(query, (err, department) => {
        if (err) throw err;
        console.table(department);
        start();
    });
};

//View all roles

const viewRoles = () => {
    const query = `SELECT * FROM role`;
    db.query(query, (err, role) => {
      if (err) throw err;
      console.table(role);
      start();
    });
};

//View all employees

const viewEmployees = () => {
    const query = `SELECT * FROM employees`;
    db.query(query, (err, employees) => {
      if (err) throw err;
      console.table(employees);
      start();
    });
};

// Add department

const addDepartment = async () => {
    try {
        const newDepartment = await inquirer.prompt([
            {
             name: 'name',
             type: 'input',
             message: 'Type in name of new department'
            }
        ]);
        db.query('INSERT INTO department(name) VALUES(?)', newDepartment.name);
        console.log('New department added!');
    } catch (err) {
        console.log(err);
        db.end();
    }
};

// Add a role

const addRoles = async () => {
    try {
        const { title, salary, department } = await inquirer.prompt([
            {
                name: 'title',
                type: 'input',
                message: 'Add title of new role',
            },
            {
                name: 'salary',
                type: 'number',
                message: 'Add salary for new role',
            },
            {
                name: 'department',
                type: 'list',
                message: 'What department does new role fit?',
                choices: [
                    {name: 'Engineering', value: 1 },
                    {name: 'Finance', value: 2 },
                    {name: 'Legal', value: 3 },
                    {name: 'Sales', value: 4 }
                ]
            },
        ]);
        const query = 'INSERT INTO role SET ?';
        db.query(query, { title, salary, department_id: department }, (err, title) => {
            console.log('New role added!');
            start();
        });
    } catch (err) {
        console.log(err);
        db.end();
    }
};

// Add employee

const addEmployee = async () => {
    try {
        const { first, last, role, manager } = await inquirer.prompt([
            {
                name: 'first',
                type: 'input',
                message: 'Add employee first name',
            },
            {
                name: 'last',
                type: 'input',
                message:'Add employee last name',
            },
            {
                name: 'role',
                type: 'list',
                message: 'Add employee role',
                choices: [
                    { name: 'Sales Lead', value: 1 },
                    { name: 'Salesperson', value: 2 },
                    { name: 'Lead Engineer', value: 3 },
                    { name: 'Software Engineer', value: 4 },
                    { name: 'Account Manager', value: 5 },
                    { name: 'Accountant', value: 6 },
                    { name: 'Legal Team Lead', value: 7 },
                    { name: 'Lawyer', value: 8 },
                ]
            },
            {
                name: 'manager',
                type: 'list',
                message: 'Add manger for employee',
                choices: [
                    { name: 'John Doe', value: 1 },
                    { name: 'Ashley Rodriguez', value: 3 },
                    { name: 'Kunal Singh', value: 5 },
                    { name: 'Sarah Lourd', value: 7 },
                    { name: 'none', value: null }
                ]
            }
        ]);
        const query = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)';
        db.query(query, [first, last, role, manager], (err, res) => {
            if (err) throw err;
            console.log('New employee added!');
            start();
        });
    } catch (err) {
        console.log(err);
        db.end();
    }
};

// AND update an employee role

const updateEmployee = async () => {
    db.query('SELECT last_name from employees', async (err, res) => {
        try {
            const { last_name } = await inquirer.prompt([
                {
                    name: 'last_name',
                    type: 'list',
                    message: 'Enter last name of employee you want to update',
                    choices: res.map(({ last_name }) => last_name),
                }
            ]);

            const { role_id } = await inquirer.prompt([
                {
                    name: 'role_id',
                    type: 'list',
                    message: 'Choose new role for employee',
                    choiecs: [
                        { name: 'Sales Lead', value: 1 },
                        { name: 'Salesperson', value: 2 },
                        { name: 'Lead Engineer', value: 3 },
                        { name: 'Software Engineer', value: 4 },
                        { name: 'Account Manager', value: 5 },
                        { name: 'Accountant', value: 6 },
                        { name: 'Legal Team Lead', value: 7 },
                        { name: 'Lawyer', value: 8 },
                    ]
                }
            ]);

            const query = 'UPDATE employees SET role_id =? WHERE last_name =?';
            db.query(query, [parseInt(role_id), last_name], (err, res) => {
                if (err) throw err;
                console.log('Updated employee!');
            })
        } catch (err) {
            console.log(err);
            db.end();
        }
    })
};

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

