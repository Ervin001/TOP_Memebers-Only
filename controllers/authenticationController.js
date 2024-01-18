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
  // Process request after validation and sanitization.
  asyncHandler(async (req, res) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);

    const user = new User({
      username: req.body.username,
      password: req.body.password,
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
