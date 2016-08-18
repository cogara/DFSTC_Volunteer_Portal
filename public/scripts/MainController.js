angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http, $state, UserService) {
  let vm = this;
  vm.login = login;
  vm.register = register;
  vm.logout = logout;

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
      $state.go('dashboard');
    }, function(){
      vm.user = null;
    });
  }

  function logout() {
    UserService.logout().then(function(response) {
      vm.user = null;
      $state.go('/');
    })
  }

  //checks if user is currently logged in on page load
  UserService.checkLoggedIn().then(function(response) {
    console.log(response);
    vm.user = response;
    if(vm.user) {
      $state.go('dashboard.nested');
    }
  });

} //end Main Controller
