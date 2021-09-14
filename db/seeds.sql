use ROSTER_db;

INSERT INTO
    department (dept_id, dept_name)
VALUES
    (001, 'Sales'),
    (002, 'Engineering'),
    (003, 'Finance'),
    (004, 'Legal'),
    (005, 'Customer Service');

INSERT INTO
    emprole (role_id, role_title, role_salary)
VALUES
    (100, 'Salesperson', 80000),
    (200, 'Lead Engineer', 150000),
    (300, 'Software Engineer', 120000),
    (400, 'Account Manager', 160000),
    (500, 'Accountant', 125000),
    (600, 'Legal Team Lead', 250000),
    (700, 'Lawyer', 190000);

INSERT INTO
    employee (
        emp_id,
        first_name,
        last_name,
        role_id,
        manager_id
    )
VALUES
    ('', 'Mike', 'Chan', '100', ''),
    ('', 'Ashley', 'Rodriguez', '200', ''),
    ('', 'Kevin', 'Tupik', '300', ''),
    ('', 'Kunal', 'Singh', '400', ''),
    ('', 'Malia', 'Brown', '500', ''),
    ('', 'Sarah', 'Lourd', '600', ''),
    ('', 'Tom', 'Allen', '700', ''),