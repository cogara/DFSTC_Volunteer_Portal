const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');

router.post('/', function(request, response) {
  console.log('request body', request.body);
  var info = request.body;
  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
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
