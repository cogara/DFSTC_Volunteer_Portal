const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  email: String,
  password: String,
  isAdmin: Boolean,
  isVolunteer: Boolean,
});

UserSchema.pre('save', function(next) {
  let user = this;
  if(user.isModified('password')) {
    bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash) {
      if(err) {
        console.log('hash error', err);
        return next(err);
      } else {
        user.password = hash;
        next();
      }
    })
  } else {
    next();
  }
})

UserSchema.methods.passwordCheck = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err){
      console.log(err);
      return callback(err)
    } else {
      callback(null, isMatch);
    }
  });
}

module.exports = mongoose.model('User', UserSchema);
