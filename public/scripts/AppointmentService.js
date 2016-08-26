angular.module('DfstcSchedulingApp').factory('AppointmentService', AppointmentService);

function AppointmentService($http){

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

  function getAppointments(user){
    return $http.get('/api/appointment').then(function(response){
      console.log('get appointments success', response.data);

      if (!user.isAdmin){
        for (var i = response.data.length-1; i >= 0; i--){
          if (response.data[i].volunteers.length == response.data[i].volunteerSlots){
            response.data.splice(i, 1);
          }
        }

        for (var j = 0; j < response.data.length; j++){
          for (var k = response.data[j].volunteers.length-1; k >= 0; k--){
            if (response.data[j].volunteers[k]._id == user._id){
              response.data.splice(j, 1);
            }
          }
        }
      }

      appointments.appointments = response.data;
      for (var i = 0; i < response.data.length; i++) {
        response.data[i].startsAt = new Date(response.data[i].startsAt);
        response.data[i].endsAt = new Date(response.data[i].endsAt);
      }
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
    updateEvent: updateEvent
  }

} //end AppointmentService
