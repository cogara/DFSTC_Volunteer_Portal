var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema ({
  title:String,
  date: {type:Date, default:new Date()},
  message:String
});

module.exports = mongoose.model('announcement', announcementSchema);
