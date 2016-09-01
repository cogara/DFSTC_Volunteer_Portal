angular.module('DfstcSchedulingApp').factory('AppointmentService', AppointmentService);

function AppointmentService($http, calendarConfig, moment){

  var appointments = {};
  var updateEvent = {};
  var myAppointments = {};
  myAppointments.scheduled = [];
  var highPriority = [];

  function addAppointment(appointment){
    return $http.post('/api/appointment', appointment).then(function(response){
      return response.data;
    }, function(response){
      return response.data;
    })
  }

  function getAppointments(user) {
    return $http.get('/api/appointment').then(function(response) {
      for (var h = 0; h < response.data.length; h++) {
        response.data[h].startsAt = new Date(response.data[h].startsAt);
        response.data[h].endsAt = new Date(response.data[h].endsAt);
      }

      for (var g = 0; g < response.data.length; g++) {
        if(response.data[g].volunteers) {
          if (response.data[g].clients > response.data[g].volunteers.length) {
            response.data[g].color = calendarConfig.colorTypes.important;
            highPriority.push(response.data[g]);
          } else if (response.data[g].volunteers.length == response.data[g].volunteerSlots &&
             response.data[g].clientSlots == response.data[g].clients) {
            response.data[g].color = calendarConfig.colorTypes.success;
          } else {
            response.data[g].color = calendarConfig.colorTypes.warning;
          }
        } else {
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
          console.log(response.data[i].volunteers.length, response.data[i].volunteerSlots,
            (_.findWhere(response.data[i].volunteers, {_id: user._id})));

          if (response.data[i].volunteers.length == response.data[i].volunteerSlots &&
            !(_.findWhere(response.data[i].volunteers, {_id: user._id}))) {
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
      }

      appointments.appointments = response.data;
      return response.data;
    }, function(response){
    })
  }

function deleteAppointment(appointmentId){
  $http.delete('/api/appointment/' + appointmentId).then(function(response){
  }, function(response){
  })
}

function updateAppointment(appointmentId, appointmentUpdate){
  $http.put('/api/appointment/' + appointmentId, appointmentUpdate).then(function(response){
  }, function(response){
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
