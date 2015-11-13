'use strict';
 
angular.module('app').
  factory('HomeService', function($http){
    return {
      login: function(username, password) {
        return $http.post('/api/login', {username:username,password: password});
      }, 
      getUsers:function(){
      	return $http.get('/api/users');
      },
      getChannels:function(){
      	return $http.get('/api/channels');
      },
      getChannel:function(channel){
      	return $http.get('/api/channel/'+channel);
      },
      getChannelMessage:function(channel){
      	return $http.get('/api/channel/'+channel+'/messages');
      },
      saveMessage:function(msg){
      	return $http.post("/api/message", msg);
      },
      setAsFavorite:function(id, user){
      	return $http.put('/api/favorite/message/'+id, user);
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