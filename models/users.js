const mongoose = require('mongoose');
var Schema = mongoose.Schemea;

var userSchema = new Schema(
  {
    firstName:String,
    lastName:String,
    phoneNumber:String,
    email:String,
    company:[String],
    organization:[String],
    volunteer:Boolean,
    isAdmin:{type:Boolean, Default:false},
    isTrainee:{type:Boolean, Default:true}
  }
);

module.exports = mongoose.model('user', userSchema);
