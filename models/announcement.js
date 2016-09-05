var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var announcementSchema = new Schema ({
  announcement: String
});

module.exports = mongoose.model('announcement', announcementSchema);
