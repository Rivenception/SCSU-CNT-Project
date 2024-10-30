DROP DATABASE IF EXISTS time_monitorDB;

CREATE DATABASE time_monitorDB;

USE time_monitorDB;

CREATE TABLE students (
  id NOT NULL AUTO_INCREMENT,
  student_id VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  status VARCHAR(45) DEFAULT 'ACTIVE' NOT NULL,
  PRIMARY KEY (student_id)
  );

  CREATE TABLE cntTimesheets (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  date DATE NOT NULL,
  project VARCHAR(45) NULL,
  weeklyGoal VARCHAR(200) NULL,
  dailyProg VARCHAR(200) NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (name) REFERENCES students(name)
);

  CREATE TABLE clocking (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  timeIn DATETIME DEFAULT NULL,
  timeOut DATETIME DEFAULT NULL,
  PRIMARY KEY (id)
  FOREIGN KEY (name) REFERENCES students(name)
);

CREATE TABLE employees (
  id NOT NULL AUTO_INCREMENT,
  employee_id VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  dept VARCHAR(45) DEFAULT '' NOT NULL,
  title VARCHAR(45) DEFAULT '' NOT NULL,
  salary INT,
  company VARCHAR(2) NOT NULL,
  status VARCHAR(45) DEFAULT 'ACTIVE' NOT NULL,
  PRIMARY KEY (employee_id)
  );

CREATE TABLE timesheets (
  id INT NOT NULL AUTO_INCREMENT,
  employee_id VARCHAR(45) NOT NULL,
  name VARCHAR(45) NOT NULL,
  date DATE NOT NULL,
  category VARCHAR(45) NULL,
  task VARCHAR(45) NULL,
  timeSpent INT NULL,
  program INT NOT NULL,
  ecr INT NOT NULL,
  notes VARCHAR(200) NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);

SELECT * FROM timesheets INNER JOIN employees ON timesheets.employee_id = employees.employee_id;

SELECT * FROM timesheets INNER JOIN employees ON timesheets.employee_id = employees.employee_id ORDER BY date DESC;
SELECT * FROM timesheets INNER JOIN employees ON timesheets.employee_id = employees.employee_id ORDER BY name;
