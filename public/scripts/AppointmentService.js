angular.module('DfstcSchedulingApp').factory('AppointmentService', AppointmentService);

function AppointmentService($http, calendarConfig, moment){

  var appointments = {};
  var updateEvent = {};

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

  function getAppointments(){
    return $http.get('/api/appointment').then(function(response){
      console.log('get appointments success', response.data);
      appointments.appointments = response.data;
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].startsAt = new Date(response.data[i].startsAt);
        response.data[i].endsAt = new Date(response.data[i].endsAt);
        // response.data[i].color = calendarConfig.colorTypes.info;
        // response.data[i].incrementsBadgeTotal = false;
        for (var i = 0; i<AppointmentService.appointments.length; i++){
          console.log('Checking appointments in controller!');
          for (var j = 0; j<AppointmentService.appointments[i].volunteers.length; j++){
          if(AppointmentService.apppointments[i].volunteers[j]._id == UserService.checkLoggedIn._id){
            AppointmentService.appointments[i].color = calendarConfig.colorTypes.info;
          } else {
            AppointmentService.appointments[i].color = calendarConfig.colorTypes.warn;
          }
          }
        }
      }
      return response.data;
    }, function(response){
      console.log('get appointments fail', response.data);
    })
  }

  function getAppointment(id){
    return $http.get('/api/appointment/' + id).then(function(response){
      console.log('get appointment success', response.data);
      appointments.appointments = response.data;
      return response.data;
    }, function(response){
      console.log('get appointment fail', response.data);
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
    getAppointment: getAppointment,
    updateEvent: updateEvent
  }

} //end AppointmentService
