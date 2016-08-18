const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');

router.post('/', function(request, response) {
  let info = request.body;
  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
      let user = new User(info);
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
