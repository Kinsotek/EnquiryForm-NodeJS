// Import the required modules
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const validator = require("./validator"); // Custom validator module

// Set the view engine to ejs
app.set("view engine", "ejs");

// Use body-parser middleware to parse the form data
app.use(bodyParser.urlencoded({ extended: true }));

// Define the GET route for the form
app.get("/", function (req, res) {
  // Render the form view with an empty data object
  res.render("form", { data: {} });
});

// Define the POST route for the form submission
app.post("/", validator.form, function (req, res) {
  // Check if there are any validation errors
  const errors = validator.getErrors(req);
  if (errors) {
    // If there are errors, render the form view again with the errors and the previous data
    res.render("form", { errors: errors, data: req.body });
  } else {
    // If there are no errors, render the result view with the data
    res.render("result", { data: req.body });
  }
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
