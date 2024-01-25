const User = require('../models/user');
const Message = require('../models/message');

const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

exports.send_message_post = [
  asyncHandler(async (req, res) => {
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
  }),
];

// exports.send_message_post = asyncHandler(async (req, res) => {
//   const user = req.user;

//   console.log(user);
//   const h1Content = '<h1>Your Heading Text</h1>';
//   res.send(h1Content);
// });
