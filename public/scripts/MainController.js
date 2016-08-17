angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http) {
  let vm = this;
  vm.login = login;
  vm.register = register;

  function register() {
    let data = {};
    data.email = vm.regEmail;
    data.password = vm.regPassword;
    $http.post('/register', data).then(function(response) {
      console.log(response.data);
    })
  }
  function login() {
    let data = {};
    data.email = vm.email;
    data.password = vm.password;
    $http.post('/login', data).then(function(response) {
      console.log(response.data);
    })
  }
}
