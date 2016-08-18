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
      templateUrl: '../views/dashboard.html'
    })
    .state('dashboard.admin', {
      url: '/admin',
      templateUrl: '../views/admin.html',
      controller: 'AdminController',
      controllerAs: 'admin'
    });

    $locationProvider.html5Mode(true);
}
