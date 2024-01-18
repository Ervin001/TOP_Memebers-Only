const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, maxLength: 20 },
  password: { type: String, require: true, maxLength: 50 },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
