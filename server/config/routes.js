var path = require('path'),
    clientPath = path.normalize(__dirname + '/../../client'),
    authentication = require('./authentication'),
    diagrams = require('../controllers/diagrams'),
    messages = require('../controllers/messages');

    var passport = require('passport'),
	mongoose = require('mongoose'),
	LocalStrategy = require('passport-local').Strategy;
	


module.exports = function(app, http, io) {
	
	var usernames = {};
	io.on('connection', function(socket) {
		console.log('a user connected');
		socket.on('disconnect', function() {
			console.log('user disconnected');
		});
		socket.on('send:message', function(msg) {
			io.emit('send:message', msg);
			messages.saveMessage(msg);
		});
		

		socket.on('add user', function(username) {
			console.log("username", username);
			// we store the username in the socket session for this client
			socket.username = username;
			// add the client's username to the global list
			usernames[username] = username; 
			// // echo globally (all clients) that a person has connected
			io.emit('user joined', {
				username : socket.username
			});
		}); 

		
	});

	// routes for schemas
	app.get('/me', authentication.getCurrentUser);
	app.post('/api/login', authentication.login);
	
	//retrieve messages from channel
	app.get('/api/channel/:channel/messages');
	app.get('/api/channel/:channel/messages/before/:date');
	

	app.all('/api/*', function(req, res) {
		res.send(404);
	});

	app.get('*', function(req, res) {
		res.sendfile(clientPath + '/index.html');
	});

};
