angular.module('DfstcSchedulingApp').controller('ProfileController', ProfileController);

function ProfileController($http, $state, $uibModalInstance, UserService, profile) {
  var vm = this;

  vm.cancel = cancel;
  vm.saveProfile = saveProfile;
  vm.editProfile = editProfile;
  vm.removePrevCompany = removePrevCompany;
  vm.profile = profile;
  console.log(profile);
  vm.downloadPhoto = downloadPhoto;

  function downloadPhoto(photo) {
    console.log(photo);
    $http.get('/photo/'+photo).then(function(response) {
      console.log(response.data);
    })
  }


  function removePrevCompany(index) {
    vm.profile.pastCompanies.splice(index, 1);
  }

  function saveProfile(profile) {
    //checks if saved company equals original company, if so, remove tempCompany
    //and save as normal
    if(profile.company === profile.tempCompany) {
      console.log('company matches:', profile.compay, profile.tempCompany);
      for (var key in profile) {
        if(key !== 'tempCompany') {
          $uibModalInstance.close(profile);
        }
      }
    //if different company, push to pastCompanies array
    } else {
      var check = false;
      //checks if user has past companies initialized.
      if (profile.pastCompanies) {
        //check for duplicates on previous companies
        for (var i = 0; i < profile.pastCompanies.length; i++) {
          //if match, set the check to true that it already exists
          if(profile.tempCompany === profile.pastCompanies[i]) {
            check = true;
          }
        }
        //checks if new company matches any previous companies. if so,
        //remove current company from previousCompanies array
        for (var i = 0; i < profile.pastCompanies.length; i++) {
          if(profile.company === profile.pastCompanies[i]) {
            profile.pastCompanies.splice(i, 1);
          }
        }
        //if not a duplicate, push to pastCompanies array on company change
        if(!check) {
          profile.pastCompanies.push(profile.tempCompany);
        }
      //if not initalized, create empty array and push to array
      } else {
        profile.pastCompanies = [];
        profile.pastCompanies.push(profile.tempCompany);
      }
      //after tests, save new profile removing tempCompany key
      for (var key in profile) {
        if(key !== 'tempCompany') {
          $uibModalInstance.close(profile);
        }
      }
    }
  }

  function cancel() {
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
  vm.changePassword = changePassword;
  vm.changePassToggle = changePassToggle;
  function changePassToggle() {
    vm.passError = '';
    vm.passToggle = (vm.passToggle) ? false : true;
    console.log(vm.passToggle);
  }
  function changePassword(volunteer, oldPassword, newPassword, passConfirm) {
    if(!(oldPassword && newPassword && passConfirm)) {
      vm.passError = "Missing input, please try again";
      return false;
    }
    if((newPassword != passConfirm) && (newPassword.length > 0)) {
      vm.passError = 'New password does not match';
      return false;
    }
    console.log(volunteer, oldPassword, newPassword);
    UserService.changePassword(volunteer, oldPassword, newPassword).then(function(response) {
      console.log('password changed');
      changePassToggle();
    }, function() {
      vm.passError = 'Incorrect password, please try again';
    });
  }

} //end ProfileController
