(function() { 'use strict';

angular.module('dashboard')
.controller('CalendarWidgetController', CalendarWidgetController);

CalendarWidgetController.$inject = ['$http','$timeout','$scope','AuthService','PreferenceService','GoogleAuthService'];

function CalendarWidgetController($http,$timeout,$scope,AuthService,PreferenceService,GoogleAuthService) {
  var calendarVm = this;

  // Initialization ==============================================

  calendarVm.handleAuthClick = handleAuthClick;
  calendarVm.listUpcomingEvents = listUpcomingEvents;
  calendarVm.userSession = AuthService.startUserSession();
  calendarVm.loading = false;
  calendarVm.hasGoogleAuth = true;
  calendarVm.events = [];
  
  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();

    GoogleAuthService.getAuthResult()
    .then(function(authResult){
      handleAuthResult(authResult);
    });
  }


  // Interface Function Implementations ==============================

  function handleAuthClick(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);
    return false;
  }


  function listUpcomingEvents(numEvents) {

    calendarVm.events = [];

    if (!numEvents){
      var eventNum = PreferenceService.getPrefs('calendar');
      if (eventNum){
        getCalendarData(Number(eventNum));
      } else {
        getCalendarData(5);
      }
    } else {
      getCalendarData(numEvents);
    }

  };


  // Helper Functions ===============================================
  
  function checkForAuth(){
    calendarVm.loading = true;
    if(AUTH_RESULT === 'AUTH_NOT_CHECKED'){
      $timeout(checkForAuth, 1000);
    } else {
      handleAuthResult(AUTH_RESULT);
    }
  };

  function handleAuthResult(authResult) {

    if (authResult && !authResult.error) {
      // Hide auth UI, then load client library.
      calendarVm.hasGoogleAuth = true;
      loadCalendarApi();
    } else {
      calendarVm.hasGoogleAuth = false;
      calendarVm.loading = false;
    }
  }
  

  function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
  }


  function getCalendarData(numEvents){

    PreferenceService.setPrefs({
      name: 'calendar',
      value: numEvents
    });

    if (!gapi.client.calendar){
      return;
    }

    var request = gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': numEvents,
      'orderBy': 'startTime'
    });

    request.execute(function(resp) {
      var events = resp.items;

      if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }

          calendarVm.events.push({ "summary": event.summary, "time": when });
        }
      } 
      calendarVm.loading = false;
      $scope.$apply();
    });

  }



  // Listen for broadcast events =================================

  $scope.$on('refresh', function(event, success) {
    if (success){

      calendarVm.userSession = AuthService.startUserSession();

      GoogleAuthService.getAuthResult()
      .then(function(authResult){
        handleAuthResult(authResult);
      });

    }
  });

  $scope.$on('getPrefs', function(event, success) {
    if (success){
      var numEvents = PreferenceService.getPrefs('calendar');
      if (numEvents){
        getCalendarData(Number(numEvents));
      } else {
        getCalendarData(5);
      }
    }
  });




};

})();