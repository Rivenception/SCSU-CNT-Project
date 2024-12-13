-- CNT-Timesheet-Routes

-- blueprint code --
SELECT *
FROM cntTimesheets
ORDER BY cntTimesheets.id DESC;

-- blueprint code --
SELECT * 
FROM cntTimesheets AS t
JOIN Students AS s ON t.studentName = s.studentName
JOIN Projects AS p ON t.projectName = p.projectName
WHERE s.student_id = :user
ORDER BY t.id DESC;

-- Example -- 
SELECT * 
FROM cntTimesheets AS t
JOIN Students AS s ON t.studentName = s.studentName
JOIN Projects AS p ON t.projectName = p.projectName
WHERE s.student_id = "rmingione"
ORDER BY t.id DESC;


-- blueprint code --
SELECT * 
FROM cntTimesheets AS t
JOIN Students AS s ON t.studentName = s.studentName
WHERE t.id = :id

-- Example --

SELECT * 
FROM cntTimesheets AS t
JOIN Students AS s ON t.studentName = s.studentName
WHERE t.id = 1

-- blueprint code --

SELECT cntTimesheets.*, Students.*, Projects.*
FROM cntTimesheets
JOIN Students ON cntTimesheets.studentName = Students.studentName
JOIN Projects ON cntTimesheets.projectName = Projects.projectName
ORDER BY cntTimesheets.id DESC
LIMIT 50;

-- blueprint code -- 

SELECT cntTimesheet.*, Student.*, Project.*
FROM cntTimesheet
JOIN Student ON cntTimesheet.student_id = Student.id
JOIN Project ON cntTimesheet.project_id = Project.id
WHERE Project.project_id = :id
ORDER BY cntTimesheet.date DESC, cntTimesheet.id DESC
LIMIT 50;

-- blueprint code -- 

SELECT * 
FROM cntTimesheets AS t
JOIN Students AS s ON t.studentName = s.studentName
JOIN Projects AS p ON t.ProjectName = p.projectName
WHERE p.projectName = :projectName
ORDER BY t.date DESC, t.id DESC
LIMIT 50;

-- Example -- 

SELECT * 
FROM cntTimesheets AS t
JOIN Students AS s ON t.studentName = s.studentName
JOIN Projects AS p ON t.ProjectName = p.projectName
WHERE p.projectName = 'Admin'
ORDER BY t.date DESC, t.id DESC
LIMIT 50;

-- blueprint code -- 

SELECT cntTimesheets.*, Students.*
FROM cntTimesheets
JOIN Students ON cntTimesheets.studentName = students.StudentName
WHERE Students.StudentName = :user
ORDER BY cntTimesheets.id DESC
LIMIT 50;

-- blueprint code: --
INSERT INTO cntTimesheet (id, studentName, date, projectName, category, logNotes)
VALUES (:id, :studentName, :date, :projectName, :category, :logNotes);


-- Example: --
INSERT INTO cntTimesheets (id, studentName, date, projectName, category, logNotes)
VALUES (81, "Joshua Dublin", '2024-11-15', "Batteries & Chips", "Meeting Minutes", "Wrote MySQL statements");

-- blueprint code--
DELETE FROM cntTimesheets
WHERE id = :id; 

-- Example: --
DELETE FROM cntTimesheets
WHERE id = 10; 


-- blueprint code--
UPDATE cntTimesheets
SET id = :id,
    studentName = :studentName,
    date = :date,
    projectName = :projectName,
    category = :category,
    logNotes = :logNotes,
    WHERE id = :id; 

-- Example: --

UPDATE cntTimesheets
SET id = 80,
    studentName = "Joshua Dublin",
    date = '2024-11-23',
    projectName = "Admin",
    category = "Meeting Minutes",
    logNotes = "Worked on SQL with Josh and Jay"
WHERE id = 80; 

-- Dropdown-Routes:

-- blueprint code--
SELECT projectName
FROM Project
ORDER BY projectName ASC;

-- blueprint code--
SELECT category
FROM cntTimesheet
ORDER BY category ASC;


-- Project-Routes: 

-- blueprint code--
SELECT *
FROM Projects
ORDER BY projectName ASC;



-- Student Routes --


-- blueprint code--
SELECT *
FROM Students
ORDER BY status ASC, studentName ASC;

-- Example: --


-- blueprint code--
SELECT *
FROM Students
WHERE studentName = :user
ORDER BY status ASC, studentName ASC;

-- Example: --

-- blueprint code--

SELECT Students.*, cntTimesheets.*
FROM Students
LEFT JOIN cntTimesheets ON Students.studentName = cntTimesheets.studentName
WHERE Students.studentName = :studentName;

-- Example: --

SELECT Students.*, cntTimesheets.*
FROM Students
LEFT JOIN cntTimesheets ON Students.studentName = cntTimesheets.studentName
WHERE Students.studentName = "Tessa Masi";

-- blueprint code--

INSERT INTO Students (student_id, studentName, email, position, supervisor, status)
VALUES (:student_id, :studentName, :email, :position, :supervisor, :status);

-- Example: --

INSERT INTO Students (student_id, studentName, email, position, supervisor, status)
VALUES ("jdublin", "Joshua Dublin", "dublinj1@southernct.edu", "Worker", "Peter Dimoulas", "Active");

-- blueprint code--

UPDATE Students
SET student_id = :student_id, position = :position, supervisor = :supervisor
WHERE student_id = :student_id;


-- Example: --

UPDATE Students
SET student_id = "jdublin10", position = "Assistant", supervisor = "Peter Dimoulas"
WHERE student_id = "jdublin";



-- Task-Routes:


-- blueprint code--

SELECT *
FROM Tasks
ORDER BY task_id ASC;


-- blueprint code--

SELECT Tasks.*, Projects.*, Students.*
FROM Tasks
JOIN Projects ON Tasks.projectName = Projects.projectName
JOIN Students ON Tasks.assignedTo = Students.studentName
WHERE Students.studentName = :studentName 
ORDER BY Tasks.task_id ASC;

-- Example: --

SELECT Tasks.*, Projects.*, Students.*
FROM Tasks
JOIN Projects ON Tasks.projectName = Projects.projectName
JOIN Students ON Tasks.assignedTo = Students.studentName
WHERE Students.studentName = "Rick Mingione" 
ORDER BY Tasks.task_id ASC;

-- blueprint code--

SELECT Tasks.*, Students.*, Projects.*
FROM Tasks
JOIN Students ON Tasks.assignedTo = Students.studentName
JOIN Projects ON Tasks.projectName = Projects.ProjectName
ORDER BY Tasks.priority ASC, Tasks.dueDate ASC;


-- blueprint code-- 

SELECT Tasks.*, Students.*, Projects.*
FROM Tasks
JOIN Students ON Tasks.assignedTo = Students.studentName
JOIN Projects ON Tasks.projectName = Projects.ProjectName
WHERE Projects.projectName = "Admin"
ORDER BY Tasks.task_id ASC;



-- blueprint code--

INSERT INTO cntTimesheets(id, studentName, date, projectName, category, logNotes, createdAt, updatedAt)
Values (:id, :studentName, :date, :projectName, :category, :logNotes, :createdAt, :updatedAt)

-- Example: --

INSERT INTO cntTimesheets(id, studentName, date, projectName, category, logNotes, createdAt, updatedAt)
VALUES (80, "Joshua Dublin", '2024-11-23', "Admin", "Daily Log", "Worked on SQL", '2024-11-23 16:20:10', '2024-11-23 16:20:10');

-- blueprint code--

DELETE FROM cntTimesheets
WHERE id = :id;

-- Example: --

DELETE FROM cntTimesheets
WHERE id = 80;

-- blueprint code--

UPDATE cntTimesheets 
SET id = :id, studentName = :studentName, date = :date, projectName = :projectName, category = :category, logNotes = :logNotes, createdAt = :createdAt, updatedAt = :updatedAt
WHERE id = 80;

-- Example: --

UPDATE cntTimesheets 
SET id = 80, studentName = "Joshua Dublin", date = "2024-11-23", projectName = "Admin", category = "Daily Log", logNotes = "Worked on SQL with Ian", createdAt = '2024-11-22 16:20:10', updatedAt = '2024-11-22 16:20:10'
WHERE id = 80;


-- HTML routes --

-- blueprint code--

SELECT student_id, studentName
FROM Student
WHERE student_id = :student_id;

-- Example: --

SELECT student_id, studentName
FROM Students
WHERE student_id = "jturpin";

-- blueprint code--

SELECT projectName, status
FROM Projects;


-- blueprint code--

SELECT Projects.projectName, cntTimesheets.id
FROM cntTimesheets
JOIN Projects ON cntTimesheets.id = Projects.project_id
WHERE Projects.project_id = :project_id;

-- Example: --

SELECT Projects.projectName, cntTimesheets.id
FROM cntTimesheets
JOIN Projects ON cntTimesheets.id = Projects.project_id
WHERE Projects.project_id = 5;


-- blueprint code-- 

SELECT task_id, status
FROM Tasks;



-- blueprint code--

SELECT Tasks.task_id, Tasks.status, Projects.projectName, Projects.project_id
FROM Tasks
JOIN Projects ON Tasks.task_id = Projects.project_id
WHERE Projects.project_id = :project_id;

-- Example: --

SELECT Tasks.task_id, Tasks.status, Projects.projectName, Projects.project_id
FROM Tasks
JOIN Projects ON Tasks.task_id = Projects.project_id
WHERE Projects.project_id = 2;

-- blueprint code--

SELECT Tasks.task_id, Tasks.status, Projects.projectName, Projects.project_id
FROM Tasks
JOIN Projects ON Tasks.task_id = Projects.project_id
WHERE Projects.project_id = :project_id;

-- Example: --

SELECT Tasks.task_id, Tasks.status, Projects.projectName, Projects.project_id
FROM Tasks
JOIN Projects ON Tasks.task_id = Projects.project_id
WHERE Projects.project_id = 2;


-- blueprint code --

SELECT Tasks.task_id, Tasks.status, Students.studentName, Students.student_id
FROM Tasks
JOIN Students ON Tasks.task_id = Students.student_id
WHERE Students.student_id = :student_id;



-- blueprint code --

SELECT category
FROM cntTimesheets
WHERE category = :category;


-- Example -- 

SELECT category
FROM cntTimesheets
WHERE category = "Daily Log";



-- Login-routes: --

-- blueprint code --

INSERT INTO users (username, password) VALUES 
(:username, :password);

-- Example -- 


INSERT INTO users (username, password) VALUES 
('testuser', '<hashed_password>');

-- Clocking routes --

-- blueprint code: -- 


SELECT c.*, s.* 
FROM Clockings c
INNER JOIN Students s ON c.studentName = s.studentName
ORDER BY c.date ASC;

-- blueprint code: --

SELECT Clockings.*, Students.*
FROM Clockings
LEFT JOIN Students ON Clockings.studentName = Students.studentName
WHERE Clockings.studentName = :studentName;
ORDER BY Clockings.date DESC;

-- Example: -- 

SELECT Clockings.*, Students.*
FROM Clockings
LEFT JOIN Students ON Clockings.studentName = Students.studentName
WHERE Students.studentName = "Tessa Masi";
ORDER BY Clockings.date DESC;

-- blueprint code: --

INSERT INTO Clockings (clock_id, date, timeType, timeEntry, studentName)
VALUES (:clock_id, :date, :timeType, :timeEntry, :studentName);

-- Example:


INSERT INTO Clockings (clock_id, date, timeType, timeEntry, studentName)
VALUES (49, '2024-11-20', 'Time In', '15:46:00', 'Tessa Masi');


-- blueprint code: --

DELETE FROM Clockings
WHERE clock_id = :clock_id;

-- Example: --

DELETE FROM Clockings
WHERE clock_id = 17;

-- blueprint code: --

UPDATE Clockings
SET clock_id = :clock_id, date = :date, timeType = :timeType, timeEntry = :timeEntry, studentName = :studentName,
WHERE clock_id = :clock_id;


-- Example --


UPDATE Clockings
SET clock_id = 2, date = '2024-11-21', timeType = 'Time In', timeEntry = '15:57:00', studentName = 'Rick Mingione'
WHERE clock_id = 2;