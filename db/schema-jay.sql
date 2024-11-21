DROP DATABASE IF EXISTS time_monitorDB;
 
CREATE DATABASE time_monitorDB;
 
USE time_monitorDB;
 
CREATE TABLE students (
  student_id varchar(255) NOT NULL,
  studentName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  position varchar(255) NOT NULL,
  supervisor varchar(255) NOT NULL,
  status varchar(255) NOT NULL DEFAULT 'Active',
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (studentName)
);
 
CREATE TABLE cnttimesheets (
  timesheet_id int NOT NULL AUTO_INCREMENT,
  studentName varchar(255) NOT NULL,
  date date NOT NULL,
  project_id varchar(255) NOT NULL DEFAULT 'Admin',
  category varchar(255) NOT NULL DEFAULT 'Daily Log',
  logNotes text NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (timesheet_id),
  FOREIGN KEY (project_id) REFERENCES project(project_id)
);
 
CREATE TABLE clockings (
  clock_id int NOT NULL AUTO_INCREMENT,
  student_id varchar(255) NOT NULL,
  date date NOT NULL,
  timeType enum('Time In','Time Out') NOT NULL,
  timeEntry time NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (clock_id)
  FOREIGN KEY (studentName) REFERENCES students(studentName)
);
 
CREATE TABLE faculty (
  faculty_id NOT NULL,
  facultyName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  dept varchar(255) NOT NULL,
  title varchar(255) NOT NULL,
  manager varchar(255) DEFAULT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (facultyName)
);
