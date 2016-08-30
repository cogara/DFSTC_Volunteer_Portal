angular.module('DfstcSchedulingApp').factory('AdminService', AdminService);

function AdminService($http) {

  function getVolunteers() {
    return $http.get('/api/volunteers').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  function addAdmin(admin) {
    var data = admin;
    data.isAdmin = true;
    data.isTrainee = false;
    return $http.post('/register', data)
  }

  return {
    getVolunteers: getVolunteers,
    addAdmin: addAdmin
  }

}// end AdminService
