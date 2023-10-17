// Import the express-validator module
const { check, validationResult } = require("express-validator");

// Define an array of validation rules for the form fields
exports.form = [
  // Full name must not be empty and must be alphanumeric
  check("fullName", "Full name is required and must be alphanumeric")
    .trim()
    .notEmpty()
    .isAlphanumeric(),
  // Email must not be empty and must be valid
  check("email", "Email address is required and must be valid")
    .trim()
    .notEmpty()
    .isEmail()
    .normalizeEmail(),
  // Phone must not be empty and must be numeric
  check("phone", "Telephone number is required and must be numeric")
    .trim()
    .notEmpty()
    .isNumeric(),
  // Message must not be empty and must be escaped to prevent XSS attacks
  check("message", "Enquiry message is required").trim().notEmpty().escape(),
];

// Define a function to get the validation errors from the request object
exports.getErrors = function (req) {
  // Get the validation result
  const result = validationResult(req);
  // If there are no errors, return null
  if (result.isEmpty()) {
    return null;
  }
  // If there are errors, return an array of error messages
  return result.array().map((error) => error);
};
