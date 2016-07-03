(function() { 'use strict';

angular.module('dashboard')
.service('GoogleAuthService', GoogleAuthService);

GoogleAuthService.$inject = ['$q','$timeout'];

function GoogleAuthService($q, $timeout) {

  var gaService = {};

  gaService.getAuthResult = getAuthResult;

  var CLIENT_ID = '504696266788-tfo6rupvo0rr1qkarl1ftmi4sv3bn3gp.apps.googleusercontent.com';
  var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

  var authPromise = $q.defer();

  initialize();

  function initialize() {
    checkForAuth();
  }

  function checkForAuth(){
    if(AUTH_RESULT === 'AUTH_NOT_CHECKED'){
      $timeout(checkForAuth, 1000);
    } else {
      authPromise.resolve(AUTH_RESULT);
    }
  };

  // function checkAuth() {
  //   gapi.auth.authorize({
  //     'client_id': CLIENT_ID,
  //     'scope': SCOPES.join(' '),
  //     'immediate': true
  //   }, function(result){
  //     authPromise.resolve(result);
  //   });
  // }

  function getAuthResult(){
    return authPromise.promise;
  }

  return gaService;

};

})();