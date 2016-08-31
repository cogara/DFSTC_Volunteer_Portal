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

  function deleteUser(id) {
    $http.delete('/api/users/' + id);
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
    deleteUser: deleteUser,
    addAdmin: addAdmin
  }

}// end AdminService
