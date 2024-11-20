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
 
  -- ^ jay
 
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
 
  -- ^ jay
 
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
 
  -- ^ jay
 
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

  -- ^ jay
 
CREATE TABLE project (
  project_id NOT NULL AUTO_INCREMENT,
  projectName varchar(255) NOT NULL,
  projectSponsor varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (projectName)
  FOREIGN KEY (affiliateID) REFERENCES affiliate(affiliateID)
);
 
  -- ^ josh
 
CREATE TABLE affiliateContact (
  person_id NOT NULL,
  personName varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (personName)
  FOREIGN KEY (projectName) REFERENCES project(projectName)
  FOREIGN KEY (affiliateID) REFERENCES affiliate(affiliateID)
);
 
-- ^ josh
 
CREATE TABLE affiliate (
  affiliate_id NOT NULL AUTO_INCREMENT,
  personName varchar(255) NOT NULL,
  projectAffiliation varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (affiliateName)
  FOREIGN KEY (projectSponsor) REFERENCES project(projectSponsor)
  );
 
-- ^ josh
 
CREATE TABLE transactions (
  transaction_id NOT NULL AUTO_INCREMENT,
  personName varchar(255) NOT NULL,
  projectAffiliation varchar(255) NOT NULL,
  lastPayment datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  nextPayment datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  paymentStatus DECIMAL(10, 2) NOT NULL,
  paymentAmount DECIMAL (10,2) NOT NULL,
  PRIMARY KEY (transaction_id)
  FOREIGN KEY (affiliateName) REFERENCES affiliate(affiliateName) ON DELETE CASCADE
);
 
  -- ^ josh

-- Revised Tables Section: Rick  **double check on delete relations**

CREATE TABLE affiliate (
    affiliateName VARCHAR(255) NOT NULL PRIMARY KEY,
    projectAffiliation VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE projectAffiliate (
    affiliateName VARCHAR(255) NOT NULL,
    projectSponsor VARCHAR(255) NOT NULL,
    PRIMARY KEY (affiliateName, projectSponsor),
    FOREIGN KEY (affiliateName) REFERENCES Affiliate(affiliateName) ON DELETE CASCADE,
    FOREIGN KEY (projectSponsor) REFERENCES Project(projectSponsor) ON DELETE CASCADE
);

CREATE TABLE transactions (
  transaction_id INT AUTO_INCREMENT,
  affiliateName varchar(255) NOT NULL,
  projectAffiliation varchar(255) NOT NULL, -- this might need to be a FK.
  paymentStatus varchar(255) NOT NULL,
  paymentAmount DECIMAL (10,2) NOT NULL,
  lastPayment datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  nextPayment datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (affiliateName) REFERENCES affiliate(affiliateName) ON DELETE CASCADE
);

CREATE TABLE affiliateContact (
  person_id NOT NULL,
  personName varchar(255), -- remove the NOT NULL because a contact could just be "billing@example.com" for the address with no one specific.
  affiliateName varchar(255),
  email varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (personName),
  FOREIGN KEY (affiliateName) REFERENCES affiliate(affiliateName) ON DELETE CASCADE
);

CREATE TABLE project (
  project_id INT AUTO_INCREMENT,
  projectName varchar(255) NOT NULL,
  projectSponsor varchar(255), -- can be NULL. not all projects have sponsors
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (projectName),
  FOREIGN KEY (projectSponsor) REFERENCES affiliate(affiliateName) -- no on delete here since a sponsor can stop funding a project at any time
);

CREATE TABLE Task (
    task_id INT NOT NULL PRIMARY KEY,
    projectName VARCHAR(255) NOT NULL,
    task VARCHAR(255) NOT NULL,
    taskNotes VARCHAR(255),
    assignedTo VARCHAR(255) NOT NULL,
    priority VARCHAR(255) NOT NULL,
    requestor VARCHAR(255) NOT NULL,
    dueDate DATETIME NOT NULL,
    status VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (projectName) REFERENCES Project(projectName) ON DELETE CASCADE
);

CREATE TABLE cntTimesheet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    studentName VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    projectName VARCHAR(255) NOT NULL DEFAULT 'Admin',
    category VARCHAR(255) NOT NULL DEFAULT 'Daily Log',
    logNotes TEXT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (studentName) REFERENCES Student(studentName) ON DELETE CASCADE,
    FOREIGN KEY (projectName) REFERENCES Project(projectName) ON DELETE CASCADE
);

CREATE TABLE Clocking (
    clock_id INT AUTO_INCREMENT PRIMARY KEY,
    studentName VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    timeType ENUM('Time In', 'Time Out') NOT NULL,
    timeEntry TIME NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (studentName) REFERENCES Student(studentName) ON DELETE CASCADE
);

CREATE TABLE Student (
    student_id VARCHAR(255) NOT NULL UNIQUE,
    studentName VARCHAR(255) NOT NULL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    supervisor VARCHAR(255),
    status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Faculty (
    facultyName VARCHAR(255) NOT NULL PRIMARY KEY,
    faculty_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dept VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    manager VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);