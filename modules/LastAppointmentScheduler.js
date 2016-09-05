// var router = require('express').Router();
var nodemailer = require('nodemailer');
const moment = require('moment');
var User = require('../models/user');
var Appointment = require('../models/appointment');

function lastAppointment() {
  // console.log('setting last appointments');
  // sets the the times for midinght of yesterday and and midnight of current day
  var yesterday  = new Date(new Date().setDate(new Date().getDate()-1));
  var today  = new Date(new Date().setDate(new Date().getDate()));
  yesterday.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  console.log(yesterday);
  console.log(today);
  console.log(new Date());
  var volunteers = [];


    // queries the server for apponitments between tomorrow and the next day for reminders
    Appointment.find({ "startsAt":{ $gte:  yesterday, $lt: today} }, function(err,appointments){
      if(err){
        console.log(err);
      }
      console.log('appointments', appointments);
      for (var i = 0; i < appointments.length; i++) {
        console.log('single appointment', appointments[i]);
        // console.log('volunteers', appointments[i].volunteers);
        for (var j = 0; j < appointments[i].volunteers.length; j++) {
          console.log('volunteer', appointments[i].volunteers[j]);
          var starts = moment(appointments[i].startsAt);
          var ends = moment(appointments[i].endsAt);
          var duration = moment.duration(ends.diff(starts));
          var hours = duration.asHours();
          console.log('hours', hours);
          User.findByIdAndUpdate(appointments[i].volunteers[j]._id,
            {
              $set: {
                lastAppointment: yesterday
              },
              $push: {
                hoursVolunteered: {
                  date: yesterday,
                  appointment: appointments[i]._id,
                  company: appointments[i].volunteers[j].company,
                  hours: hours
                }
              },
              $inc: {
                totalHours: hours
              }
            },
            function(err, result){
            if(err) {
              console.log('error setting last appt date');
              throw err;
            } else {
              console.log('last appt set');
            }
          });
        }
      }
    }
  );
}




module.exports = lastAppointment;
