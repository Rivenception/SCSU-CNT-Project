const fs = require('fs');
const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();
app.set("port", PORT);

// Requiring our models for syncing
const db = require("./models");

// Parse application body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// For the gallery
app.use('/public', express.static(path.join(__dirname, 'public')));

// Get images for gallery
app.get('/public/assets/img/slides', (req, res) => {
    const slidesPath = path.join(__dirname, '/public/assets/img/slides');

    fs.readdir(slidesPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Could not list files" });
        }
        res.json(files);
    });
});

// Set Handlebars.
const exphbs = require("express-handlebars");
const hbs = exphbs.create({ defaultLayout: 'main' });

// app.engine("handlebars", exphbs({ defaultLayout: "main" })); //deprecated code
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
// var apiEmployeeRoutes = require("./controllers/routes/api-employee-routes.js");
// var apiTimesheetRoutes = require("./controllers/routes/api-timesheet-routes.js");
// var routes = require("./controllers/routes/html-routes.js");

// apiEmployeeRoutes(app);
// apiTimesheetRoutes(app);
// htmlRoutes(app);

// app.use(apiEmployeeRoutes);
// app.use(apiTimesheetRoutes);
// app.use(routes);

//Routes
require("./controllers/routes/api-cnt_timesheet-routes.js")(app);
require("./controllers/routes/api-student-routes.js")(app);
require("./controllers/routes/api-employee-routes.js")(app);
require("./controllers/routes/api-timesheet-routes.js")(app);
require("./controllers/routes/html-routes.js")(app);

// Partials functions
// Handlebars.registerHelper('mgr', '{{partials}}');

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
// { force: true }

db.sequelize.sync().then(function () {
    app.listen(PORT, function () {
        console.log("Server listening on: http://localhost:" + PORT);
    });
});