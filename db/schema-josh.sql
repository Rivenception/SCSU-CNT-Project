DROP DATABASE IF EXISTS time_monitorDB;
 
CREATE DATABASE time_monitorDB;
 
USE time_monitorDB;
 
CREATE TABLE project (
  project_id NOT NULL AUTO_INCREMENT,
  projectName varchar(255) NOT NULL,
  projectSponsor varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (projectName)
  FOREIGN KEY (affiliateID) REFERENCES affiliate(affiliateID)
);
 
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
 
CREATE TABLE affiliate (
  affiliate_id NOT NULL AUTO_INCREMENT,
  personName varchar(255) NOT NULL,
  projectAffiliation varchar(255) NOT NULL,
  createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (affiliateName)
  FOREIGN KEY (projectSponsor) REFERENCES project(projectSponsor)
  );
 
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