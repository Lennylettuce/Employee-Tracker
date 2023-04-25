INSERT INTO department (id, name)
VALUES  (001, "Engineering"),
        (002, "Finance"),
        (003, "Legal"),
        (004, "Sales");

INSERT INTO role (id, title, salary, department_id)
VALUES  (001, "Sales Lead", 100000, 1),
        (002, "Salesperson", 80000, 1),
        (003, "Lead Engineer", 150000, 2)
        (004, "Software Engineer", 120000, 2)
        (005, "Account Manager", 160000, 3),
        (006, "Accountant", 125000, 3),
        (007, "Legal Team Lead", 250000, 4),
        (008, "Lawyer", 190000, 4);

INSERT INTO employees (id, first_name, last_name, manager_id)
VALUES  ("John", "Doe", null),
        ("Mike", "Chan", "John Doe"),
        ("Ashley", "Rodriguez", null)
        ("Kevin", "Tupik", "Ashley Rodriguez"),
        ("Kunal", "Singh", null),
        ("Malia", "Brown", "Kunal Singh"),
        ("Sarah", "Lourd", null),
        ("Tom", "Allen", "Sarah Lourd");