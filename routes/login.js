const router = require('express').Router();
const path = require('path');
const passport = require('passport');

router.post('/', passport.authenticate('local', {
    successRedirect: 'login/success',
    failureRedirect: 'login/failure'
  })
);

router.get('/success', function(request, response) {
  console.log('~' + request.user.email + '~', 'logged in at', new Date());
  response.send(request.user);
})

router.get('/failure', function(request, response) {
  console.log('login failed');
  request.logout();
  response.sendStatus(403);
})

module.exports = router;
