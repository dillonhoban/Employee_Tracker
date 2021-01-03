USE employee_trackerDB;

INSERT INTO departments(name)
VALUES 
('Managment'),
('Sales'),
('Accounting'),
('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES
('manager', 47000.00, 1),
('salesman', 60000.000, 2),
('accountent', 50000.00, 3),
('hr_rep', 40000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Micheal', 'Scott', 1, 1),
('Dwight', 'Schroot', 2, NULL),
('Angela', 'Martin', 3, NULL), 
('Toby', 'Flenderson', 4, NULL);

SELECT * FROM departments;