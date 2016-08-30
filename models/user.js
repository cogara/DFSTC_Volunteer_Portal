const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const fs = require('fs');

var UserSchema = new Schema(
  {
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String,
    phoneNumber: String,
    address:{
      addressOne: String,
      addressTwo: String,
      state: String,
      city: String,
      zip: String
    },
    company: String,
    pastCompanies: Object,
    isVolunteer: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isSuperAdmin: {type:Boolean, default: false},
    isTrainee: {type: Boolean, default: true},
    isAvail: Object,
    lastLogin: Date,
    volunteerOpportunities: Object,
    photo: String,
    isActive: {type: Boolean, default: true},
    inactiveMessage: String
  }
);

UserSchema.pre('save', function(next) {
  var user = this;

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

UserSchema.methods.passwordCheck = function (candidatePassword, callback) {
  console.log('old pass', this.password);
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if(err){
      console.log(err);
      return callback(err)
    } else {
      callback(null, isMatch);
    }
  });
}

UserSchema.methods.changePassword = function(newPassword, callback) {
  bcrypt.hash(newPassword, SALT_WORK_FACTOR, function(err, hash) {
    if(err) {
      console.log('hash error', err);
      return false;
    } else {
      console.log('new pass', hash);
      callback(null, hash)
    }
  })
}

module.exports = mongoose.model('User', UserSchema);
