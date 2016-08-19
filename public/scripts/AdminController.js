angular.module('DfstcSchedulingApp').controller('AdminController', AdminController);

function AdminController($http, $state, UserService, AdminService, volunteerList) {
  var vm = this;
  vm.volunteers = volunteerList;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;


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


} //end Admin Controller
