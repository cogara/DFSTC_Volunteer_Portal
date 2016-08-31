angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http, $state, $window, $scope, UserService, Upload) {

  $scope.safeApply = function(fn) {
  var phase = this.$root.$$phase;
  if(phase == '$apply' || phase == '$digest')
    this.$eval(fn);
  else
    this.$apply(fn);
};

  var vm = this;
  vm.login = login;
  vm.register = register;
  vm.logout = logout;
  //temp for QOL testing
  vm.loginUser = {};
  vm.loginUser.email = 'test';
  vm.loginUser.password = 'test';

  function register() {
    UserService.register(vm.registerUser).then(function() {
      vm.registerUser = {};
      UserService.login(vm.registerUser).then(function(response) {
        vm.loginUser = {};
        vm.currentUser = response;
        $state.go('dashboard');
      });
    });
  }

  function login() {
    UserService.login(vm.loginUser).then(function(response) {
      vm.loginUser = {};
      vm.currentUser = response;
      $state.go('dashboard');
    }, function() {
      vm.currentUser = null;
    });
  }

  function register() {
    UserService.register(vm.registerUser).then(function() {
      UserService.login(vm.registerUser).then(function(response) {
        vm.currentUser = response;
        $state.go('dashboard');
      });
    });
  }

  function login() {
    UserService.login(vm.loginUser).then(function(response) {
      vm.currentUser = response;
      // UserService.currentUser.user = vm.currentUser;
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
      // UserService.currentUser.user = vm.currentUser;
    });


  } //end Main Controller
