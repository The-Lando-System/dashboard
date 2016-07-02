(function() { 'use strict';

angular.module('dashboard')
.service('PreferenceService', PreferenceService);

PreferenceService.$inject = ['$rootScope','$q','$http','$cookies','AuthService'];

function PreferenceService($rootScope,$q,$http,$cookies,AuthService) {

  var prefService = {};

  prefService.getPrefs = getPrefs;
  prefService.setPrefs = setPrefs;
  prefService.userPrefs = {};

  var initPromise = $q.defer();

  initialize();

  function initialize() {

    var userSession = AuthService.startUserSession();
    if (!userSession.user){
      return;
    }

    // Check if preferences are in local storage
    var prefString = $cookies.get('prefs');

    // Make service call to get the user's preferences
    if (!prefString){
      $http.get('/user/preferences/' + userSession.user.username, { headers: { 'x-access-token': userSession.token } })
      .success(function(data){

        $cookies.put('prefs',data.prefData);
        prefService.userPrefs = JSON.parse(data.prefData);
        broadcastPrefs();
        initPromise.resolve();
      })
      .error(function(error){
        initPromise.reject('Failed to make service call to get user preferences!');
        return;
      });

    } else {
      prefService.userPrefs = JSON.parse(prefString);
      initPromise.resolve();
    }

  }


  function broadcastPrefs(){
    $rootScope.$broadcast('getPrefs', true);
  }


  function getPrefs(prefKey){
    var getPrefPromise = $q.defer();
    initPromise.promise
    .then(function(){
      if (prefService.userPrefs.hasOwnProperty(prefKey)){
        getPrefPromise.resolve(prefService.userPrefs[prefKey]);
      } else {
        getPrefPromise.resolve(false);
      }
      return;
    }, function(errorMessage){
      getPrefPromise.reject(errorMessage);
      return;
    });
    return getPrefPromise.promise;
  }

  function setPrefs(pref){

    var userSession = AuthService.startUserSession();
    if (!userSession.user){
      return;
    }

    prefService.userPrefs[pref.name] = pref.value;

    $http.put('/user/preferences/' + userSession.user.username, {prefData: JSON.stringify(prefService.userPrefs)}, { headers: { 'x-access-token': userSession.token } } )
    .success(function(){
      $cookies.put('prefs',JSON.stringify(prefService.userPrefs));
      return;
    })
    .error(function(error){
      console.log(error);
      return;
    });
  }


  return prefService;

};

})();