var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema (
  title:String,
  date: Date,
  massage:String
);

module.exports = mongoose.model('announcement', announcementSchema);
