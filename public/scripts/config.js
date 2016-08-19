angular.module('DfstcSchedulingApp').config(uiRouter);

function uiRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: '../views/landingPage.html',
      resolve: {
        userCheck: function(UserService, $state) {
          UserService.checkLoggedIn().then(function(response) {
            if(response) {
              console.log('logged in');
              $state.go('dashboard')
            } else {
              console.log('not logged in');
            }
          })
        }
      }
    })
    .state('register', {
      url: '/register',
      templateUrl: '../views/register.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../views/dashboard.html',
      resolve: {
        userCheck: function(UserService, $state) {
          UserService.checkLoggedIn().then(function(response) {
            if(!response) {
              $state.go('/');
            }
          });
        }
      }
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '../views/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      resolve: {
        userCheck: function(UserService, $state) {
          UserService.checkLoggedIn().then(function(response) {
            if(!response) {
              //not logged in, send to login
              $state.go('/');
            } else if(!response.isAdmin) {
              $state.go('dashboard');
            }
          });
        }
      }
    });

    $locationProvider.html5Mode(true);
}
