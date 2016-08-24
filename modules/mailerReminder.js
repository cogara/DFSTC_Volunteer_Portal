var router = require('express').Router();
var nodemailer = require('nodemailer');

var user = require('../models/user');
var appointment = require('../models/appointment');


var mailReminder = function(){

  // sets the the times for midinght of the next day and and midnight of the day after
  var tomorrow  = new Date(new Date().setDate(new Date().getDate()+1));
  tomorrow.setHours(0,0,0,0);
  console.log(tomorrow);
  var nextDay  = new Date(new Date().setDate(new Date().getDate()+2));
  nextDay.setHours(0,0,0,0);
  console.log(nextDay);

  // queries the server for apponitments between tomorrow and the next day for reminders
  appointment.find({ "startTime":{ $gte: tomorrow $lt: nextDay} }, function(err,theAppointment){
    console.log(theAppointment);
  }
);


  var volunteer = "default";
  user.find( function(err, theVolenteer){
     volunteer = theVolenteer[0]

     var transporter = nodemailer.createTransport({
       service:'Gmail',
       auth:{
         user:'dfstc016@gmail.com',
         pass:'dressForSuccess'
       },
       logger:false,
       debug:false
     },{
       // default message
       from: 'Macho Man Randy S<dogs>',
         headers: {
             'X-Laziness-level': 1000 // just an example header, no need to use this
         }

     });

     console.log('SMTP');

     var message = {
       // Comma separated list of recipients
     to: '"Richard C" <zerofox16@gmail.com>',

     // Subject of the message
     subject: 'Nodemailer is unicode friendly ✔', //

     // plaintext body
     text: 'Hello to myself!',

     // HTML body
     html: '<p><b>Hello</b> to myself </p>' +
         '<p>Hello '+volunteer.firstName+'</p> New message sent' +new Date()

     };

     console.log('sending mail');
     transporter.sendMail(message, function(err, info){
       if (err) {
         console.log(err);
         return;
       }

     console.log('Message sent successfully!');
     console.log('Server responded with "%s"', info.response);


  });

  //console.log(name.select('firstName'));




  });
}




  module.exports = mailReminder;
