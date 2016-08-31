angular.module('DfstcSchedulingApp').factory('UserService', UserService);

function UserService($http, Upload) {

  function checkLoggedIn() {
    return $http.get('/api/checkLoggedIn').then(function(response) {
      if(response.data._id) {
        return response.data;
      }
    })
  }

  function register(user) {
    console.log(user);
    return Upload.upload({
      url: '/register',
      data: user
    })
  }

  function login(user) {
    console.log(user);
    return $http.post('/login', user).then(function(response) {
      console.log('UserService', response.data);
      return response.data;
    })
  }

  function getProfile(id) {
    return $http.get('/api/volunteer/' + id).then(function(response) {
      return response.data;
    });
  }

  function editProfile(volunteer) {
    console.log(volunteer);
    return $http.put('/api/volunteer/' + volunteer._id, volunteer);
  }

  function logout() {
    return $http.get('/logout');
  }

  function changePassword(volunteer, oldPassword, newPassword) {
    var data = {};
    data.oldPassword = oldPassword;
    data.newPassword = newPassword;
    return $http.put('/api/volunteer/' + volunteer._id + '?changepass=true', data)
  }

  return {
    checkLoggedIn: checkLoggedIn,
    register: register,
    login: login,
    logout: logout,
    getProfile: getProfile,
    changePassword: changePassword,
    editProfile: editProfile
  }

}// end UserService
