const User = require('../models/user');
const Message = require('../models/message');
const { format, formatISO, parseISO } = require('date-fns');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const path = require('path');

const dateFormatted = function (date) {
  const dateF = formatISO(date);
  const formattedDate = format(dateF, 'eee LLL dd hh:mma');

  return formattedDate;
};

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
    timestamp: dateFormatted(item.timestamp),
    img: '/' + item.user.avatar,
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

exports.send_avatar_post = async (req, res) => {
  //extract userId
  const currentUserId = res.locals.currentUser._id;
  // find user in db
  const user = await User.findById(currentUserId);
  user.avatar = path.basename(req.file.path);
  console.log(`this is the file path ${user.avatar}`);

  await user.save();

  // Need to somehow pass it to the messageModified array in the index route.

  res.redirect('/');
};
