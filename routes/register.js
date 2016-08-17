const router = require('express').Router();
const path = require('path');

router.post('/register', function(request, response) {
  let info = request.body;
  User.findOne({email: info.email}, function(err, exists) {
    if(exists) {
      response.send({message: 'Email Already Exists'});
    } else {
      console.log('no user exists');
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
