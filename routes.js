// This is the file that defines the routes for the web app
// Require the necessary modules
const express = require('express');
const router = express.Router();

// Define a GET route for the home page
router.get('/', (req, res) => {
  // Render the index view with an empty data object
  res.render('index', { data: {} });
});

// Define a POST route for submitting the form
router.post('/', (req, res) => {
  // Get the form data from the request body
  const data = req.body;

  // Validate the form data using the express-validator methods
  req.checkBody('fullname', 'Full name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('phone', 'Phone number is required').notEmpty();
  req.checkBody('phone', 'Phone number is not valid').isMobilePhone();
  req.checkBody('message', 'Message is required').notEmpty();

  // Get the validation errors from the request
  const errors = req.validationErrors();

  // If there are errors, render the index view with the errors and the data
  if (errors) {
    res.render('index', { errors, data });
  } else {
    // If there are no errors, render the success view with the data
    res.render('success', { data });
  }
});

// Export the router object
module.exports = router;
