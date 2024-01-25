var express = require('express');
var router = express.Router();

//Controllers
const authentication_controller = require('../controllers/authenticationController');
const messages_controller = require('../controllers/messagesController');

const messages = [
  {
    title: 'Hello World',
    message: 'This is the first message',
    owner: 'Bob',
  },
  {
    title: 'Second World',
    message: 'This will be the second message',
    owner: 'Jerry',
  },
  {
    title: 'Third Message',
    message: 'This will be the third message',
    owner: 'Bob',
  },
  {
    title: 'Fourth Message',
    message: 'Maybe the last one',
    owner: 'Sam',
  },
  {
    title: 'Goodbye World',
    message: 'This is the last message',
    owner: 'Bob',
  },
  {
    title: 'Fourth Message',
    message: 'Maybe the last one',
    owner: 'Sam',
  },
  {
    title: 'Goodbye World',
    message:
      'This is the last messagehis is the last messagehis is the last messagehis is the last message',
    owner: 'Bob',
  },
  {
    title: 'Fourth Message',
    message: 'Maybe the last one',
    owner: 'Sam',
  },
  {
    title: 'Goodbye World',
    message: 'This is the last message',
    owner: 'Bob',
  },
];

/* GET home page. */
router.get('/', function (req, res, next) {
  let currentUser = res.locals.currentUser;
  let isDisabled = !currentUser ? 'disabled' : '';
  res.render('index', {
    user: req.user,
    messages: messages,
    isDisabled: isDisabled,
  });
});

// handle sign up on get
router.get('/sign-up', authentication_controller.sign_up_get);

// handle sign up on post
router.post('/sign-up', authentication_controller.sign_up_post);

// handle sign in on get
router.get('/log-in', authentication_controller.log_in_get);

// handle log in on post
router.post('/log-in', authentication_controller.log_in_post);

// handle log out
router.get('/log-out', authentication_controller.log_out_get);

// handle sending messages
router.post('/send-message', messages_controller.send_message_post);

module.exports = router;
