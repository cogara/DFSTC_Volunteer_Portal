angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http, $state, UserService) {
  var vm = this;
  vm.login = login;
  vm.register = register;
  vm.logout = logout;

  function register() {
    UserService.register(vm.registerUser).then(function() {
      UserService.login(vm.registerUser).then(function(response) {
        vm.currentUser = response;
        $state.go('dashboard')
      })
    });
  }

  function login() {
    UserService.login(vm.loginUser).then(function(response) {
      vm.currentUser = response;
      $state.go('dashboard');
    }, function(){
      vm.currentUser = null;
    });
  }

  function logout() {
    UserService.logout().then(function(response) {
      vm.currentUser = null;
      $state.go('/');
    })
  }

  //checks if user is currently logged in on page load
  UserService.checkLoggedIn().then(function(response) {
    console.log(response);
    vm.currentUser = response;
    if(vm.currentUser) {
      $state.go('dashboard');
    }
  });

} //end Main Controller
