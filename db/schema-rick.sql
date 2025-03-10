DROP DATABASE time_monitorDB_test;

CREATE DATABASE time_monitorDB_test;

USE time_monitorDB_test;

CREATE TABLE affiliate (
    id INT AUTO_INCREMENT PRIMARY KEY,
    affiliateName VARCHAR(255) NOT NULL PRIMARY KEY,
    projectAffiliation VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE transaction (
  transaction_id INT AUTO_INCREMENT,
  affiliateName varchar(255) NOT NULL,
  projectAffiliation varchar(255) NOT NULL, -- this might need to be a FK.
  paymentStatus varchar(255) DEFAULT 'Pending',
  paymentAmount DECIMAL (10,2),
  lastPayment date,
  nextPayment date,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (transaction_id),
  FOREIGN KEY (affiliateName) REFERENCES affiliate(affiliateName) ON DELETE NO ACTION
);

CREATE TABLE affiliateContact (
  person_id INT AUTO_INCREMENT UNIQUE NOT NULL,
  personName varchar(255), -- remove the NOT NULL because a contact could just be "billing@example.com" for the address with no one specific.
  affiliateName varchar(255),
  email varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (personName),
  FOREIGN KEY (affiliateName) REFERENCES affiliate(affiliateName) ON DELETE CASCADE
);

CREATE TABLE project (
  project_id INT AUTO_INCREMENT UNIQUE,
  projectName varchar(255) NOT NULL UNIQUE,
  projectSponsor varchar(255), -- can be NULL. not all projects have sponsors
  status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (project_id),
  FOREIGN KEY (projectSponsor) REFERENCES affiliate(affiliateName) ON DELETE SET NULL -- on delete remove the sponsor and set to NULL
);

CREATE TABLE projectAffiliate (
    affiliateName VARCHAR(255) NOT NULL,
    projectSponsor VARCHAR(255) NOT NULL,
    PRIMARY KEY (affiliateName, projectSponsor),
    FOREIGN KEY (affiliateName) REFERENCES Affiliate(affiliateName),
    FOREIGN KEY (projectSponsor) REFERENCES Project(projectSponsor)
);

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id VARCHAR(255) NOT NULL UNIQUE,
    studentName VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    supervisor VARCHAR(255),
    status ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE faculty (
    id INT AUTO_INCREMENT PRIMARY KEY,
    facultyName VARCHAR(255) NOT NULL UNIQUE,
    faculty_id VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    dept VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    manager VARCHAR(255),
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE task (
    task_id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
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
    FOREIGN KEY (projectName) REFERENCES Project(projectName) ON DELETE NO ACTION,
    FOREIGN KEY (assignedTo) REFERENCES Student(studentName) ON DELETE NO ACTION
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

CREATE TABLE clocking (
    clock_id INT AUTO_INCREMENT PRIMARY KEY,
    studentName VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    timeType ENUM('Time In', 'Time Out') NOT NULL,
    timeEntry TIME NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (studentName) REFERENCES Student(studentName) ON DELETE CASCADE
);
