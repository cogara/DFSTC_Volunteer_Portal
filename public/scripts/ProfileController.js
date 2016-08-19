angular.module('DfstcSchedulingApp').controller('ProfileController', ProfileController);

function ProfileController($http, $state, $modalInstance, UserService, profile) {
  var vm = this;

  vm.cancel = cancel;
  vm.saveProfile = saveProfile;
  vm.editProfile = editProfile;
  vm.profile = profile;
  vm.isEditing = false;
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

  function editProfile() {
    vm.isEditing = true;
  }


} //end ProfileController
