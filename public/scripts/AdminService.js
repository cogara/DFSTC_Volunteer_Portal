angular.module('DfstcSchedulingApp').factory('AdminService', AdminService);

function AdminService($http) {

  function getVolunteers() {
    return $http.get('/api/volunteers').then(function(response) {
      return response.data;
    })
  }

  // function editVolunteer(volunteer) {
  //   var editVolunteer = {};
  //   for (var key in volunteer) {
  //     if (!(key==='password')) {
  //       console.log(key);
  //       editVolunteer[key] = volunteer[key];
  //     }
  //   }
  //   console.log(editVolunteer);
  //   return $http.put('/api/volunteer/' + volunteer._id, editVolunteer);
  // }

  return {
    getVolunteers: getVolunteers
    // editVolunteer: editVolunteer
  }

}// end AdminService
