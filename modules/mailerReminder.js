var router = require('express').Router();
var nodemailer = require('nodemailer');

var user = require('../models/user');
var appointment = require('../models/appointment');


var mailReminder = function(){

  // sets the the times for midinght of the next day and and midnight of the day after
  var tomorrow  = new Date(new Date().setDate(new Date().getDate()+1));
  var nextDay  = new Date(new Date().setDate(new Date().getDate()+2));
  tomorrow.setHours(0,0,0,0);
  nextDay.setHours(0,0,0,0);


    // queries the server for apponitments between tomorrow and the next day for reminders
    appointment.find({ "startTime":{ $gte: tomorrow , $lt: nextDay} }, function(err,theAppointment){

      theAppointment.forEach(function(element){
        //console.log(element.startTime +" Awesome!" );
        //TODO: fix up mai;l sender
        mailToUser(element);
      });
    }
  );
}

function mailToUser (apmt){

    var volunteer = "default";
    user.find( function(err, theVolenteer){
       volunteer = theVolenteer[0]

       var transporter = nodemailer.createTransport({
         service:'Gmail',
         //TODO: Change to an actual secret account and if gmail sett to less secure in security settings
         auth:{
           user:'dfstc016@gmail.com',
           pass:'dressForSuccess'
         },
         logger:false,
         debug:false
       },{
         // default message
         from: 'MAd Dog Pete <dogs>',
       });

       var message = {
         // Comma separated list of recipients
       to: '"'+volunteer.firstName +'" <zerofox16@gmail.com>',

       // Subject of the message
       subject: 'Mailer reminder ✔', //

       // HTML body
       html: '<p><b>Hello</b> to myself </p>' +
           '<p>Hello '+volunteer.firstName+'</p> New message sent: ' +new Date()+
           '<p>Appointment time at '+apmt.startTime+' </p>'

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
