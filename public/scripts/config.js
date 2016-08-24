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
              $state.go('dashboard')
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
      controller: 'DashboardController',
      controllerAs: 'dash',
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
              //user not logged in, send to login
              $state.go('/');
            } else if(!response.isAdmin) {
              //user not admin, send to dashboard
              $state.go('dashboard');
            }
          });
        },
        volunteerList: function(AdminService) {
          return AdminService.getVolunteers();
        }
      }
    })
    .state('admin.reports', {
      url:'/reports',
      templateUrl: '../views/adminReports.html',
    });

    $locationProvider.html5Mode(true);
}
