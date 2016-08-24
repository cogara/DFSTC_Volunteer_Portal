var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema(
  {
    title: {type: String, default: 'Image Coach Appointment'},
    date: Date,
    startTime: Date,
    endTime: Date,
    volunteerSlots: Number,
    volunteers: Object,
    clientSlots: Number,
    clients: Object,

    // this object will have a value for each client to indicate appointment type - e.g.
    // {
    // appointmentType: interview,
    // appointmentType: wardrobe,
    // appointmentType: wardrobe
    // }

    trainingAppointment: Boolean
  }
);


module.exports = mongoose.model('Appointment', appointmentSchema);
