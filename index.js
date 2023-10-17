// This is the main file that starts the server and handles the routes
// Require the necessary modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const validator = require('express-validator');

// Create an express app
const app = express();

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Use the body-parser middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: false }));

// Use the express-validator middleware to validate the form data
app.use(validator());

// Serve the static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Require the routes file
const routes = require('./routes');

// Use the routes for the root path
app.use('/', routes);

// Set the port number
const port = process.env.PORT || 3000;

// Start the server and listen on the port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
