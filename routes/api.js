const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');
const mongoose = require('mongoose');

router.get('/checkLoggedIn', function(request, response) {
  if (request.isAuthenticated()) {
    response.send(request.user);
    return;
  }
  response.sendStatus(200);
})

router.get('/volunteers', function(request, response) {
  User.find({isAdmin: false}, function(err, volunteers) {
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
  console.log(request.params);

  User.findByIdAndUpdate({_id: request.params.id}, request.body, function(err, volunteer) {
    if(err){
      console.log(err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  });
});

module.exports = router;
