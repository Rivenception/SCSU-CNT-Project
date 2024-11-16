var db = require("../../models");

// Import the model (employee.js) to use its database functions.
module.exports = function (app) {

  // Create Routes
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/admin", function (req, res) {
    res.render("admin");
  });

  app.get("/stu_admin", function (req, res) {
    res.render("stu_admin");
  });

  app.get("/dept", function (req, res) {
    res.render("dept");
  });

  app.get("/analysis", function (req, res) {
    res.render("analysis");
  });

  app.get("/dashboard", function (req, res) {
    res.render("dashboard");
  });

  app.get("/category", function (req, res) {
    res.render("category");
  });

  app.get("/stu", function (req, res) {
    res.render("stu");
  });

// SCSU Projects
  app.get("/stu/:user", function (req, res) {
    db.Student.findOne({
      where: {
        student_id: req.params.user
      }
    }).then(function (dbStudent) {
      console.log(dbStudent.student_id);
      console.log(dbStudent.studentName);
      res.render("stu", {
        cntUser: dbStudent.student_id,
        studentName: dbStudent.studentName,
        // dept: dbStudent.dept,
      });
    });
  });

  app.get("/cnt", function (req, res) {
    db.cntTimesheet.findAll({
    }).then(function (dbcntTimesheet) {
      res.render("cnt", {
        projectName: dbcntTimesheet.projectName,
        studentName: dbcntTimesheet.studentName,
      });
    });
  });
  
    app.get("/prj/:id", function (req, res) {
      db.cntTimesheet.findOne({
        include: [
          {
          model: db.Project,
          where: {
            project_id: req.params.id
        }}],
      }).then(function (dbcntTimesheet) {
        res.render("prj", {
          projectName: dbcntTimesheet.projectName,
          project_id: dbcntTimesheet.Project.project_id,
        });
      });
    });

// Department Pages

  app.get("/eng", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Engineering'
      }
    }).then(function (dbEmployee) {
      res.render("eng", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/mfg", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Manufacturing'
      }
    }).then(function (dbEmployee) {
      res.render("mfg", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/pm", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Program Management'
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.dept)
      res.render("pm", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/certs", function (req, res) {
    db.Employee.findOne({
      where: {
        dept: 'Certification'
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.dept)
      res.render("certs", {
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/rfb", function (req, res) {
    res.render("rfb", {
      user: dbEmployee.employee_id,
      employeeName: dbEmployee.name,
      dept: dbEmployee.dept,
    });
  });

  // User Specific Department Pages

  app.get("/eng/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("eng", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/certs/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("certs", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/mfg/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("eng", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/pm/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("eng", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/admin/:user", function (req, res) {
    db.Employee.findOne({
      where: {
        employee_id: req.params.user
      }
    }).then(function (dbEmployee) {
      console.log(dbEmployee.employee_id);
      res.render("admin", {
        user: dbEmployee.employee_id,
        employeeName: dbEmployee.name,
        dept: dbEmployee.dept,
      });
    });
  });

  app.get("/category/:category", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
        category: req.params.category
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("category", {
        category: dbTimesheet.category,
      });
    });
  });

  app.get("/update/:id", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
        id: req.params.id
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("update", {
        logId: dbTimesheet.id,
        user: dbTimesheet.employee_id,
        employeeName: dbTimesheet.name,
        dept: dbTimesheet.Employee.dept
      });
    });
  });

  app.get("/rfb/:rfb", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
        program: req.params.rfb
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("rfb", {
        program: dbTimesheet.program,
      });
    });
  });

  app.get("/rfb/ecr/:ecr", function (req, res) {
    db.Timesheet.findOne({
      include: [db.Employee],
      where: {
          ecr: req.params.ecr
      }
    }).then(function (dbTimesheet) {
      console.log(dbTimesheet.id);
      res.render("ecr", {
        program: dbTimesheet.program,
        ecr: dbTimesheet.ecr,
      });
    });
  });

};
