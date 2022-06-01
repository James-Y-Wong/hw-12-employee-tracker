-- insert some starter data into department table
INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Finance"),
       ("Engineering"),
       ("Legal");


-- insert some starter data into role table
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 1),
       ("Sales Lead", 100000, 1),
       ("Staff Engineer", 120000, 3),
       ("Lead Engineer", 150000, 3),
       ("Account Manager", 140000, 2),
       ("Accountant", 110000, 2),
       ("Lawyer", 190000, 4),
       ("Legal Team Lead", 210000, 4);
    

-- insert some starter data into employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Chan", 1, 2),
       ("John", "Doe", 2, null),
       ("Ashley", "Rodriguez", 4, null),
       ("Kevin", "Tupik", 3, 3),
       ("Kunal", "Singh", 5, null),
       ("Malia", "Brown", 6, 5),
       ("Sarah", "Lourd", 8, null),
       ("Tom", "Allen", 7, 7);     