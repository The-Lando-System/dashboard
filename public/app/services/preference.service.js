(function() { 'use strict';

angular.module('dashboard')
.service('PreferenceService', PreferenceService);

PreferenceService.$inject = ['$rootScope','$http','$cookies','AuthService'];

function PreferenceService($rootScope,$http,$cookies,AuthService) {

  var prefService = {};

  prefService.getPrefs = getPrefs;
  prefService.setPrefs = setPrefs;
  prefService.removePrefCookie = removePrefCookie;
  prefService.initialize = initialize;
  prefService.userPrefs = {};

  initialize();

  function initialize() {

    var userSession = AuthService.getUserSession();
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
      })
      .error(function(error){
        console.log(error);
      });

    } else {
      prefService.userPrefs = JSON.parse(prefString);
      broadcastPrefs();
    }

  }

  function broadcastPrefs(){
    $rootScope.$broadcast('getPrefs', true);
  }

  function getPrefs(prefKey,defaultValue){

    var userSession = AuthService.getUserSession();
    if (!userSession.user){
      return defaultValue;
    }

    if (!prefService.userPrefs){
      console.log('Error! Preferences have not initialized yet!');
      return defaultValue;
    }

    var pref = prefService.userPrefs[prefKey];

    return pref ? pref : defaultValue;
   
  }

  function setPrefs(pref){

    var userSession = AuthService.getUserSession();
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

  function removePrefCookie(){
    $cookies.remove('prefs');
  }


  return prefService;

};

})();