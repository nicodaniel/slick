angular.module('app').controller('HomeCtrl', ['$scope', '$http','$rootScope', 'socket','User',
function($scope, $http, $rootScope, socket, User) {

	$scope.hoverIn = function() {
		this.hoverQuickSwitcher = true;
	};

	$scope.hoverOut = function() {
		this.hoverQuickSwitcher = false;
	};
	
	$scope.showAuthor = function($index) {
		if($index == 0){
			return true;
		}
		else{
			var previousAuthor =	$scope.messages[$index-1].author;
			var author = $scope.messages[$index].author;
			if(previousAuthor === author){
				return false;
			}
			return true;
		}
	}; 
	
	$scope.currentUser =  User.currentUser;
	
	$scope.message = "";
	$scope.sendMessage = function(msg) {
		socket.emit('add user', "toto");
		if (msg != "") {
			$scope.message = "";
			socket.emit('send:message', {channel:"general", message : msg, author : User.currentUser.username, timestamp: Date.now()});
		}
	};

	$scope.messages = [];
	socket.on('send:message', function(msg) {
		if (msg != "") {
		$scope.messages.push(msg);
		}
	});
	
}]);
