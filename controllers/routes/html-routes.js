// If trying to debug de-comment the below.
// delete require.cache[require.resolve("../../models")];
const db = require("../../models");
// console.log("DB Object:", db);

// Import the model (employee.js) to use its database functions.
module.exports = function (app) {

  // Create Routes
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/api", function (req, res) {
    res.render("api");
  });

  app.get("/stu_admin", function (req, res) {
    res.render("stu_admin");
  });

  app.get("/dept", function (req, res) {
    res.render("dept");
  });

  app.get("/category", function (req, res) {
    res.render("category");
  });

  app.get("/stu", function (req, res) {
    res.render("stu");
  });

  app.get("/task", function (req, res) {
    res.render("task");
  });

  app.get("/clocking", function (req, res) {
    res.render("clocking");
  });

// Admin Pages
  app.get("/admin/stu", function (req, res) {
    res.render("admin_student");
  });

  app.get("/admin/fac", function (req, res) {
    res.render("admin_faculty");
  });

  app.get("/admin/contacts", function (req, res) {
    res.render("admin_contact");
  });

  app.get("/admin/prj", function (req, res) {
    res.render("admin_project");
  });

  app.get("/admin/sponsor", function (req, res) {
    res.render("admin_sponsor");
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

  app.get("/prj", function (req, res) {
    db.Project.findAll({
    }).then(function (dbProject) {
      res.render("prj", {
        projectName: dbProject.projectName,
        status: dbProject.status,
      });
    });
  });
  
    // app.get("/prj/:id", function (req, res) {
    //   db.cntTimesheet.findOne({
    //     include: [
    //       {
    //       model: db.Project,
    //       where: {
    //         project_id: req.params.id
    //     }}],
    //   }).then(function (dbcntTimesheet) {
    //     res.render("prj", {
    //       projectName: dbcntTimesheet.projectName,
    //       project_id: dbcntTimesheet.Project.project_id,
    //     });
    //   });
    // });

    app.get("/prj/:name", function (req, res) {
      const name = decodeURIComponent(req.params.name);
      db.cntTimesheet.findOne({
        where: {
          projectName: name
        },
        include: [
          {
          model: db.Project,
          }],
      }).then(function (dbcntTimesheet) {
        res.render("prj", {
          projectName: dbcntTimesheet.projectName,
          project_id: dbcntTimesheet.Project.project_id,
        });
      });
    });

// SCSU Task Routes
    app.get("/task", function (req, res) {
      db.Task.findAll({
      }).then(function (dbTask) {
        res.render("task", {
          project_id: dbTask.task_id,
          status: dbTask.status,
        });
      });
    });

    app.get("/task/prj", function (req, res) {
      db.Task.findOne({
        include: [
          {
          model: db.Project,
          where: {
            project_id: req.params.id
        }}],
      }).then(function (dbTask) {
        res.render("task", {
          projectName: dbTask.projectName,
          project_id: dbTask.Project.project_id,
        });
      });
    });

    app.get("/task/prj/:name", function (req, res) {
      db.Task.findOne({
        include: [
          {
          model: db.Project,
          where: {
            projectName: req.params.name
        }}],
      }).then(function (dbTask) {
        res.render("task", {
          projectName: dbTask.projectName,
          project_id: dbTask.Project.project_id,
        });
      });
    });

    app.get("/task/stu/:id", function (req, res) {
      db.Task.findOne({
        include: [
          {
          model: db.Student,
          where: {
            student_id: req.params.id
        }}],
      }).then(function (dbTask) {
        res.render("task", {
          studentName: dbTask.assignedTo,
          student_id: dbTask.Student.student_id,
        });
      });
    });

    app.get("/task/status/:status", function (req, res) {
      const status = decodeURIComponent(req.params.status);
      db.Task.findOne({
        include: [db.Student],
        include: [db.Project],
        where: {
          status: status
        }   
      }).then(function (dbTask) {
        res.render("task", {
          status: dbTask.status,
        });
      });
    });

  // SCSU Category
  app.get("/stu/cat/:category", function (req, res) {
    console.log("This is executing");
    const category = decodeURIComponent(req.params.category);
    console.log("This is the category" + category);
    db.cntTimesheet.findOne({
      where: {
        category: category
      }   
    }).then(function (dbcntTimesheet) {
      res.render("category", {
        // cntUser: dbcntTimesheet.student_id,
        // studentName: dbcntTimesheet.studentName,
        category: dbcntTimesheet.category,
      });
    });
  });

  // SCSU Clocking
  app.get("/clocking/stu/:user", function (req, res) {
    db.Clocking.findOne({
      include: [
        {
        model: db.Student,
        where: {
          student_id: req.params.user
      }}],
    }).then(function (dbClocking) {
      console.log(dbClocking.Student.student_id);
      console.log(dbClocking.studentName);
      res.render("clocking", {
        cntUser: dbClocking.Student.student_id,
        studentName: dbClocking.studentName,
        logId: dbClocking.clock_id,
        // dept: dbStudent.dept,
      });
    });
  });

  // Update Routes
  app.get("/stu/:user/update/:id", function (req, res) {
    db.cntTimesheet.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
        model: db.Student,
        where: {
          student_id: req.params.user
        }}],
    }).then(function (dbcntTimesheet) {
      console.log(dbcntTimesheet.studentName);
      res.render("stu", {
        cntUser: dbcntTimesheet.Student.student_id,
        studentName: dbcntTimesheet.studentName,
        logId: dbcntTimesheet.id,
        update: "true",
        // dept: dbStudent.dept,
      });
    });
  });

  // app.get("/stu/:user/update/:id", function (req, res) {
  //   db.cntTimesheet.findOne({
  //     where: {
  //       id: req.params.id
  //     },
  //     include: [
  //       {
  //       model: db.Student,
  //       where: {
  //         student_id: req.params.user
  //       }
  //     }],
  //   }).then(function (dbStudent) {
  //     res.json(dbStudent);
  //   });
  // });

  app.get("/clocking/stu/:user/update/:id", function (req, res) {
    db.Clocking.findOne({
      where: {
        clock_id: req.params.id
      },
      include: [
        {
        model: db.Student,
        where: {
          student_id: req.params.user
        }}],
    }).then(function (dbClocking) {
      console.log(dbClocking.student_id);
      console.log(dbClocking.studentName);
      res.render("clocking", {
        cntUser: dbClocking.Student.student_id,
        studentName: dbClocking.studentName,
        logId: dbClocking.clock_id,
        update: "true",
        // dept: dbStudent.dept,
      });
    });
  });

  app.get("/stu/cat/:category/update/:id", function (req, res) {
    console.log("This is executing");
    const category = decodeURIComponent(req.params.category);
    console.log("This is the category" + category);
    db.cntTimesheet.findOne({
      where: {
        category: category,
        id: req.params.id
      }   
    }).then(function (dbcntTimesheet) {
      res.render("category", {
        // cntUser: dbcntTimesheet.student_id,
        // studentName: dbcntTimesheet.studentName,
        category: dbcntTimesheet.category,
        logId: dbcntTimesheet.id,
        update: "true",
      });
    });
  });

  app.get("/task/status/:status/update/:id", function (req, res) {
    const status = decodeURIComponent(req.params.status);
    db.Task.findOne({
      where: {
        task_id: req.params.id
      },
      include: [db.Student],
      include: [db.Project],
      where: {
        status: status
      }   
    }).then(function (dbTask) {
      res.render("task", {
        status: dbTask.status,
        logId: dbTask.task_id,
        update: "true",
      });
    });
  });

  app.get("/task/prj/:name/update/:id", function (req, res) {
    const name = decodeURIComponent(req.params.name);
    db.Task.findOne({
      where: {
        task_id: req.params.id
      },
      include: [
        {
        model: db.Project,
        where: {
          projectName: name
      }}],
    }).then(function (dbTask) {
      res.render("task", {
        projectName: dbTask.projectName,
        project_id: dbTask.Project.project_id,
        logId: dbTask.task_id,
        update: "true",
      });
    });
  });

  app.get("/task/stu/:user/update/:id", function (req, res) {
    db.Task.findOne({
      where: {
        task_id: req.params.id
      },
      include: [
        {
        model: db.Student,
        where: {
          student_id: req.params.user
        },
        required: true,
      }],
    }).then(function (dbTask) {
      res.render("task", {
        studentName: dbTask.assignedTo,
        student_id: dbTask.Student.student_id,
        logId: dbTask.task_id,
        update: "true",
      });
    });
  });

  app.get("/prj/:name/update/:id", function (req, res) {
    const name = decodeURIComponent(req.params.name);
    db.cntTimesheet.findOne({
      where: {
        projectName: name,
        id: req.params.id
      },
      include: [
        {
        model: db.Project,
        }],
    }).then(function (dbcntTimesheet) {
      res.render("prj", {
        projectName: dbcntTimesheet.projectName,
        project_id: dbcntTimesheet.Project.project_id,
        logId: dbcntTimesheet.id,
        update: "true",
      });
    });
  });

// Department Pages ***Need to refactor or remove***

  // app.get("/eng", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       dept: 'Engineering'
  //     }
  //   }).then(function (dbEmployee) {
  //     res.render("eng", {
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/mfg", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       dept: 'Manufacturing'
  //     }
  //   }).then(function (dbEmployee) {
  //     res.render("mfg", {
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/pm", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       dept: 'Program Management'
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.dept)
  //     res.render("pm", {
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/certs", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       dept: 'Certification'
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.dept)
  //     res.render("certs", {
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // User Specific Department Pages ***Need to refactor or remove***

  // app.get("/eng/:user", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       employee_id: req.params.user
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.employee_id);
  //     res.render("eng", {
  //       user: dbEmployee.employee_id,
  //       employeeName: dbEmployee.name,
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/certs/:user", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       employee_id: req.params.user
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.employee_id);
  //     res.render("certs", {
  //       user: dbEmployee.employee_id,
  //       employeeName: dbEmployee.name,
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/mfg/:user", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       employee_id: req.params.user
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.employee_id);
  //     res.render("eng", {
  //       user: dbEmployee.employee_id,
  //       employeeName: dbEmployee.name,
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/pm/:user", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       employee_id: req.params.user
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.employee_id);
  //     res.render("eng", {
  //       user: dbEmployee.employee_id,
  //       employeeName: dbEmployee.name,
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/admin/:user", function (req, res) {
  //   db.Employee.findOne({
  //     where: {
  //       employee_id: req.params.user
  //     }
  //   }).then(function (dbEmployee) {
  //     console.log(dbEmployee.employee_id);
  //     res.render("admin", {
  //       user: dbEmployee.employee_id,
  //       employeeName: dbEmployee.name,
  //       dept: dbEmployee.dept,
  //     });
  //   });
  // });

  // app.get("/category/:category", function (req, res) {
  //   db.Timesheet.findOne({
  //     include: [db.Employee],
  //     where: {
  //       category: req.params.category
  //     }
  //   }).then(function (dbTimesheet) {
  //     console.log(dbTimesheet.id);
  //     res.render("category", {
  //       category: dbTimesheet.category,
  //     });
  //   });
  // });

  // app.get("/update/:id", function (req, res) {
  //   db.Timesheet.findOne({
  //     include: [db.Employee],
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (dbTimesheet) {
  //     console.log(dbTimesheet.id);
  //     res.render("update", {
  //       logId: dbTimesheet.id,
  //       user: dbTimesheet.employee_id,
  //       employeeName: dbTimesheet.name,
  //       dept: dbTimesheet.Employee.dept
  //     });
  //   });
  // });

  // app.get("/rfb/:rfb", function (req, res) {
  //   db.Timesheet.findOne({
  //     include: [db.Employee],
  //     where: {
  //       program: req.params.rfb
  //     }
  //   }).then(function (dbTimesheet) {
  //     console.log(dbTimesheet.id);
  //     res.render("rfb", {
  //       program: dbTimesheet.program,
  //     });
  //   });
  // });

  // app.get("/rfb/ecr/:ecr", function (req, res) {
  //   db.Timesheet.findOne({
  //     include: [db.Employee],
  //     where: {
  //         ecr: req.params.ecr
  //     }
  //   }).then(function (dbTimesheet) {
  //     console.log(dbTimesheet.id);
  //     res.render("ecr", {
  //       program: dbTimesheet.program,
  //       ecr: dbTimesheet.ecr,
  //     });
  //   });
  // });

};
