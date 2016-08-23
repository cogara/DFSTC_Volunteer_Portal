angular.module('DfstcSchedulingApp').factory('AdminService', AdminService);

function AdminService($http) {

  function getVolunteers() {
    return $http.get('/api/volunteers').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  return {
    getVolunteers: getVolunteers
  }

}// end AdminService
