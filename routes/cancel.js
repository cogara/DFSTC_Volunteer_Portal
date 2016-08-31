var router =  require('express').Router();
var nodemailer = require('nodemailer');
const moment = require('moment');

var user = require('../models/user');
var appointment = require('../models/appointment');






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
       html:"THEY Canceled Panic!"


       };

       transporter.sendMail(message, function(err, info){
         if (err) {
           console.log(err);
           return;
         }

       //console.log('Message sent successfully!');
       //console.log('Server responded with "%s"', info.response);


      });

    //console.log(name.select('firstName'));

    });
}

module.exports = router;
