const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');
const fs = require('fs');
const multer = require('multer');

// var photo = request.body.photo;

var storage  = multer.diskStorage({
  destination: function(request, file, cb){
    cb(null, './userImages')
  },
  filename: function(req, file, cb) {
    console.log('Date Now', Date.now());
    console.log('Date Now', Date.now());
    console.log('Date Now', Date.now());
    cb(null, Date.now().toString() + '.jpg')
  }
});

var upload = multer({
  storage:storage
}).single('photo');

router.post('/', upload, function(request, response) {
  var info = request.body;
  for (var day in info.isAvail) {
    for (var time in info.isAvail[day]) {
      info.isAvail[day][time] = (info.isAvail[day][time] === 'true');
    }
  }
  for (var opportunity in info.volunteerOpportunities) {
    info.volunteerOpportunities[opportunity] = (info.volunteerOpportunities[opportunity] === 'true');
  }
  console.log('info:', info);

  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
      info.photo = (request.file) ? request.file.filename : null;
      console.log(info);
      var user = new User(info);
      console.log('creating user', user);
      user.save(function(err) {
        if(err) {
          console.log(err);
        }
        response.send({message: 'User Created'});
      })
    }
  })
})

module.exports = router;
