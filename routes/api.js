const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');
const mongoose = require('mongoose');
const Appointment = require('../models/appointment');
const Announcement = require('../models/announcement');



router.get('/checkLoggedIn', function(request, response) {
  if (request.isAuthenticated()) {
    response.send(request.user);
    return;
  }
  response.sendStatus(200);
})

router.get('/volunteers', function(request, response) {
  User.find({$or: [{isVolunteer: true}, {isTrainee: true}]}, function(err, volunteers) {
    if(err) {
      console.log(err);
      return false
    }
    for (var i = 0; i < volunteers.length; i++) {
      volunteers[i].password = null;
    }
    response.send(volunteers);
  })
})

router.put('/volunteer/:id', function(request, response) {
  var volunteer = request.body;
  var editVolunteer = {};
  if(request.query.changepass) {
    User.findOne({_id: request.params.id}, function(err, user) {
      if(err) {
        console.log(err);
        response.sendStatus(500);
      } else {
        user.passwordCheck(volunteer.oldPassword, function(err, isMatch) {
          if(err) {
            console.log(err);
            response.sendStatus(500);
          } else if(!isMatch) {
            response.sendStatus(503);
          } else if(isMatch) {
            user.changePassword(volunteer.newPassword, function(err, hash) {
              if(err) {
                console.log('hash error');
                response.sendStatus(500);
              } else {
                User.findByIdAndUpdate({_id: request.params.id}, {$set: {'password': hash}}, function(err, user) {
                  if(err) {
                    response.sendStatus(500);
                  } else {
                    response.sendStatus(200);
                  }
                })
              }
            })
          }
        })
      }
    })
  } else {

    for (var key in volunteer) {
      if (!(key==='password')) {
        editVolunteer[key] = volunteer[key];
      }
    }

    User.findByIdAndUpdate({_id: request.params.id}, {$set: editVolunteer}, function(err, volunteer) {
      if(err){
        console.log(err);
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }
    });
  }
});

router.get('/volunteer/:id', function(request, response) {
  User.findById(request.params.id, function(err, volunteer) {
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else {
      volunteer.password = null;
      response.send(volunteer);
    }
  })
})

router.post('/appointment', function(request, response){
  console.log(request.body);
  Appointment.create(request.body, function(err){
    if(err){
      console.log(err);
      response.sendStatus(500);
    }else{
      response.sendStatus(200);
    }
  });
});

router.get('/appointment/:id', function(request, response){
  console.log('one appointment get');
  Appointment.findById(request.params.id, function(err, appointment){
    if(err){
      response.sendStatus(500);
    }else{
      response.send(appointment)
    }
  });
});

router.get('/appointment', function(request, response){
  console.log('appointment get');
  if(request.user.isAdmin){
    Appointment.find(function(err, appointments){
      if(err){
        console.log(err);
        response.sendStatus(500);
      }else{
        response.send(appointments);
      }
    })
  }else{
    Appointment.find({trainingAppointment: request.user.isTrainee}, function(err, appointments){
      if(err){
        console.log(err);
        response.sendStatus(500);
      }else{
        response.send(appointments);
      }
    });
  }
});

router.delete('/appointment/:id', function(request, response){
  console.log('appointment delete');
  Appointment.findByIdAndRemove(request.params.id, function(err, appointment){
    if(err){
      response.sendStatus(500);
    }else{
      response.sendStatus(200)
    }
  });
});

router.put('/appointment/:id', function(request, response){
  console.log('appointment update');
  Appointment.findByIdAndUpdate({_id: request.params.id}, {$set: request.body}, function(err, appointment){
    if(err){
      response.sendStatus(500);
    }else{
      response.sendStatus(200);
    }
  });
});

// announcements stuff
//TODO:
router.get('/announcement',function(req, res){
  console.log(req.body);
  Announcement.find({}, function(err,announcement){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.send(announcement);
    }
  });
});

router.post('/announcement', function(req,res){
  console.log(req.body);
  Announcement.update(req.body, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    }else{
      res.sendStatus(200);
    }
  });
});

module.exports = router;
