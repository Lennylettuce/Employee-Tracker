DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR (30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR (30),
    salary DECIMAL(10,2),
    department_id INT NOT NULL,
    PRIMARY KEY (id), 
    FOREIGN KEY (department_id) 
    REFERENCES department(id) 
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);