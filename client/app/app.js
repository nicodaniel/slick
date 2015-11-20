angular.module('app', ['ngResource', 'ngRoute', 'ngSanitize' ,'ngCookies','ui.bootstrap']);

angular.module('app')
.config(['$routeProvider', '$locationProvider', 
function($routeProvider, $locationProvider) {
	
	//userRole : ADMIN or USER
  var routeRoleChecks = {
    user: {auth: function(AuthService, User) {
      return User.isAuthenticated();
    }}
  };
  
  //all routes from apps
  $routeProvider
  	.when('/', { templateUrl: 'app/views/signIn.html', controller: 'SigninCtrl'})
    .when('/home/general/', { templateUrl: 'app/views/home.html', controller: 'HomeCtrl',
     resolve : routeRoleChecks.user})
     .when('/home/:name/',{ templateUrl: 'app/views/home.html', controller: 'HomeCtrl', reloadOnSearch: false})
    .when('/group', { templateUrl: 'app/views/group.html',   controller: 'GroupCtrl'   })
    .when('/groupId', { templateUrl: 'app/views/groupId.html',    controller: 'GroupCtrl'   })
    .when('/test', { templateUrl: 'app/views/new-channel.html',    controller: 'HomeCtrl'   })
    .otherwise({ redirectTo: '/' });
  
  $locationProvider.html5Mode(true);
}]);


angular.module('app')
.run(['$rootScope', '$location','User','$http', 
function($rootScope, $location, User, $http) {
  
  $http.get('/me').then(function(response) {
    if(response.data.user) {
      // var user = new User();
      // angular.extend(user, response.data.user);
      User.currentUser = response.data.user;
    }
  });
  
	$rootScope.user = User;

}]);