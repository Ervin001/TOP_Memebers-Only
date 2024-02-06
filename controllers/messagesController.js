const User = require('../models/user');
const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// home page
exports.index = asyncHandler(async (req, res) => {
  let currentUser = res.locals.currentUser;
  let isDisabled = !currentUser ? 'disabled' : '';
  const [allUsers, allMessages] = await Promise.all([
    User.find({}).exec(),
    Message.find({}).populate('user').exec(),
  ]);

  const messagesModified = allMessages.map((item) => ({
    message: item.message,
    owner: item.user.username,
    timestamp: item.timestamp,
  }));

  res.render('index', {
    user: req.user,
    allMessages: messagesModified,
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
    timestamp: new Date(),
  });

  if (user) {
    const savedMessage = await message.save();

    // Add the message to the user's messages array
    user.messages.push(savedMessage._id);
    await user.save();

    // Redirect to home page
    res.redirect('/');
  }
});
