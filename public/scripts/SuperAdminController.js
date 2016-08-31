angular.module('DfstcSchedulingApp').controller('SuperAdminController', SuperAdminController);

function SuperAdminController($http, AdminService, users) {
  var vm = this;
  vm.users = users;

  vm.addAdmin = addAdmin;
  vm.deleteUser = deleteUser;

  function addAdmin(admin) {
    AdminService.addAdmin(admin).then(function(response) {
      AdminService.getAllUsers().then(function(response) {
        vm.users = response;
      });
      vm.newAdmin = {};
    });
  }

  function deleteUser(id) {
    console.log(id);
  }

}
