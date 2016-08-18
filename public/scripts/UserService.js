angular.module('DfstcSchedulingApp').factory('UserService', UserService);

function UserService($http) {

  function checkLoggedIn() {
    return $http.get('/api/checkLoggedIn').then(function(response) {
      if(response.data._id) {
        return response.data;
      }
    })
  }

  function register(user) {
    return $http.post('/register', user);
  }

  function login(user) {
    console.log(user);
    return $http.post('/login', user).then(function(response) {
      console.log('UserService', response.data);
      return response.data;
    })
  }

  function logout() {
    return $http.get('/logout');
  }

  return {
    checkLoggedIn: checkLoggedIn,
    register: register,
    login: login,
    logout: logout
  }

}// end UserService
