angular.module('DfstcSchedulingApp').controller('ProfileController', ProfileController);

function ProfileController($http, $state, $modalInstance, UserService, profile) {
  var vm = this;

  vm.cancel = cancel;
  vm.saveProfile = saveProfile;
  vm.profile = profile;
  console.log(profile);

  function saveProfile(profile) {
    //send new profile info to dashboard controller
    console.log('clicked saved');
    $modalInstance.close(profile);
  }

  function cancel() {
    console.log('close plz');
    $modalInstance.dismiss();
  }


} //end ProfileController
