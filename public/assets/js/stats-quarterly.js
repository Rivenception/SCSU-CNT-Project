// get all workout data from back-end
fetch("/api/timesheets/tasks/eng/quarterly")
    .then(response => {
        return response.json();
    })
    .then(data => {
        // console.log(data)
        populateChartQuarterly(data);
    });

function generatePalette() {
    const arr = [
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "ffa600",
        "#003f5c",
        "#2f4b7c",
        "#665191",
        "#a05195",
        "#d45087",
        "#f95d6a",
        "#ff7c43",
        "ffa600"
    ]

    return arr;
}

function populateChartQuarterly(data) {
    let durations = duration(data);
    let timeTasks = calcTasks(data);
    let timeCategories = calcCategories(data);
    let tasks = taskNames(data);
    let categories = categoryNames(data);
    const colors = generatePalette();

    // let line = document.querySelector("#canvas-quarterly").getContext("2d");
    let barCategories = document.querySelector("#canvas11-quarterly").getContext("2d");
    let barTasks = document.querySelector("#canvas12-quarterly").getContext("2d");
    let pie = document.querySelector("#canvas13-quarterly").getContext("2d");
    let pie2 = document.querySelector("#canvas14-quarterly").getContext("2d");

    Chart.defaults.global.defaultFontColor = 'whitesmoke';

    // let lineChart = new Chart(line, {
    //     type: "line",
    //     data: {
    //         labels: [
    //             "Sunday",
    //             "Monday",
    //             "Tuesday",
    //             "Wednesday",
    //             "Thursday",
    //             "Friday",
    //             "Saturday"
    //         ],
    //         datasets: [
    //             {
    //                 label: "Duration In Minutes",
    //                 backgroundColor: "red",
    //                 borderColor: "red",
    //                 data: durations,
    //                 fill: false
    //             }
    //         ]
    //     },
    //     options: {
    //         responsive: true,
    //         title: {
    //             display: true,
    //             fontColor: "#fff"
    //         },
    //         scales: {
    //             xAxes: [
    //                 {
    //                     display: true,
    //                     scaleLabel: {
    //                         display: true
    //                     },
    //                 }
    //             ],
    //             yAxes: [
    //                 {
    //                     display: true,
    //                     scaleLabel: {
    //                         display: true
    //                     }
    //                 }
    //             ]
    //         }
    //     }
    // });

    let barChartCat = new Chart(barCategories, {
        type: "bar",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Total Hours",
                    data: timeCategories,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderWidth: 1
                }
            ],
        },
        
        options: {
            title: {
                display: true,
                text: "Categories"
            },
            parsing: {
                yAxesKey: "value"
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });

    let barChartTasks = new Chart(barTasks, {
        type: "bar",
        data: {
            labels: tasks,
            datasets: [
                {
                    label: "Total Hours",
                    data: timeTasks,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)"
                    ],
                    borderWidth: 1
                }
            ],
        },
        
        options: {
            title: {
                display: true,
                text: "Tasks"
            },
            parsing: {
                yAxesKey: "value"
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        }
    });

    let pieChart = new Chart(pie, {
        type: "pie",
        data: {
            labels: tasks,
            datasets: [
                {
                    label: "Tasks",
                    backgroundColor: colors,
                    data: timeTasks
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Tasks"
            }
        }
    });

    let donutChart = new Chart(pie2, {
        // could be a doughnut style chart.
        type: "pie",
        data: {
            labels: categories,
            datasets: [
                {
                    label: "Categories",
                    backgroundColor: colors,
                    data: timeCategories
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Categories"
            }
        }
    });
}

function duration(data) {
    let durations = [];

    data.forEach(timesheet => {
        //   console.log(timesheet.timespent);
        durations.push(timesheet.timespent);
        //   console.log(durations);
        // timesheet.timespent.forEach(timesheet => {
        //   durations.push(timesheet.timespent);
        // });
    });

    return durations;
}

function calcTasks(data) {
    let totalTasks = [];
    const tasksList = [...new Set(data.map(x => x.task))]
    for (i = 0; i < tasksList.length; i++) {
        let valueTasks = data.filter((tasks) => {
            return tasks.task === tasksList[i];
        }).map((tasks) => {
            return (tasks.timespent/60);
        }).reduce((total, tasks) => {
            return total + tasks;
        });
        totalTasks.push(valueTasks);
        // console.log(value)
    };
    // console.log(totalTasks);
    return totalTasks;
}

function calcCategories(data) {
    let totalCategories = [];
    const categoryList = [...new Set(data.map(x => x.category))]
    for (i = 0; i < categoryList.length; i++) {
        let valueCategory = data.filter((categories) => {
            return categories.category === categoryList[i];
        }).map((categories) => {
            return (categories.timespent/60);
        }).reduce((total, categories) => {
            return total + categories;
        });
        totalCategories.push(valueCategory);
        // console.log(valueCategory)
    };
    return totalCategories;
}


function taskNames(data) {

    const tasksList = [...new Set(data.map(x => x.task))]
    return tasksList;
}

function categoryNames(data) {
    const categoryList = [...new Set(data.map(x => x.category))]
    return categoryList;
}