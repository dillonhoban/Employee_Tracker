USE employee_trackerDB;

INSERT INTO departments(name)
VALUES 
('Managment'),
('Sales'),
('Accounting'),
('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES
('Manager', 47000.00, 1),
('Salesperson', 60000.000, 2),
('Accountant', 50000.00, 3),
('Human Resources Rep', 40000.00, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Micheal', 'Scott', 1, 1),
('Dwight', 'Schroot', 2, NULL),
('Angela', 'Martin', 3, NULL), 
('Toby', 'Flenderson', 4, NULL);
