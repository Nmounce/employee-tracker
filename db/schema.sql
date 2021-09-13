DROP DATABASE IF EXISTS roster_db;

CREATE DATABASE roster_db;

USE roster_db;

CREATE TABLE department (
    dept_id INT NOT NULL PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    role_id INT NOT NULL PRIMARY KEY,
    role_title VARCHAR(30) NOT NULL,
    role_salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES department(dept_id) ON DELETE
    SET
        NULL
);

CREATE TABLE employee (
    emp_id INT NOT NULL AUTO_INCRIMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES department(role_id) 
    SET
        NULL
);