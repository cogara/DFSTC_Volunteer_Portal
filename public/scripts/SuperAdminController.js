angular.module('DfstcSchedulingApp').controller('SuperAdminController', SuperAdminController);

function SuperAdminController($http, AdminService, users) {
  var vm = this;
  vm.users = users;

  vm.addAdmin = addAdmin;
  vm.deleteUser = deleteUser;
  vm.addAdminToggle = addAdminToggle;
  vm.toggleButtonText = 'Add Admin'

  function addAdminToggle() {
    vm.adminToggle = (vm.adminToggle) ? false : true;
    vm.toggleButtonText = (vm.adminToggle) ? 'Cancel' : 'Add Admin';
  }

  function addAdmin(admin) {
    vm.adminToggle = false;
    AdminService.addAdmin(admin).then(function(response) {
      AdminService.getAllUsers().then(function(response) {
        vm.users = response;
      });
      vm.newAdmin = {};
    });
  }

  function deleteUser(id) {
    AdminService.deleteUser(id);
    for (var i = 0; i < users.length; i++) {
      if (users[i]._id === id) {
        console.log('id matches', users[i]);
        vm.users.splice(i, 1);
      }
    }
    console.log(id);
  }

}
