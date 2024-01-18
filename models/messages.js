const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  title: { type: String, required: true, maxLength: 20 },
  message: { type: String, required: true, maxLength: 75 },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
