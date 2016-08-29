const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');

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

router.post('/', function(request, response) {
  var info = request.body;
  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
      var user = new User(info);
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
