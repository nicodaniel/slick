angular.module('app').controller('HomeCtrl', ['$scope', '$http','$rootScope', 'socket','HomeService','User','$uibModal',
function($scope, $http, $rootScope, socket, HomeService, User, $uibModal) {
	
	$scope.defaultChannel = "general";
	
	HomeService.getChannel($scope.defaultChannel).success(function(data){
		$scope.channel = data.channel;
	});
	
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
	$scope.connectedUsers = [];
	HomeService.getUsers().success(function(data) {
		$scope.users = data.users;
	}).error(function(data) {
	}); 

	
	$scope.currentUser =  User.currentUser;
	socket.emit('add user', $scope.currentUser.username);
	
	socket.on('user joined', function (data) {
		console.log(data.username+" joins the channel");
	});
	
	socket.on('user left', function (data) {
		console.log(data.username+" left");
	});
	
	//all connected users
	socket.on('users connected', function (usernames) {
		console.log("users connected", usernames);
		$scope.connectedUsers = usernames; 
	});
	
	/**
	 * return true if user is connected
	 * return false either 
 	 * @param {Object} username
	 */
	$scope.isOnline = function(username){
		if($scope.connectedUsers.indexOf(username) !=-1){
			return true;
		}
		return false;	
	};
	
	
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
	
	$scope.items = ['item1', 'item2', 'item3'];
	  $scope.openModal = function (size) {
		console.log("open");
    var modalInstance = $uibModal.open({
      templateUrl: 'app/views/channel-purpose-modal.html',
      controller: 'HomeCtrl',
      size: size,
       resolve: {
        channel: function () {
          return $scope.channel;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  };
  
  $scope.isClicked = false;
  
  $scope.containTag = function(message){
  	// console.log("message here", message);
  	if(message.indexOf("#") != -1){
  		return true;
  	}
  	if(message.indexOf("# ") != -1){
  		return false;
  	}
  	return false;
  };

	
}]);
