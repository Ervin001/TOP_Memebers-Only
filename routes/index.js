var express = require('express');
var router = express.Router();

// file upload
const multer = require('multer');
const path = require('path');
// const upload = multer({
//   dest: 'avatars/',
// });

// to change the name of the images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'avatars/');
  },
  filename: function (req, file, cb) {
    // Generate a random filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// does not need 'dest' since diskStorage was used
const upload = multer({ storage: storage });

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

// handle avatar change
router.post(
  '/avatar',
  upload.single('avatar'),
  messages_controller.send_avatar_post
);

module.exports = router;
