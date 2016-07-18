(function() { 'use strict';

angular.module('dashboard')
.config(config);

function config($httpProvider,$urlRouterProvider,$stateProvider,$locationProvider) {
  
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('users', {
    url: '/user-management',
    templateUrl: '/app/users/user-management.html',
    controller: 'UserMgmtController',
    controllerAs: 'userVm'
  })
  .state('dashboard', {
    url: '/my-dashboard',
    templateUrl: '/app/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardVm'
  })
  .state('spotify-auth-success', {
    url: '/spotify-auth-success/:token/:refresh_token',
    templateUrl: '/app/dashboard/dashboard.html',
    controller: 'DashboardController',
    controllerAs: 'dashboardVm'
  })
  
  $urlRouterProvider.otherwise('/my-dashboard');

  $urlRouterProvider.rule(function($injector, $location) {

    var path = $location.path();
    var hasTrailingSlash = path[path.length-1] === '/';

    if(hasTrailingSlash) {

      //if last charcter is a slash, return the same url without the slash  
      var newPath = path.substr(0, path.length - 1); 
      return newPath; 
    } 

  });

  $httpProvider.interceptors.push('Interceptor');

};

angular.module('dashboard')
.run(function ($rootScope,$timeout) {
  $rootScope.$on('$viewContentLoaded', ()=> {
    $timeout(() => {
      componentHandler.upgradeAllRegistered();
    })
  })
});

})();