angular.module('DfstcSchedulingApp').controller('AdminController', AdminController);

function AdminController($http, $state, $uibModal, UserService, AdminService, volunteerList) {
  var vm = this;
  vm.volunteers = volunteerList;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;
  vm.selectAll = selectAll;
  vm.openProfile = openProfile;

  // Setting search options
  vm.options = {};
  vm.options.all = false;
  vm.options.one = false;
  vm.options.two = false;
  vm.options.three = false;
  vm.options.four = false;
  vm.options.five = false;
  vm.options.six = false;
  vm.options.seven = false;
  vm.options.eight = false;


  function selectAll() {
    if (!vm.options.all) {
      for (var key in vm.options) {
        vm.options[key] = false;
      }
    } else {
      for (var key in vm.options) {
        vm.options[key] = true;
      }
    }
  }

  function getVolunteers() {
    AdminService.getVolunteers().then(function(response) {
      vm.volunteers = response;
    })
  }

  function viewVolunteer(volunteer) {
    console.log(volunteer);
    vm.editingVolunteer = volunteer;
  }

  function editVolunteer() {
    vm.isEditing = true;
  }

  function saveEdit() {
    console.log(vm.editingVolunteer);
    vm.isEditing = false;
    UserService.editProfile(vm.editingVolunteer).then(getVolunteers);
  }

  function openProfile(id) {
    console.log('sending id', id);

    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'adminProfileModal.html',
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
      return UserService.editProfile(profile).then(function() {
        console.log('promise?');
        getVolunteers();
      });

      console.log(profile);
    });
  };


} //end Admin Controller
