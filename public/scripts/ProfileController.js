angular.module('DfstcSchedulingApp').controller('ProfileController', ProfileController);

function ProfileController($http, $state, $modalInstance, UserService, profile) {
  var vm = this;

  vm.cancel = cancel;
  vm.saveProfile = saveProfile;
  vm.editMode = editMode;
  vm.profile = profile;
  console.log(profile);

  function editMode() {
    if (vm.editingProfile) {
      vm.editingProfile = false;
    } else {
      vm.editingProfile = true;
    }
  }


  function saveProfile(profile) {
    //send new profile info to dashboard controller
    console.log('clicked saved');
    $modalInstance.close(profile);
  }

  function cancel() {
    console.log('close plz');
    $modalInstance.dismiss();
  }

  //closes all other modals when opening modal
  $modalInstance.dismiss();


} //end ProfileController
