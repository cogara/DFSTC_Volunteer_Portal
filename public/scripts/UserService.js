angular.module('DfstcSchedulingApp').factory('UserService', UserService);

function UserService($http) {

  function checkAuth() {
    return $http.get('/api/checkAuth').then(function(response) {
      if(response.data._id) {
        return response.data;
      }
    })
  }

  function register(user) {
    return $http.post('/register', user);
  }

  function login(user) {
    return $http.post('/login', user).then(function(response) {
      console.log('UserService', response.data);
      return response.data;
    })
  }

  return {
    checkAuth: checkAuth,
    register: register,
    login: login
  }

}// end UserService
