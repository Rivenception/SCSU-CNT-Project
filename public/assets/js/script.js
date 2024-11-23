$(document).ready(function () {


    let admin_tasks = ["Other", "Internal Meeting", "Customer Meeting", "EHS/PE", "Training", "H-cell Support", "Emails"]
    let rd_tasks = ["Product Development", "Production Implementation", "Sales Samples"]
    let ci_tasks = ["Internal Meeting", "Training", "Review", "Other"]
    let ps_tasks = ["Production Support", "Samples Support"]
    let cert_tasks = ["Drawings", "GPDs", "Test Plan"]

    let eng_category = ["ECR", "Development", "Admin", "Production/Mfg Support", "Continuous Improvement", "R&D"]
    let mfg_category = ["ECR", "Development", "Admin", "Production/Mfg Support", "Continuous Improvement", "Transfer", "R&D"]
    let pm_category = ["Program Management", "Admin"]
    let cert_category = ["Dress Cover", "Oil Burn/C-Burn", "Vertical Burn/A-Burn"]
    let all_category = ["ECR", "Development", "Admin", "R&D", "Program Management", "Production/Mfg Support", "Continuous Improvement"]


    let type = ["Dress Cover", "Cushions", "Armcaps", "Other"]

    const minutes = [15, 30, 45, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 360, 390, 420, 450, 480, 510]

    var students = [];
    var studentId = [];
    var department = [];

    var dept = $('#dept').text();
    var allCategory = $('#category').text();
    var userName = $('#hidden-studentName').text();
    var entryId = $('#hidden-logId').text();

    //Set default date of today in date input field
    var today = new Date();
    var dd = ("0" + (today.getDate())).slice(-2);
    var mm = ("0" + (today.getMonth() + 1)).slice(-2);
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    $("#date").attr("value", today);

    //Section 1: Drop Downs

    // Function that dyanmically creates the time input options for the user in the html
    function projectDropdown() {
        console.log("fetching Project...");
        $.get("/api/projects", function (data) {
        for (let i = 0; i < data.length; i++) {
            let dropdown = $("<option>").attr("value", data[i]).text(data[i].projectName);
            $("#inputGroupProject").append(dropdown);
            }
        })
    }

    function categoryDropdown() {
        console.log("fetching Category...");
        $.get("/api/category", function (data) {
        for (let i = 0; i < data.length; i++) {
            let dropdown = $("<option>").attr("value", data[i]).text(data[i].category);
            $("#inputGroupCatetory").append(dropdown);
            }
        })
    }

    function typeDropdown() {
        console.log("fetching Types...");
        for (let i = 0; i < type.length; i++) {
            let dropdown = $("<option>").attr("value", type[i]).text(type[i]);
            $("#inputGroupType").append(dropdown);
        }
    }

    // Function for retrieving students and for dynamic drop down filler
    function getStudents() {
        console.log("fetching Students...");
        $.get("/api/students", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].status === 'Active') {
                    students.push(data[i].name);
                    studentId.push(data[i].student_id);
                    // department.push(data[i].dept)
                }
            }
        })
            .then(studentsDropdown);
    };

    function studentsDropdown() {
        console.log("Student User: " + userName);
        var studentInput = $("#inputGroupStudent");
        // For loop that gets all students and dynamically creates list in the html for the respective projects.
        if (userName) {
            //For loop that checks the URL for a userId and compares to student_id key in the database. If accurate, it sets the Name value in the html for the user by default.
            $.get("/api/students", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].student_id === userName & data[i].status === 'Active') {
                        let dropdown = $("<option>").attr("value", data[i].student_id).text(data[i].studentName);
                        studentInput.append(dropdown);
                    }
                }
            })
        } else {
            $.get("/api/students", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].status === 'Active') {
                        let dropdown = $("<option>").attr("value", data[i].student_id).text(data[i].studentName);
                        studentInput.append(dropdown);
                    }
                }
            })
            // if (dept === "Engineering") {
            //     $.get("/api/students", function (data) {
            //         for (var i = 0; i < data.length; i++) {
            //             if (data[i].dept === 'Engineering' && data[i].status === 'Active') {
            //                 let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
            //                 employeeInput.append(dropdown);
            //             }
            //         }
            //     })
            // } else if (dept === "Manufacturing") {
            //     $.get("/api/students", function (data) {
            //         for (var i = 0; i < data.length; i++) {
            //             if (data[i].dept === 'Manufacturing' && data[i].status === 'Active') {
            //                 let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
            //                 employeeInput.append(dropdown);
            //             }
            //         }
            //     })
            // } else if (dept === "Program Management") {
            //     $.get("/api/students", function (data) {
            //         for (var i = 0; i < data.length; i++) {
            //             if (data[i].dept === 'Program Management' && data[i].status === 'Active') {
            //                 let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
            //                 employeeInput.append(dropdown);
            //             }
            //         }
            //     })
            // } else if (dept === "Certification") {
            //     $.get("/api/students", function (data) {
            //         for (var i = 0; i < data.length; i++) {
            //             if (data[i].dept === 'Certification' && data[i].status === 'Active') {
            //                 let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
            //                 employeeInput.append(dropdown);
            //             }
            //         }
            //     })
            // };
        };
    };
    // Function that dyanmically creates the categories input options for the user in the html
    function categoriesDropdown() {
        console.log("fetching Categories for " + userName);
        if (entryId && dept) {
            console.log(dept);
            if (dept === "Engineering") {
                for (let i = 0; i < eng_category.length; i++) {
                    let dropdown = $("<option>").attr("value", eng_category[i]).text(eng_category[i]);
                    $("#inputGroupCategory").append(dropdown)
                };
            } else if (dept === "Manufacturing") {
                for (let i = 0; i < mfg_category.length; i++) {
                    let dropdown = $("<option>").attr("value", mfg_category[i]).text(mfg_category[i]);
                    $("#inputGroupCategory").append(dropdown);
                }
            } else if (dept === "Program Management") {
                for (let i = 0; i < pm_category.length; i++) {
                    let dropdown = $("<option>").attr("value", pm_category[i]).text(pm_category[i]);
                    $("#inputGroupCategory").append(dropdown);
                }
            } else if (dept === "Certification") {
                for (let i = 0; i < cert_category.length; i++) {
                    let dropdown = $("<option>").attr("value", cert_category[i]).text(cert_category[i]);
                    $("#inputGroupCategory").append(dropdown);
                }
            };
        } else if (userName && dept) {
            if (dept === "Engineering") {
                for (let i = 0; i < eng_category.length; i++) {
                    let dropdown = $("<option>").attr("value", eng_category[i]).text(eng_category[i]);
                    $("#inputGroupCategory").append(dropdown)
                };
            } else if (dept === "Manufacturing") {
                for (let i = 0; i < mfg_category.length; i++) {
                    let dropdown = $("<option>").attr("value", mfg_category[i]).text(mfg_category[i]);
                    $("#inputGroupCategory").append(dropdown);
                }
            } else if (dept === "Program Management") {
                for (let i = 0; i < pm_category.length; i++) {
                    let dropdown = $("<option>").attr("value", pm_category[i]).text(pm_category[i]);
                    $("#inputGroupCategory").append(dropdown);
                }
            } else if (dept === "Certification") {
                for (let i = 0; i < cert_category.length; i++) {
                    let dropdown = $("<option>").attr("value", cert_category[i]).text(cert_category[i]);
                    $("#inputGroupCategory").append(dropdown);
                }
            };
        } else if (window.location.pathname === "/eng") {
            for (let i = 0; i < eng_category.length; i++) {
                let dropdown = $("<option>").attr("value", eng_category[i]).text(eng_category[i]);
                $("#inputGroupCategory").append(dropdown);
            }
        } else if (window.location.pathname === "/mfg") {
            for (let i = 0; i < mfg_category.length; i++) {
                let dropdown = $("<option>").attr("value", mfg_category[i]).text(mfg_category[i]);
                $("#inputGroupCategory").append(dropdown);
            }
        } else if (window.location.pathname === "/pm") {
            for (let i = 0; i < pm_category.length; i++) {
                let dropdown = $("<option>").attr("value", pm_category[i]).text(pm_category[i]);
                $("#inputGroupCategory").append(dropdown);
            }
        } else if (window.location.pathname === "/certs") {
            for (let i = 0; i < cert_category.length; i++) {
                let dropdown = $("<option>").attr("value", cert_category[i]).text(cert_category[i]);
                $("#inputGroupCategory").append(dropdown);
            }
        } else if (window.location.pathname === "/category" || allCategory) {
            for (let i = 0; i < all_category.length; i++) {
                let dropdown = $("<option>").attr("value", all_category[i]).text(all_category[i]);
                $("#inputGroupCategory").append(dropdown);
            }
        }
    };

    // Function that dyanmically creates the task input options for the user in the html
    function tasksDropdown() {
        console.log("fetching Tasks for " + userName);
        if (entryId) {
            if (dept === 'Engineering') {
                for (let i = 0; i < eng_tasks.length; i++) {
                    let dropdown = $("<option>").attr("value", eng_tasks[i]).text(eng_tasks[i]);
                    $("#inputGroupTask").append(dropdown);
                }
            } else if (dept === 'Manufacturing') {
                for (let i = 0; i < mfg_tasks.length; i++) {
                    let dropdown = $("<option>").attr("value", mfg_tasks[i]).text(mfg_tasks[i]);
                    $("#inputGroupTask").append(dropdown);
                }
            } else if (dept === 'Program Management') {
                for (let i = 0; i < pm_tasks.length; i++) {
                    let dropdown = $("<option>").attr("value", pm_tasks[i]).text(pm_tasks[i]);
                    $("#inputGroupTask").append(dropdown);
                }
            } else if (dept === 'Certification') {
                for (let i = 0; i < cert_tasks.length; i++) {
                    let dropdown = $("<option>").attr("value", cert_tasks[i]).text(cert_tasks[i]);
                    $("#inputGroupTask").append(dropdown);
                }
            };
        } else if (dept === 'Engineering') {
            for (let i = 0; i < eng_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", eng_tasks[i]).text(eng_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (dept === 'Manufacturing') {
            for (let i = 0; i < mfg_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", mfg_tasks[i]).text(mfg_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (dept === 'Program Management') {
            for (let i = 0; i < pm_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", pm_tasks[i]).text(pm_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (dept === 'Certification') {
            for (let i = 0; i < cert_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", cert_tasks[i]).text(cert_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        };
    }

    // Function that dyanmically creates the time input options for the user in the html
    function timesDropdown() {
        console.log("fetching Times...");
        for (let i = 0; i < minutes.length; i++) {
            let dropdown = $("<option>").attr("value", minutes[i]).text(minutes[i]);
            $("#inputGroupTime").append(dropdown);
        }
    }

    // Section 2: Capacity

    function capacityEng() {
        let eng_emp_count = 0;
        $.get("/api/employees", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].dept === 'Engineering' && data[i].status === 'Active') {
                    eng_emp_count += 1;
                }
            }
            // console.log("Engineering Employees: " + eng_emp_count)
            var daily_hours = 8
            var day = 1
            var week = 4
            var month = 16
            var capacity = eng_emp_count * daily_hours;
            var dailyCap = capacity * day;
            var weeklyCap = capacity * week;
            var monthlyCap = capacity * month;
            var weightedDailyCap = Math.round(dailyCap * 0.8);
            var weightedWeeklyCap = Math.round(weeklyCap * 0.8);
            var weightedMonthlyCap = Math.round(monthlyCap * 0.8);
            $('#daily-capacity').text("Daily Capacity: " + weightedDailyCap + " hours");
            $('#weekly-capacity').text("Weekly Capacity: " + weightedWeeklyCap + " hours");
            $('#monthly-capacity').text("Monthly Capacity: " + weightedMonthlyCap + " hours");
        })
    }

    function getMonthlyCapacity() {
        var totalCapacityLogged = 0;
        $.get("/api/timesheets/tasks/eng/monthly", function (data) {
            for (var i = 0; i < data.length; i++) {
                totalCapacityLogged += data[i].timespent
            }
        }
        ).then(() => {
            var hoursLogged = Math.round(totalCapacityLogged / 60);
            $('#monthly-logged-capacity').text("Monthly Hours Logged: " + hoursLogged + " hours");
        })
    };

    function getWeeklyCapacity() {
        var totalCapacityLogged = 0;
        $.get("/api/timesheets/tasks/eng/weekly", function (data) {
            for (var i = 0; i < data.length; i++) {
                totalCapacityLogged += data[i].timespent
            }
        }
        ).then(() => {
            var hoursLogged = Math.round(totalCapacityLogged / 60);
            $('#weekly-logged-capacity').text("Weekly Hours Logged: " + hoursLogged + " hours");
        })
    };

    function getDailyCapacity() {
        var totalCapacityLogged = 0;
        $.get("/api/timesheets/tasks/eng/daily", function (data) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].date === today) {
                    totalCapacityLogged += data[i].timespent
                    console.log(totalCapacityLogged)
                }
            }
            console.log("Daily Logged Capacity: " + totalCapacityLogged + " minutes")
        }
        ).then(() => {
            var hoursLogged = Math.round(totalCapacityLogged / 60);
            $('#daily-logged-capacity').text("Daily Hours Logged: " + hoursLogged + " hours");
            console.log("Daily Logged Capacity: " + hoursLogged + " hours")
        })
    };

    // Section 3: Active Functions

    getStudents();
    categoryDropdown();
    projectDropdown();

    // Unused Functions
    tasksDropdown();
    timesDropdown();
    typeDropdown();
    // capacityEng();
    // getDailyCapacity()
    // getWeeklyCapacity()
    // getMonthlyCapacity()

    // Section 4: On Change Functions

    $(document).on("change", "#inputGroupCategory", getSelects);

    function getSelects() {
        console.log("fetching Selects...");
        var categoryInput = $("#inputGroupCategory").val();
        var taskInput = $("#inputGroupTask");
        var dept = $('#dept').text();
        taskInput.children().remove();
        console.log(categoryInput);
        if (categoryInput === "ECR") {
            for (let i = 0; i < ecr_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", ecr_tasks[i]).text(ecr_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "Development") {
            if (dept === 'Engineering') {
                for (let i = 0; i < eng_tasks.length; i++) {
                    let dropdown = $("<option>").attr("value", eng_tasks[i]).text(eng_tasks[i]);
                    $("#inputGroupTask").append(dropdown);
                }
            } else if (dept === 'Manufacturing') {
                for (let i = 0; i < mfg_tasks.length; i++) {
                    let dropdown = $("<option>").attr("value", mfg_tasks[i]).text(mfg_tasks[i]);
                    $("#inputGroupTask").append(dropdown);
                }
            }
        } else if (categoryInput === "Admin") {
            for (let i = 0; i < admin_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", admin_tasks[i]).text(admin_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "Program Management") {
            for (let i = 0; i < pm_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", pm_tasks[i]).text(pm_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "R&D") {
            for (let i = 0; i < rd_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", rd_tasks[i]).text(rd_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "Transfer") {
            for (let i = 0; i < mfg_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", mfg_tasks[i]).text(mfg_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "Production/Mfg Support") {
            for (let i = 0; i < ps_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", ps_tasks[i]).text(ps_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "Continuous Improvement") {
            for (let i = 0; i < ci_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", ci_tasks[i]).text(ci_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        } else if (categoryInput === "Oil Burn/C-Burn" || "Vertical Burn/A-Burn" || "Dress Cover") {
            for (let i = 0; i < cert_tasks.length; i++) {
                let dropdown = $("<option>").attr("value", cert_tasks[i]).text(cert_tasks[i]);
                $("#inputGroupTask").append(dropdown);
            }
        }
    }

    $(document).on("change", "#deptSelect", getEmployeeByDept);

    function getEmployeeByDept() {
        var deptInput = $("#deptSelect").val();
        // console.log(deptInput);
        var employeeInput = $("#inputGroupEmployee");
        employeeInput.children().remove();
        if (deptInput === "Engineering") {
            $.get("/api/employees", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dept === 'Engineering') {
                        let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
                        employeeInput.append(dropdown);
                    }
                }
            })
        } else if (deptInput === "Manufacturing") {
            $.get("/api/employees", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dept === 'Manufacturing') {
                        let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
                        employeeInput.append(dropdown);
                    }
                }
            })
        } else if (deptInput === "Program Management") {
            $.get("/api/employees", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dept === 'Program Management') {
                        let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
                        employeeInput.append(dropdown);
                    }
                }
            })
        } else if (deptInput === "Certification") {
            $.get("/api/employees", function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].dept === 'Certification') {
                        let dropdown = $("<option>").attr("value", data[i].employee_id).text(data[i].name);
                        employeeInput.append(dropdown);
                    }
                }
            })
        };
    }

    $(document).on("click", "#Search", searchEmployee);

    function searchEmployee(event) {
        event.preventDefault();
        var employeeSelect = $("#inputGroupEmployee").val();
        var categorySelect = $("#inputGroupCategory").val();
        var deptInput = $("#deptSelect").val();
        console.log(employeeSelect);
        if (deptInput === 'Engineering') {
            window.location.href = "/eng/" + employeeSelect;
            console.log(window.location.href);
        } else if (deptInput === 'Manufacturing') {
            window.location.href = "/mfg/" + employeeSelect;
        } else if (deptInput === 'Program Management') {
            window.location.href = "/pm/" + employeeSelect;
        } else if (deptInput === 'Certification') {
            window.location.href = "/certs/" + employeeSelect;
        }  else if (categorySelect) {
            window.location.href = "/category/" + categorySelect;
        }
    }
});