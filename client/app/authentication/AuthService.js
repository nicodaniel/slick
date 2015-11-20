angular.module('app').factory('AuthService',['$http', '$q','$cookies','$location','$rootScope','$cookieStore','User',
	 function($http, $q, $cookies, $location, $rootScope, $cookieStore, User) {
	var currentUser;
	//FIXME rewrite authentication is needed.....

	return {
		login : function(username, password) {
			 var dfd = $q.defer();
			$http.post('/api/login', {username : username,password : password}).then(function(response) {
				if (response.data.success === true) {
					currentUser = response.data.user;
					User.currentUser = response.data.user;
					 $location.path('/home/general/');
					dfd.resolve(true);
				} else {
					dfd.resolve(false);
				}
				return dfd.promise;
			});
		},
		logout : function() { 
			$cookies.remove('userLogged');
		},
		isLoggedIn : function() { 
			console.log("call isLoggedIn");
			if(currentUser != null && currentUser !="" && currentUser != undefined){
				console.log("isLoggedIn -> true");
				return true;
			}
			if($cookies.userLogged){
				currentUser = $cookies.userLogged;
				var cookie = $cookieStore.get("userLogged");
				console.log("current", currentUser);
				console.log("currentUser", currentUser.toString());
				console.log("current", currentUser.username);
				console.log("cookie", cookie);
				return true;
			}
			console.log("isLoggedIn -> false", currentUser);
			$location.path('/signIn');
			 return $q.reject('not authorized');
		},
		currentUser : function() {
			return currentUser;
		}
	};
}]); 