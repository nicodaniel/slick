'use strict';
 
angular.module('app').
  factory('HomeService', function($http){
    return {
      login: function(username, password) {
        return $http.post('/api/login', {username:username,password: password});
      },     
      addApplication: function(application) {
        return $http.post('/api/applications/', application); 
      },
      updateApplication: function(id, application) {
        return $http.put('/api/applications/' + id, application);
      },
      deleteApplication: function(id) {
        return $http.delete('/api/applications/' + id);
      }
    };
  }); 