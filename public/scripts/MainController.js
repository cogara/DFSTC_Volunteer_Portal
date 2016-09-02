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
      $state.go('/');
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
      $state.go('/');
    })
  }

  //checks if user is currently logged in on page load
  UserService.checkLoggedIn().then(function(response) {
    console.log(response);
    vm.currentUser = response;
    UserService.currentUser.user = vm.currentUser;
  });

  //QOL Demo Purposes;
vm.registerUser = {};
vm.registerUser.address = {};
vm.registerUser.address.addressOne = "3552 Main St";
vm.registerUser.address.city = "St. Paul";
vm.registerUser.address.state = "MN";
vm.registerUser.address.zip = "55109";
vm.registerUser.address.company = "Wells Fargo";
vm.registerUser.email = "marie.foster@gmail.com";
vm.registerUser.firstName = "Marie";
vm.registerUser.isAvail = {};
vm.registerUser.isAvail.monday = {};
vm.registerUser.isAvail.tuesday = {};
vm.registerUser.isAvail.wednesday = {};
vm.registerUser.isAvail.thursday = {};
vm.registerUser.isAvail.friday = {};
vm.registerUser.isAvail.saturday = {};
// vm.registerUser.isAvail.monday.morning = true;
// vm.registerUser.isAvail.monday.afternoon = false;
// vm.registerUser.isAvail.monday.evening = false;
// vm.registerUser.isAvail.tuesday.morning = true;
// vm.registerUser.isAvail.tuesday.afternoon = true;
// vm.registerUser.isAvail.tuesday.evening = true;
// vm.registerUser.isAvail.wednesday.morning = false;
// vm.registerUser.isAvail.wednesday.afternoon = false;
// vm.registerUser.isAvail.wednesday.evening = true;
// vm.registerUser.isAvail.thursday.morning = true;
// vm.registerUser.isAvail.thursday.afternoon = true;
// vm.registerUser.isAvail.thursday.evening = true;
// vm.registerUser.isAvail.friday.morning = true;
// vm.registerUser.isAvail.friday.afternoon = false;
// vm.registerUser.isAvail.friday.evening = false;
// vm.registerUser.isAvail.saturday.morning = false;
// vm.registerUser.isAvail.saturday.afternoon = false;
// vm.registerUser.isAvail.saturday.evening = false;
vm.registerUser.isTrainee = true;
vm.registerUser.jobTitle = "Bank Teller";
vm.registerUser.company = "Wells Fargo";
vm.registerUser.lastName = "Foster";
vm.registerUser.password = "marie";
vm.registerUser.phoneNumber = "5555342234";
vm.registerUser.volunteerOpportunities = {};
// vm.registerUser.volunteerOpportunities.careerAdvocate = true;
// vm.registerUser.volunteerOpportunities.imageCoach = true;

} //end Main Controller
