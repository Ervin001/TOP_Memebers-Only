const User = require('../models/user');
const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// home page
exports.index = asyncHandler(async (req, res) => {
  // let currentUser = res.locals.currentUser;
  // let isDisabled = !currentUser ? 'disabled' : '';
  const allUsers = await User.find({}, 'username').populate('messages').exec();
  res.render('index', {
    user: req.user,
    allUsers: allUsers,
    // isDisabled: isDisabled,
  });
});

exports.send_message_post = asyncHandler(async (req, res) => {
  //extract userId
  const currentUserId = res.locals.currentUser._id;

  // find user in db
  const user = await User.findById(currentUserId);

  const message = new Message({
    message: req.body.msg,
    user: currentUserId,
  });

  if (user) {
    const savedMessage = await message.save();

    // Add the message to the user's messages array
    user.messages.push(savedMessage._id);
    await user.save();
    console.log(message);

    // Redirect to home page
    res.redirect('/');
  }
});
