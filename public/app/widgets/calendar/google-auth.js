var CLIENT_ID = '504696266788-tfo6rupvo0rr1qkarl1ftmi4sv3bn3gp.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
var AUTH_RESULT = 'AUTH_NOT_CHECKED';

/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
  gapi.auth.authorize(
    {
      'client_id': CLIENT_ID,
      'scope': SCOPES.join(' '),
      'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
  AUTH_RESULT = authResult;
}