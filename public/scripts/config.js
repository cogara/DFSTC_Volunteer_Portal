angular.module('DfstcSchedulingApp').config(uiRouter);

function uiRouter($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: '../views/landingPage.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: '../views/register.html'
    })
    .state('dashboard', {
      url: '/dashboard',
      templateUrl: '../views/dashboard.html',
      resolve: {
        checkLoggedIn: function(UserService, $state) {
          return UserService.checkLoggedIn().then(function(response) {
            if(!response) {
                $state.go('/');
                return false;
            }
          });
        }
      }
    })
    .state('dashboard.admin', {
      url: '/admin',
      templateUrl: '../views/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin',
      resolve: {
        checkAdmin: function(UserService, $state) {
          return UserService.checkLoggedIn().then(function(response) {
            if(!response) {
                $state.go('/');
                return false;
            } else if(!response.isAdmin) {
                $state.go('dashboard');
                return false;
            }
          });
        }
      }
    });

    $locationProvider.html5Mode(true);
}
