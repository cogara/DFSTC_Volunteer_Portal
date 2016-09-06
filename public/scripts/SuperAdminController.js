angular
  .module('DfstcSchedulingApp')
  .controller('SuperAdminController', SuperAdminController)
  .controller('RegisterUserController', RegisterUserController)
  .controller('RemoveUserModalController', RemoveUserModalController);

function SuperAdminController($http, $uibModal, AdminService, UserService, users) {
  var vm = this;
  vm.users = users;

  vm.addAdmin = addAdmin;
  // vm.deleteUser = deleteUser;
  vm.addAdminToggle = addAdminToggle;
  vm.toggleButtonText = 'Add Admin';
  vm.openRegisterClient = openRegisterClient;
  vm.openRegisterCaseWorker = openRegisterCaseWorker;
  vm.openDeleteUser = openDeleteUser;

  

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

  function openRegisterClient() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'registerClient.html',
      controller: 'RegisterUserController',
      controllerAs: 'rc',
      size: 'lg',
      resolve: {
        caseWorkers: function() {
          var caseWorkerList = [];
          for (var i = 0; i < vm.users.length; i++) {
            if(vm.users[i].isCaseWorker) {
              caseWorkerList.push(vm.users[i]);
            }
          }
          return caseWorkerList;
        }
      }
    });

    modalInstance.result.then(function (data) {
      //do function to register client
      console.log(data);
      // console.log('register client case', data);
      // console.log('register client', client);
      registerClient(data.user, data.caseWorker);
    });
  };

  function openRegisterCaseWorker() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'registerCaseWorker.html',
      controller: 'RegisterUserController',
      controllerAs: 'rc',
      size: 'lg',
      resolve: {
        caseWorkers: function() {
          var caseWorkerList = [];
          for (var i = 0; i < vm.users.length; i++) {
            if(vm.users[i].isCaseWorker) {
              caseWorkerList.push(vm.users[i]);
            }
          }
          return caseWorkerList;
        }
      }
    });

    modalInstance.result.then(function (data) {
      registerCaseWorker(data.user);
    });
  };

  function registerClient(client, caseWorker) {
    client.isClient = true;
    client.caseWorker = caseWorker.fullName;
    console.log(caseWorker);
    console.log(client);
    // UserService.assignClient(client, caseWorker);
    UserService.register(client).then(function(response) {
      AdminService.getAllUsers().then(function(response) {
        vm.users = response;
        for (var i = 0; i < vm.users.length; i++) {
          if(vm.users[i].email === client.email) {
            console.log('found matching client');
            UserService.assignClient(vm.users[i], caseWorker);
          }
        }
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
  function openDeleteUser(user) {
    vm.preventProfile=true;
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'confirmDeleteUser.html',
      size: 'md',
      controller: 'RemoveUserModalController',
      controllerAs: 'rm',
      resolve: {
        user: function() {
          return user;
        }
      }
    })

    modalInstance.result.then(function(user) {
      console.log('deleting', user);
      deleteUser(user._id);
    })
  }

  function deleteUser(id) {
    AdminService.deleteUser(id);
    for (var i = 0; i < vm.users.length; i++) {
      if (vm.users[i]._id === id) {
        console.log('id matches', users[i]);
        vm.users.splice(i, 1);
      }
    }
    console.log(id);
  }




}

function RegisterUserController($uibModalInstance, caseWorkers) {
  var vm = this;
  vm.caseWorkers = caseWorkers;
  console.log(vm.caseWorkers);
  vm.register = register;
  vm.cancel = cancel;

  function register(user, caseWorker) {
    console.log(caseWorker);
    var data = {};
    data.user = user;
    data.caseWorker = caseWorker;
    $uibModalInstance.close(data);
  }

  function cancel() {
    $uibModalInstance.dismiss();
  }

} //end register user controller

function RemoveUserModalController($uibModalInstance, user) {
  var vm = this;
  vm.user = user;
  console.log(vm.user);
  vm.save = save;
  vm.dismiss = dismiss;

  function save() {
    $uibModalInstance.close(user);
  }

  function dismiss() {
    $uibModalInstance.dismiss();
  }
}
