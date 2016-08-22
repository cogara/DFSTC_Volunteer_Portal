angular.module('DfstcSchedulingApp').factory('AppointmentService', AppointmentService);

function AppointmentService($http){

  function addAppointment(appointment){
    console.log(appointment);
    return $http.post('/api/appointment', appointment).then(function(response){
      console.log('AppointmentService success', response.data);
      return response.data;
    }, function(response){
      console.log('AppointmentService fail', response.data);
      return response.data;
    })
  }

  return {
    addAppointment: addAppointment
  }

} //end AppointmentService
