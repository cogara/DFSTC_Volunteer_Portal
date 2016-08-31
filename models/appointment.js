var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var appointmentSchema = new Schema(
  {
    title: {type: String, default: 'Image Coach Appointment'},
    date: Date,
    startsAt: Date,
    endsAt: Date,
    volunteerSlots: Number,
    volunteers: Object,
    clientSlots: Number,
    clients: Number,
    color: Object,
    incrementsBadgeTotal: Boolean,

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
