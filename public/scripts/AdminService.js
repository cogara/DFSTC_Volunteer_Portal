angular.module('DfstcSchedulingApp').factory('AdminService', AdminService);

function AdminService($http) {

  function getVolunteers() {
    return $http.get('/api/volunteers').then(function(response) {
      console.log(response.data);
      return response.data;
    })
  }

  function getAllUsers() {
    return $http.get('/api/users').then(function(response) {
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
    getAllUsers: getAllUsers,
    addAdmin: addAdmin
  }

}// end AdminService
