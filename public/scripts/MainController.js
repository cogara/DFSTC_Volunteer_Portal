angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http, UserService) {
  let vm = this;
  vm.login = login;
  vm.register = register;

  function register() {
    UserService.register(vm.registerUser).then(function() {
      UserService.login(vm.registerUser).then(function(response) {
        vm.user = response;
      })
    });
  }

  function login() {
    UserService.login(vm.loginUser).then(function(response) {
      vm.user = response;
    }, function(){
      vm.user = null;
    });
  }

  //checks if user is currently logged in on page load
  UserService.checkAuth().then(function(response) {
    // console.log(response);
    vm.user = response;
  });

} //end Main Controller
