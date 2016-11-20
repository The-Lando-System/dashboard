(function() { 'use strict';

angular.module('dashboard')
.service('AuthService2', AuthService2);

AuthService2.$inject = ['$cookies','jwtHelper','$rootScope'];

function AuthService2($cookies,jwtHelper,$rootScope) {

  var authService = {};
  var TAG = 'AuthService2: ';

  // Function Declarations ==============================

  authService.getUserSession = getUserSession;
  authService.login = login;
  authService.logout = logout;

  initialize();

  // Function Implementations ===========================

  function initialize(){
    authService.userSession = {
      token    : false,
      user     : false,
      isAdmin  : false
    };
  }

  function getUserSession(){
    return authService.userSession;
  }

  function login(creds){
    creds.grant_type = 'password';
    var loginUrl = 'http://localhost:8080/oauth/token';
    var headers = {
      'Content-Type'   : 'application/x-www-form-urlencoded',
      'Authorization'  : 'Basic ' + btoa('acme:acmesecret')
    };
    var body = 'username=' + creds.username + '&password=' + creds.password + '&grant_type=' + creds.grant_type;
    $http.post(loginUrl, body, {headers: headers})
    .success(function(data){
      console.log(TAG + 'Successful OAuth login! Got the following results:');
      console.log(data);
      createUserSession(data);
    })
    .error(function(data){
      console.warn(TAG + 'Failed OAuth login! Got the following results:');
      console.warn(data);
    });
  }


  function logout(){
    $cookies.remove('token');
    initialize();
  }


  function createUserSession(token){

    // Make a service call to get the user from the token
    $http.get('http://localhost:8080/user-details', { headers: { 'Authorization'  : 'Bearer ' + token } })
    .success(function(data){
      console.log(TAG + 'Successful call made to get user details! Results from server:')
      console.log(data);
      var user = data;
      var isAdmin = false;
      if (user.role){
        isAdmin = (user.role === 'ADMIN') ? true : false;
      } else {
        console.warn(TAG + 'Could not get the role from the user!')
      }
      authService.userSession = {
        token    : token,
        user     : user,
        isAdmin  : isAdmin
      }
    })
    .error(function(error){
      console.warn(TAG + 'Failed call to get user details! Response from server:')
      console.warn(error);
    });
    
  }


  return authService;

};

})();