angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http, $state, $window, $scope, $uibModal, UserService, Upload) {


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

  vm.menuToggle = false;
  vm.toggleMenu = toggleMenu;
  function toggleMenu() {
    vm.menuToggle ? vm.menuToggle = false : vm.menuToggle =  true;
  }

  vm.openProfile = openProfile;

  function openProfile(id) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'profileModal.html',
      controller: 'ProfileController',
      controllerAs: 'prof',
      size: 'lg',
      resolve: {
        profile: function (UserService) {
          return UserService.getProfile(id).then(function(response){
            response.tempCompany = response.company;
            return response;
          });
        }
      }
    });

    modalInstance.result.then(function (profile) {
      //do function to save new profile info
      return UserService.editProfile(profile).then(function() {
        console.log('promise?');
        window.location.reload();
      });

      console.log(profile);
    });
  };

  function register() {
    vm.registerUser.isTrainee = true;
    UserService.register(vm.registerUser).then(function() {
      UserService.login(vm.registerUser).then(function(response) {
        vm.registerUser = {};
        vm.loginUser = {};
        vm.currentUser = response;
        $state.go('dashboard');
      });
    });
  }

  function logout() {
    UserService.logout().then(function(response) {
      vm.currentUser = null;
      $state.go('index');
    })
  }

  function login() {
    UserService.login(vm.loginUser).then(function(response) {
      vm.loginUser = {};
      vm.currentUser = response;
      UserService.currentUser.user = vm.currentUser;
      $state.go('dashboard');
    }, function(){
        vm.currentUser = null;
      });
    }

  function logout() {
    UserService.logout().then(function(response) {
      vm.currentUser = null;
      $state.go('index');
    })
  }

  //checks if user is currently logged in on page load
  UserService.checkLoggedIn().then(function(response) {
    console.log(response);
    vm.currentUser = response;
    UserService.currentUser.user = vm.currentUser;
  });

} //end Main Controller
