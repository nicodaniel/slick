angular.module('app').controller('HomeCtrl', ['$scope', '$http','$rootScope', 'socket','HomeService','User',
function($scope, $http, $rootScope, socket, HomeService, User) {

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
	
	$scope.users = [];
	console.log($scope.users);
	HomeService.getUsers().success(function(data) {
		$scope.users = data.users;
	}).error(function(data) {
	}); 

	
	$scope.currentUser =  User.currentUser;
	socket.emit('add user', $scope.currentUser.username);
		
	socket.on('user joined', function (data) {
		console.log("username", data);
	});
	
	socket.on('updatedusers', function (usernames) {
		console.log("update users connected", usernames);
	});
	
	socket.on('user disconnect', function (username) {
		console.log(username+" has disconnected");
	});
	
	
	
	$scope.message = "";
	$scope.sendMessage = function(msg) {
		if (msg != "") {
			$scope.message = "";
			socket.emit('send:message', {channel:"general", message : msg, 
			author : User.currentUser.username, timestamp: Date.now()});
		}
	};

	$scope.messages = [];
	socket.on('send:message', function(msg) {
		if (msg != "") {
		$scope.messages.push(msg);
		}
	});
	
}]);
