const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');
const fs = require('fs');
const multer = require('multer');

// var photo = request.body.photo;

// var storage  = multer.diskStorage({
//   destination: function(request, file, cb){
//     cb(null, './userImages')
//   }
// });

var upload = multer({
  // storage:storage,
  dest: './userImages'
}).single('photo');

router.post('/', upload, function(request, response) {
  var info = request.body;

  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
      info.photo = request.file.filename

      console.log(info)

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
