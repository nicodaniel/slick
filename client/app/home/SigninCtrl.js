angular.module('app').controller('SigninCtrl', ['$scope', '$http', 'socket', 'AuthService',
function($scope, $http, socket, AuthService) {

	// $scope.logMeIn = function(username, password) {
	// console.log("username : ", username, password);
	// HomeService.login(username, password).success(function(data) {
	// console.log("data", data);
	//
	// });
	// };

	$scope.logMeIn = function(username, password) {
		AuthService.login(username, password);
	};

}]);
