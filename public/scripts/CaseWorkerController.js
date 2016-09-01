angular.module('DfstcSchedulingApp').controller('CaseWorkerController', CaseWorkerController);

function CaseWorkerController($http, $uibModal, UserService, clients) {
  var vm = this;

  vm.clients = clients;
  console.log(vm.clients);
  vm.openRegisterClient = openRegisterClient;

  function openRegisterClient() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'registerClient.html',
      controller: 'RegisterUserController',
      controllerAs: 'rc',
      size: 'lg',
      resolve: {
        caseWorkers: function() {
          return null;
        }
      }
    });

    modalInstance.result.then(function (data) {
      //do function to register client
      console.log('register client', data.user);
      registerClient(data.user);
    });
  };

  function registerClient(client) {
    console.log(UserService.currentUser);
    client.caseWorker = UserService.currentUser.user.fullName;
    client.isClient = true;
    UserService.register(client).then(function(response) {
      UserService.caseWorkerClients().then(function(response) {
        console.log(response);
        vm.clients = response;
      });
    })
  }

} //end CaseWorkerController
