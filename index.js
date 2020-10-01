const express = require('express');
const fileupload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const router = require('./routes/index');

// Creates a database connection
const db = mysql.createConnection ({
    host: 'durvbryvdw2sjcm5.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    port: 3306,
    user: 'w40yy3ux2zi9euvl',
    password: 'wbrgjdgedo4q1wtf',
    database: 'c0ze3uscw239329b'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error(err);
        throw err;
    }
    
    console.log('Connected to database');
});

// Expose database connection globally
global.db = db;

// Creates an Express web server
const app = express();

// Configures the default port which web server will listen on
const port = process.env.PORT || 80;

// Configures Pug as the view engine
app.set('view engine', 'pug');
// Configures default location of views
app.set('views', path.join(__dirname, 'views'));
// Configures default location for static application assets
app.use(express.static(path.join(__dirname, 'public')));
// Configures body parser to use URL encoding
app.use(bodyParser.urlencoded({ extended: false }));
// Configures body parser to use JSON format
app.use(bodyParser.json());
// Configures to use file upload
app.use(fileupload());
// Uses the router defined in ./routes/index.js
app.use('/', router);

// Starts listening to web requests at the specified port
app.listen(port, () => console.log(`Web server is listening on port ${port} ...`));