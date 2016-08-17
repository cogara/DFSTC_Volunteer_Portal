const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: String,
  password: String,
  profile: {
    firstName: String,
    lastName: String,

  },
  role: String
});

module.exports = mongoose.model('User', UserSchema);
