var router = require('express').Router();
var nodemailer = require('nodemailer');

var user = require('../models/user')

var mailReminder = function(){
  var name = "default";
  user.find({'firstName':'ddd'}, function(err, theName){
     name = theName[0].firstName

     var transporter = nodemailer.createTransport({
       service:'Gmail',
       auth:{
         user:'dfstc016@gmail.com',
         pass:'dressForSuccess'
       },
       logger:true,
       debug:false
     },{
       // default message
       from: 'Tess Hart <dogs>',
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
         '<p>Hello '+name+'</p> New message sent' +new Date()

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
