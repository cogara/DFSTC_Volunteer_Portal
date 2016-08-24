angular.module('DfstcSchedulingApp').controller('MainController', MainController);

function MainController($http, $state, $window, UserService, Upload) {
    var vm = this;
    vm.login = login;
    vm.register = register;
    vm.logout = logout;
    vm.submit = submit
    vm.upload = upload;
    //temp for QOL
    vm.loginUser = {};
    // vm.loginUser.email = 'test';
    // vm.loginUser.password = 'test';

    function register() {
        UserService.register(vm.registerUser).then(function() {
            UserService.login(vm.registerUser).then(function(response) {
                console.log('registering, go?');
                vm.currentUser = response;
                $state.go('dashboard');
            });
        });
    }

    function login() {
        UserService.login(vm.loginUser).then(function(response) {
            vm.currentUser = response;
            console.log('going to dashboard');
            $state.go('dashboard');
        }, function() {
            vm.currentUser = null;
        });
    }

    function logout() {
        UserService.logout().then(function(response) {
            vm.currentUser = null;
            $state.go('/');
        })
    }

    //checks if user is currently logged in on page load
    UserService.checkLoggedIn().then(function(response) {
        console.log(response);
        vm.currentUser = response;
    });

//SUBMIT PHOTO

    function submit() { //function to call on form submit
      console.log('CLICKED!')
        if (vm.registerUser.photo) { //check if from is valid
            vm.upload(vm.registerUser.photo); //call upload function
        }
    }

    function upload(file) {
        Upload.rename(file, registerUser.id)
        Upload.upload({
            url: 'http://localhost:3000/upload', //webAPI exposed to upload the file
            data: {
                file: file
            } //pass file as data, should be user ng-model
        }).then(function(resp) { //upload function returns a promise
            if (resp.data.error_code === 0) { //validate success
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp);
            } else {
                $window.alert('an error occured');
            }
        }, function(resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function(evt) {
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
      };
    } //end Main Controller
