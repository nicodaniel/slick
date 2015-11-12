var path = require('path'),
    clientPath = path.normalize(__dirname + '/../../client'),
    authentication = require('./authentication'),
    messages = require('../controllers/messages'),
    user = require('../controllers/users'),
    channels = require('../controllers/channels'),
    favorites = require('../controllers/favorites');

    var passport = require('passport'),
	mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy;
	


module.exports = function(app, http, io) {
	
	var usernames = [];
	io.on('connection', function(socket) {
		console.log('a user connected');
		socket.on('disconnect', function() {
		console.log('user disconnected');

		var index = usernames.indexOf(socket.username);
		// remove the username from global usernames list
		if (index != -1) {
   			 usernames.splice(index, 1);
		}
		
		io.sockets.emit('user left', socket.username);
		// update list of users in chat, client-side
		io.sockets.emit('users connected', usernames);
		// echo globally that a client has left
		socket.broadcast.emit('user disconnect', socket.username);
		});
		
		socket.on('send:message', function(msg) {
			io.emit('send:message', msg);
		});
		

		socket.on('add user', function(username) {
			console.log("username", username);
			// we store the username in the socket session for this client
			socket.username = username;
			// add the client's username to the global list
			usernames.push(username); 
		    // echo globally (all clients) that a person has connected
			io.sockets.emit('users connected', usernames);
			io.emit('user joined', {
				username : socket.username
			});
		}); 

		
	});

	// routes for schemas
	app.get('/me', authentication.getCurrentUser);
	app.post('/api/login', authentication.login);
	
	app.get('/api/channels', channels.getChannels);
	app.get('/api/channel/:channel', channels.getChannel);
	//retrieve messages from channel
	app.get('/api/channel/:channel/messages');
	app.get('/api/channel/:channel/messages/before/:date');
	
	//users
	app.get('/api/users', user.getAllUsers);
	// app.get('/api/user/:id');
	
	//messages
	app.post('/api/message', messages.saveMessage);
	
	//favorite
	app.put('/api/favorite/message/:id', favorites.addMessage);
	// app.delete('/api/favorite/message/:id');
	

	app.all('/api/*', function(req, res) {
		res.send(404);
	});

	app.get('*', function(req, res) {
		res.sendfile(clientPath + '/index.html');
	});

};
