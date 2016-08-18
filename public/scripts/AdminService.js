angular.module('DfstcSchedulingApp').factory('AdminService', AdminService);

function AdminService($http) {

  function getVolunteers() {
    return $http.get('/api/volunteers').then(function(response) {
      console.log('Volunteer List:', response.data);
      return response.data;
    })
  }

  function editVolunteer(volunteer) {
    return $http.put('/api/volunteer/' + volunteer._id, volunteer);
  }

  return {
    getVolunteers: getVolunteers,
    editVolunteer: editVolunteer
  }

}// end AdminService
