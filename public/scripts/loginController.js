angular.module('DfstcSchedulingApp').controller('loginController', function(UserService){

var vm = this;
var user = {};
  user.email = vm.email;
  user.password = vm.password

vm.submitLogin = function(user){
  console.log("Here is the user object: ", user);
  UserService.login(user)
};


});
