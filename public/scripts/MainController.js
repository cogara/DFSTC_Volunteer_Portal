angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController() {
  let vm = this;

  vm.login = login;

  function login() {
    let data = {};
    data.userName = vm.userName;
    data.password = vm.password;
    console.log(data);
  }

}
