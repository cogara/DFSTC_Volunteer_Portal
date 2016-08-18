var router = require('express').Router();
var Appointment = require('../models/appointment');


router.post('/', function(request, response){
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

module.exports = router;
