const mongoose = require('mongoose');
var Schemea = mongoose.Schemea;

var userSchema = new Schemea(
  {
    firstName:String,
    lastName:String,
    phoneNumber:String,
    email:String,
    company:[String],
    organization:[String],
    volunteer:Boolean,
    isAdmin:Boolean,
    isTrainee:Boolean
  }
);

module.exports = mongoose.model('user', userSchema);
