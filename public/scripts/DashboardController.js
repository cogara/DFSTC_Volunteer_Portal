angular.module('DfstcSchedulingApp').controller('DashboardController', DashboardController);

function DashboardController($http, $state, $modal, UserService) {
  var vm = this;

  vm.openProfile = openProfile;

  console.log('hello?');
  function openProfile(id) {
    console.log('sending id', id);

    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'myModalContent.html',
      controller: 'ProfileController',
      controllerAs: 'prof',
      size: 'lg',
      resolve: {
        profile: function (UserService) {
          return UserService.getProfile(id).then(function(response){
            return response;
          });
        }
      }
    });

    modalInstance.result.then(function (profile) {
      //do function to save new profile info
      return UserService.editProfile(profile);
      console.log(profile);
    });
  };



} //end DashboardController
