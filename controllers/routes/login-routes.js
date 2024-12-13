
const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'localhost',
    user: 'testuser',       // replace with your MySQL username
    password: 'testuser',  // replace with your MySQL password
    database: 'time_monitorDB_test'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = function (app) {
    // Route to render login page
    app.get('/login', (req, res) => {
        res.render('login');
    });

    // Route to render registration page
    app.get('/register', (req, res) => {
        res.render('register');
    });

    // Route to handle login form submission
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        console.log('Form submitted with:', { username, password });

        db.query('SELECT * FROM logins WHERE username = ?', [username], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                res.render('login', { error: 'An error occurred. Please try again later.' });
                return;
            }

            console.log('Database query results:', results);

            if (results.length > 0) {
                const user = results[0];
                console.log('User found:', user);

                const match = await bcrypt.compare(password, user.password);
                console.log('Password match:', match);

                if (match) {
                    res.render('success', { username: user.username });
                } else {
                    console.log('Password did not match.');
                    res.render('login', { error: 'Invalid credentials, please try again.' });
                }
            } else {
                console.log('No user found with that username.');
                res.render('login', { error: 'Invalid credentials, please try again.' });
            }
        });
    });

    // Route to handle user registration form submission
    app.post('/register', async (req, res) => {
        const { username, password } = req.body;
        console.log('Registration form submitted with:', { username, password });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into the database
        db.query('INSERT INTO logins (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    console.error('Error: Duplicate entry for username.');
                    res.render('register', { error: 'Username already exists, please choose another.' });
                    return;
                }
                console.error('Error inserting user:', err);
                res.render('register', { error: 'User registration failed, try again.' });
                return;
            }
            console.log('User registered successfully:', results);
            res.render('login', { success: 'User registered successfully. You can now log in.' });
        });
    });
};