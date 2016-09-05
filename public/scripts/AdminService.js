angular.module('DfstcSchedulingApp').factory('AdminService', AdminService);

function AdminService($http) {

  function getVolunteers() {
    return $http.get('/api/volunteers').then(function(response) {
      return response.data;
    })
  }

  function getAllUsers() {
    return $http.get('/api/users').then(function(response) {
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

  function getAppointments() {
    return $http.get('/api/appointment').then(function(response) {
      var appointments = response.data;
      for (var i = 0; i < appointments.length; i++) {
        if(!appointments[i].clients) {
          appointments[i].clients = 0;
        }
      }
      return appointments;
    });
  }

  return {
    getVolunteers: getVolunteers,
    getAllUsers: getAllUsers,
    deleteUser: deleteUser,
    getAppointments: getAppointments,
    addAdmin: addAdmin
  }

}// end AdminService
