const User = require('../models/user');
const Messages = require('../models/messages');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.sign_up_get = asyncHandler(async (req, res) => {
  res.render('signup');
});

exports.sign_up_post = [
  // Validate and sanitize fields
  body('username')
    .trim()
    .isLength({ min: 1, max: 20 })
    .withMessage('Username must be between 1 and 20 characters')
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage('Username can only contain letters and numbers')
    .custom(async (value) => {
      // Check if username is unique in the database
      const existingUser = await User.findOne({ username: value });
      if (existingUser) {
        throw new Error('Username is already taken');
      }
      return true;
    }),

  body('password')
    .trim()
    .isLength({ min: 1, max: 75 })
    .withMessage('Password must be between 1 and 75 characters')
    .matches(/^[a-zA-Z0-9-_]+$/)
    .withMessage(
      'Password can only contain letters, numbers, hyphens, and underscores'
    ),

  // Process request after validation and sanitization.
  asyncHandler(async (req, res) => {
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        // Handle the error appropriately, e.g., render an error page
        return res.status(500).send('Internal Server Error');
      }

      // Extract the validation errors from a request
      const errors = validationResult(req);

      const user = new User({
        username: req.body.username,
        password: hashedPassword,
      });

      if (!errors.isEmpty()) {
        // There are error, render form again with sanitized values
        res.render('signup', {
          title: 'Sign Up',
          user: user,
          errors: errors.array(),
        });
      } else {
        // Data in form is valid
        await user.save();
        res.redirect('/');
      }
    });
  }),
];

exports.log_in_get = asyncHandler(async (req, res) => {
  res.render('login', {
    title: 'Login',
  });
});

exports.log_in_post = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/log-in',
});

exports.log_out_get = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
};
