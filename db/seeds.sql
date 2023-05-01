INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 100000, 1),
        ("Salesperson", 80000, 1),
        ("Lead Engineer", 150000, 2),
        ("Software Engineer", 120000, 2),
        ("Account Manager", 160000, 3),
        ("Accountant", 125000, 3),
        ("Legal Team Lead", 250000, 4),
        ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, manager_id)
VALUES  ("John", "Doe", null),
        ("Mike", "Chan", "John Doe"),
        ("Ashley", "Rodriguez", null),
        ("Kevin", "Tupik", "Ashley Rodriguez"),
        ("Kunal", "Singh", null),
        ("Malia", "Brown", "Kunal Singh"),
        ("Sarah", "Lourd", null),
        ("Tom", "Allen", "Sarah Lourd");