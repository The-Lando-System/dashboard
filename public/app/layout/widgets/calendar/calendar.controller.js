(function() { 'use strict';

angular.module('dashboard')
.controller('CalendarWidgetController', CalendarWidgetController);

CalendarWidgetController.$inject = ['$http','$timeout','$scope'];

function CalendarWidgetController($http,$timeout,$scope) {
  var calendarVm = this;

  calendarVm.loading = false;
  calendarVm.hasGoogleAuth = true;
  calendarVm.handleAuthClick = handleAuthClick;
  calendarVm.hideSettingsDialog = hideSettingsDialog;
  calendarVm.showSettingsDialog = showSettingsDialog;
  calendarVm.listUpcomingEvents = listUpcomingEvents;
  calendarVm.events = [];

  var settingsDialog;

  function showSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-calendar');
    }
    settingsDialog.showModal();
  };

  function hideSettingsDialog(){
    if(!settingsDialog){
      settingsDialog = document.querySelector('#settings-dialog-calendar');
    }
    settingsDialog.close();
  };

  angular.element(document).ready(function () {
  	componentHandler.upgradeAllRegistered();
    checkForAuth();
  });

  // Poll for Google auth
  function checkForAuth(){
    calendarVm.loading = true;
    if(AUTH_RESULT === 'AUTH_NOT_CHECKED'){
      $timeout(checkForAuth, 1000);
    } else {
      handleAuthResult(AUTH_RESULT);
    }
  };



    /**
   * Handle response from authorization server.
   *
   * @param {Object} authResult Authorization result.
   */
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

  /**
   * Initiate auth flow in response to user clicking authorize button.
   *
   * @param {Event} event Button click event.
   */
  function handleAuthClick(event) {
    gapi.auth.authorize(
      {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
      handleAuthResult);
    return false;
  }

  /**
   * Load Google Calendar client library. List upcoming events
   * once client library is loaded.
   */
  function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
    
  }

  /**
   * Print the summary and start datetime/date of the next ten events in
   * the authorized user's calendar. If no events are found an
   * appropriate message is printed.
   */
  function listUpcomingEvents(numEvents) {

    calendarVm.events = [];

    numEvents = numEvents ? Number(numEvents) : 5;

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
      //appendPre('Upcoming events:');

      if (events.length > 0) {
        for (var i = 0; i < events.length; i++) {
          var event = events[i];
          var when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }

          calendarVm.events.push({ "summary": event.summary, "time": when });
          //appendPre(event.summary + ' (' + when + ')');
        }
      } else {
        //appendPre('No upcoming events found.');
      }
      calendarVm.loading = false;
      $scope.$apply();
    });
  }

  /**
   * Append a pre element to the body containing the given message
   * as its text node.
   *
   * @param {string} message Text to be placed in pre element.
   */
  function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
  }


};

})();