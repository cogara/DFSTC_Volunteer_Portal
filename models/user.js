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
    fullName: String,
    phoneNumber: String,
    address:{
      addressOne: String,
      addressTwo: String,
      state: String,
      city: String,
      zip: String
    },
    company: String,
    jobTitle: String,
    isVolunteer: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false},
    isSuperAdmin: {type:Boolean, default: false},
    isTrainee: {type: Boolean, default: false},
    isClient: {type: Boolean, default: false},
    isCaseWorker: {type: Boolean, default: false},
    lastLogin: Date,
    photo: String,
    isActive: {type: Boolean, default: true},
    inactiveMessage: String,
//volunteer info
    pastCompanies: Object,
    isAvail: Object,
    volunteerOpportunities: Object,
    lastAppointment: Date,
    hoursVolunteered: Object,
    totalHours: Number,
//client info
    altContactName: String,
    altContactPh: Number,
    altContactRel: String,
    caseWorker: String,
    age: Number,
    height: Number,
    topSize: String,
    bottomSize: String,
    shoeSize: String,
    restrictions: String,
    interviewStartDate: Date,
    employmentStartDate: Date,
    internshipStartDate: Date,
    schedulingRestrictions: String,
//case worker info
    clients: Object
  }
);

UserSchema.pre('save', function(next) {
  var user = this;
  user.fullName = user.firstName + ' ' + user.lastName;
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
