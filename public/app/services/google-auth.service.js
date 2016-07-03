(function() { 'use strict';

angular.module('dashboard')
.factory('GoogleAuthService', GoogleAuthService);

GoogleAuthService.$inject = ['$q','$timeout'];

function GoogleAuthService($q, $timeout) {

  var gaService = {};

  gaService.getAuthResult = getAuthResult;
  gaService.handleAuthClick = handleAuthClick;

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

  function handleAuthClick(callback) {
    gapi.auth.authorize({
      client_id: CLIENT_ID,
      scope: SCOPES,
      immediate: false
    },callback);
  }

  function getAuthResult(){
    return authPromise.promise;
  }

  return gaService;

};

})();