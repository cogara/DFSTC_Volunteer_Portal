angular.module('DfstcSchedulingApp').controller('AdminController', AdminController);

function AdminController($http, $state, UserService, AdminService, volunteerList) {
  var vm = this;
  vm.volunteers = volunteerList;
  vm.getVolunteers = getVolunteers;
  vm.editVolunteer = editVolunteer;
  vm.viewVolunteer = viewVolunteer;
  vm.saveEdit = saveEdit;
  vm.selectAll = selectAll;

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



} //end Admin Controller
