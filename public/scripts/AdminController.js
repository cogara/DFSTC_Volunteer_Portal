angular.module('DfstcSchedulingApp').controller('AdminController', AdminController);

function AdminController($http, $state, UserService, AdminService) {
  var vm = this;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;


  function getVolunteers() {
    console.log('Button Click, get volunteers');
    AdminService.getVolunteers().then(function(response) {
      console.log('Admin Controller:', response);
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
    AdminService.editVolunteer(vm.editingVolunteer).then(getVolunteers);
  }


} //end Admin Controller
