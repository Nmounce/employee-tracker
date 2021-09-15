use roster_db;

INSERT INTO
    department (dept_id, dept_name)
VALUES
    (001, 'Sales'),
    (002, 'Engineering'),
    (003, 'Finance'),
    (004, 'Legal'),
    (005, 'Customer Service');

INSERT INTO
    emprole (dept_id, role_title, role_salary)
VALUES
    (001, 'Salesperson', 80000),
    (002, 'Lead Engineer', 150000),
    (002, 'Software Engineer', 120000),
    (003, 'Account Manager', 160000),
    (003, 'Accountant', 125000),
    (004, 'Legal Team Lead', 250000),
    (004, 'Lawyer', 190000);

INSERT INTO
    employee (first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES
    ('Mike', 'Chan', 1, null),
    ('Ashley', 'Rodriguez', 1, null),
    ('Kevin', 'Tupik', 2, null),
    ('Kunal', 'Singh', 2, null),
    ('Malia', 'Brown', 3, null),
    ('Sarah', 'Lourd', 3, null),
    ('Tom', 'Allen', 4, null);