// index.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/form.html');
});

app.post(
  '/submit',
  body('name').notEmpty().trim().escape(),
  body('email').isEmail().normalizeEmail(),
  body('phone').isMobilePhone().trim(),
  body('message').notEmpty().trim().escape(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.status(200).json({
      success: true,
      message: 'Form submitted successfully',
      data: req.body,
    });
  }
);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running');
});