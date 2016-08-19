angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, UserService) {
  var vm = this;

  vm.openProfile = openProfile;

  console.log('hello?');
  function openProfile() {
    console.log('CLIQUE!!');
  }

} //end DashboardController
