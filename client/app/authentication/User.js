angular.module('app').factory('User', function() {

  var currentUser;

  return {
    currentUser: currentUser,
    isAuthenticated: function() {
      return !!this.currentUser;
    }
  };
  
});