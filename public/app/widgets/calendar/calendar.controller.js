(function() { 'use strict';

angular.module('dashboard')
.controller('CalendarWidgetController', CalendarWidgetController);

CalendarWidgetController.$inject = ['$http','$timeout','$scope','AuthService','PreferenceService','GoogleAuthService'];

function CalendarWidgetController($http,$timeout,$scope,AuthService,PreferenceService,GoogleAuthService) {
  var calendarVm = this;
  var TAG = 'CalendarWidgetController: ';

  // Initialization ==============================================

  calendarVm.handleAuthClick = handleAuthClick;
  calendarVm.changeNumberOfEvents = changeNumberOfEvents;
  
  initialize();

  function initialize(){
    componentHandler.upgradeAllRegistered();

    calendarVm.userSession = AuthService.startUserSession();

    calendarVm.loading = false;
    calendarVm.hasGoogleAuth = true;

    calendarVm.events = [];

    if (calendarVm.userSession.user){
      GoogleAuthService.getAuthResult()
      .then(function(authResult){
        handleAuthResult(authResult);
      });
    }

  }


  // Interface Function Implementations ==============================

  function handleAuthClick() {
    GoogleAuthService.handleAuthClick(handleAuthResult);
  }

  function changeNumberOfEvents(newNumEvents) {
    getCalendarData(newNumEvents);
    calendarVm.numEvents = '';
  }


  // Helper Functions ===============================================
  

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
    gapi.client.load('calendar', 'v3', function(){
      getCalendarData(getPrefs());
    });
  }


  function getCalendarData(numEvents){

    if (!calendarVm.userSession.user){
      return;
    }

    PreferenceService.setPrefs({
      name: 'calendar',
      value: numEvents
    });

    if (!gapi.client.calendar){
      console.warn(TAG + 'Could not find a google client object!')
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

      calendarVm.events = [];

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

  function getPrefs(){
    var numEvents = PreferenceService.getPrefs('calendar');
    if (numEvents){
      return Number(numEvents);
    } else {
      return 5;
    }
  }


  // Listen for broadcast events =================================

  $scope.$on('refresh', function(event, success) {
    getCalendarData(getPrefs());
  });

  $scope.$on('getPrefs', function(event, success) {
    initialize();
  });

  $scope.$on('logout', function(event, success) {
    initialize();
  });


};

})();