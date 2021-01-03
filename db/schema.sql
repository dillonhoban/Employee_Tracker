-- Drop DB if exists --
DROP DATABASE IF EXISTS employee_trackerDB;

-- Creates and uses employee_trackerDB --
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

-- Createing the department table -- 
CREATE TABLE departments (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- Creating the role table --
CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
	PRIMARY KEY (id)
);

-- Creating the employee table -- 
CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
	PRIMARY KEY (id)
);