DROP DATABASE IF EXISTS roster_db;

CREATE DATABASE roster_db;

USE roster_db;

CREATE TABLE department (
    dept_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE emprole (
    dept_id INT NOT NULL,
    role_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (dept_id) REFERENCES department(dept_id)
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES emprole(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);