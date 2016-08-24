const router = require('express').Router();
const path = require('path');
const User = require('../models/user.js');
const fs = require('fs');


var makeUserDir = function(username){
  fs.mkdir('./userImages/'+username, function(err){
    if (err) {
      console.log(err);
    }
    console.log('User directory created!');
  });
};

router.post('/', function(request, response) {
  var info = request.body;
  var photoBody = info.photo.replace(/^data:image\/jpeg;base64,/,"");
  var imageBuffer = new Buffer(photoBody, 'base64');
  var filePath = "./userImages/" +info.email+"/"+info.firstName + ".png";
  fs.writeFile(filePath, imageBuffer, function(err){
    if(err){
      console.log(err);
    }
    console.log('The file was saved!');

  });
  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
      var user = new User(info);
      user.save(function(err) {
        if(err) {
          console.log(err);
        }
        makeUserDir();
        response.send({message: 'User Created'});
      })
    }
  })
})

module.exports = router;
