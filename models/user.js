const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, require: true, maxLength: 20, unique: true },
  password: { type: String, require: true, maxLength: 75 },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Message',
    },
  ],
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
