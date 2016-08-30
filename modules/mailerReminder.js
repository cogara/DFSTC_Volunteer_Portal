var router = require('express').Router();
var nodemailer = require('nodemailer');
const moment = require('moment');

var user = require('../models/user');
var appointment = require('../models/appointment');




var mailReminder = function(){
  console.log("running");
  // sets the the times for midinght of the next day and and midnight of the day after
  var tomorrow  = new Date(new Date().setDate(new Date().getDate()+1));
  var nextDay  = new Date(new Date().setDate(new Date().getDate()+2));
  tomorrow.setHours(0,0,0,0);
  nextDay.setHours(0,0,0,0);


    // queries the server for apponitments between tomorrow and the next day for reminders
    appointment.find({ "startsAt":{ $gte: tomorrow , $lt: nextDay} }, function(err,theAppointment){
      if(err){
        console.log(err);
      }
      console.log(theAppointment);
      theAppointment.forEach(function(element){
        //console.log(element.startTime +" Awesome!" );
        //TODO: fix up mail sender
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
         from: 'Dress for Success Twin Cities <dfstc016@gmail.com>',
       });

       var message = {
         // Comma separated list of recipients
       to: '"'+volunteer.firstName +'" <zerofox16@gmail.com>',

       // Subject of the message
       subject: 'Image Coaching Reminder ✔', //

       // HTML body
       html:'<p>' +
       'Dear '+volunteer.firstName+';' +
       '</p>' +
       '<p>' +
       '  Thank you for volunteering for an Image Coaching shift this week.' +
       '</p>' +
       '<p>' +
       '  Below are the details for your appointment:' +
       '</p>' +
       '<p>' +
       '  Date: '+moment(apmt.startsAt).format("dddd, MMMM Do YYYY")+//(apmt.startsAt.getMonth()+1)+'/'+apmt.startsAt.getUTCDate()+'/'+apmt.startsAt.getUTCFullYear()+
       '</p>' +
       '<p>' +
       '  Start time: '+moment(apmt.startsAt).format('h:mm a')+//apmt.startsAt)+
       '</p>' +
       '<p>' +
       '  Please arrive 10-15 minutes prior to your appointment time. Put your best' +
       '  foot forward and be sure to dress professional and in comfortable foot' +
       '  wear.' +
       '</p>' +
       '<p>' +
       '  We are located at 1549 University Avenue W., St. Paul, MN 5104' +
       '</p>' +
       '<p>' +
       '  Our parking lot is located directly behind the building. You can park in' +
       '  any of the spots labeled "Dress for Success" or "Ashton Building" and enter' +
       '  our offices through the orange door furthest to the left, labeled Dress for' +
       '  Success.' +
       '</p>' +
       '<p>' +
       '  If you are running late, lost or unable to make your appointment due to an' +
       '  emergency please call us at 651-646-6000.' +
       '</p>' +
       '<p>' +
       '  Thank you for being part of our mission to empower low-income women to' +
       '  achieve economic independence. You are helping to make a difference in Twin' +
       '  Cities women\'s lives. Since opening our doors in 2010, Dress for Success' +
       '  Twin Cities has worked with over 3,500 women.' +
       '</p>' +
       '<p>' +
       '  To sign for more Volunteer Opportunities Click here or visit our website' +
       '  for more information.' +
       '  <link>' +
       '</p>'


       };

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
