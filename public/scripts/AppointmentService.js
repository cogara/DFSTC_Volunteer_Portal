angular.module('DfstcSchedulingApp').factory('AppointmentService', AppointmentService);

function AppointmentService($http, calendarConfig, moment){

  var appointments = {};
  var updateEvent = {};
  var myAppointments = {};
  myAppointments.scheduled = [];
  var highPriority = [];

  function addAppointment(appointment){
    console.log(appointment);
    return $http.post('/api/appointment', appointment).then(function(response){
      console.log('save appointment success', response.data);
      return response.data;
    }, function(response){
      console.log('save appointment fail', response.data);
      return response.data;
    })
  }

  function getAppointments(user){
    return $http.get('/api/appointment').then(function(response){
      console.log('get appointments success', response.data);
      for (var h = 0; h < response.data.length; h++) {
        response.data[h].startsAt = new Date(response.data[h].startsAt);
        response.data[h].endsAt = new Date(response.data[h].endsAt);
      }

      for (var g = 0; g < response.data.length; g++){
        if (response.data[g].clients > response.data[g].volunteers.length){
          response.data[g].color = calendarConfig.colorTypes.important;
          highPriority.push(response.data[g]);
        }
      }

      if (!user.isAdmin){

        // for (var j = 0; j < response.data.length; j++){
        //   if (response.data[j].volunteers.length == response.data[j].volunteerSlots){
        //     for (var k = response.data[j].volunteers.length-1; k >= 0; k--){
        //       if (response.data[j].volunteers[k]._id == user._id){
        //
        for (var i = response.data.length-1; i >= 0; i--){
          if (response.data[i].volunteers.length == response.data[i].volunteerSlots){
            response.data.splice(i, 1);
          }
        }
        for (var j = 0; j < response.data.length; j++){
          if (response.data[j].volunteers.length == 0 && response.data[j].clients == 0){
            response.data[j].color = calendarConfig.colorTypes.warning;
          } else if (response.data[j].volunteers.length > 0){
            for (var k = response.data[j].volunteers.length-1; k >= 0; k--){
              if (response.data[j].volunteers[k]._id == user._id){
                response.data[j].color = calendarConfig.colorTypes.info;
                myAppointments.scheduled.push(response.data[j]);
                if(response.data[j].clients > response.data[j].volunteers.length){
                  highPriority.splice(j, 1);
                }
              }else if (response.data[j].volunteers.length >= response.data[j].clients){
                response.data[j].color = calendarConfig.colorTypes.warning;
              }
            }
          }
        }
        console.log('response.data', response.data);
        console.log('appointment service', myAppointments.scheduled);
        console.log('high', highPriority);
      }

      appointments.appointments = response.data;
      // for (var i = 0; i < response.data.length; i++) {
      //   response.data[i].startsAt = new Date(response.data[i].startsAt);
      //   response.data[i].endsAt = new Date(response.data[i].endsAt);
        // response.data[i].color = calendarConfig.colorTypes.info;
        // response.data[i].incrementsBadgeTotal = false;
        // for (var i = 0; i<AppointmentService.appointments.length; i++){
        //   console.log('Checking appointments in controller!');
        //   for (var j = 0; j<AppointmentService.appointments[i].volunteers.length; j++){
        //   if(AppointmentService.apppointments[i].volunteers[j]._id == UserService.checkLoggedIn._id){
        //     AppointmentService.appointments[i].color = calendarConfig.colorTypes.info;
        //   } else {
        //     AppointmentService.appointments[i].color = calendarConfig.colorTypes.warn;
        //   }
        //   }
        // }
      // }
      return response.data;
    }, function(response){
      console.log('get appointments fail', response.data);
    })
  }

function deleteAppointment(appointmentId){
  $http.delete('/api/appointment/' + appointmentId).then(function(response){
    console.log('delete appointment success', response.data);
  }, function(response){
    console.log('delete appointment fail', response.data);
  })
}

function updateAppointment(appointmentId, appointmentUpdate){
  $http.put('/api/appointment/' + appointmentId, appointmentUpdate).then(function(response){
    console.log('update appointment success', response.data);
  }, function(response){
    console.log('update appointment fail', response.data);
  })
}

  return {
    addAppointment: addAppointment,
    getAppointments: getAppointments,
    appointments: appointments,
    deleteAppointment: deleteAppointment,
    updateAppointment: updateAppointment,
    updateEvent: updateEvent,
    myAppointments: myAppointments,
    highPriority: highPriority
  }

} //end AppointmentService
