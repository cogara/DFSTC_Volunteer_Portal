angular.module('DfstcSchedulingApp').controller('SuperAdminController', SuperAdminController).controller('RegisterUserController', RegisterUserController);

function SuperAdminController($http, $uibModal, AdminService, UserService, users) {
  var vm = this;
  vm.users = users;
  console.log(vm.users);

  vm.addAdmin = addAdmin;
  vm.deleteUser = deleteUser;
  vm.addAdminToggle = addAdminToggle;
  vm.toggleButtonText = 'Add Admin';
  vm.openRegisterClient = openRegisterClient;
  vm.openRegisterCaseWorker = openRegisterCaseWorker;

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

  function openRegisterClient() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'registerClient.html',
      controller: 'RegisterUserController',
      controllerAs: 'rc',
      size: 'lg'
    });

    modalInstance.result.then(function (client) {
      //do function to register client
      console.log('register client', client);
      registerClient(client);
    });
  };

  function openRegisterCaseWorker() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'registerCaseWorker.html',
      controller: 'RegisterUserController',
      controllerAs: 'rc',
      size: 'lg'
    });

    modalInstance.result.then(function (caseWorker) {
      //do function to register caseWorker
      console.log('register caseworker', caseWorker);
      registerCaseWorker(caseWorker);
    });
  };

  function registerClient(client) {
    client.isClient = true;
    UserService.register(client).then(function(response) {
      AdminService.getAllUsers().then(function(response) {
        vm.users = response;
      });
    })
  }

  function registerCaseWorker(caseWorker) {
    caseWorker.isCaseWorker = true;
    UserService.register(caseWorker).then(function(response) {
      AdminService.getAllUsers().then(function(response) {
        vm.users = response;
      });
    })
  }
}

function RegisterUserController($uibModalInstance) {
  var vm = this;

  vm.register = register;
  vm.cancel = cancel;

  function register(user) {
    $uibModalInstance.close(user);
  }

  function cancel() {
    $uibModalInstance.dismiss();
  }
}
