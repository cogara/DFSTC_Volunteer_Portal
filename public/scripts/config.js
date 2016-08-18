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
      controllerAs: 'admin',
      resolve: {
        adminAuth: function(UserService, $state) {
          return UserService.checkLoggedIn().then(function(response) {
            console.log('Checking admin', response);
            if(!response) {
                console.log('not admin');
                $state.go('/');
                return false;
            } else if(!response.isAdmin) {
                console.log('not admin');
                $state.go('dashboard');
                return false;
            } else {
              console.log('is admin');
              return true;
            }
          });
        }
      }
    });

    $locationProvider.html5Mode(true);
}
