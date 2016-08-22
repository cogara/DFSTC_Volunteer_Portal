angular.module('DfstcSchedulingApp').controller('ProfileController', ProfileController);

function ProfileController($http, $state, $uibModalInstance, UserService, profile) {
  var vm = this;

  vm.cancel = cancel;
  vm.saveProfile = saveProfile;
  vm.editProfile = editProfile;
  vm.profile = profile;
  console.log(profile);

  function saveProfile(profile) {
    //send new profile info to dashboard controller
    console.log('clicked saved');
    $uibModalInstance.close(profile);
  }

  function cancel() {
    console.log('close plz');
    $uibModalInstance.dismiss();
  }

  $uibModalInstance.dismiss();

  function editProfile() {
    if(vm.isEditing){
      vm.isEditing = false;
    } else {
      vm.isEditing = true;
    }
  }


} //end ProfileController
