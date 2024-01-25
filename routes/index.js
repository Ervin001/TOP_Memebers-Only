var express = require('express');
var router = express.Router();

//Controllers
const authentication_controller = require('../controllers/authenticationController');
const messages_controller = require('../controllers/messagesController');

/* GET home page. */
router.get('/', messages_controller.index);

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
