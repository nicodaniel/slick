var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'production';

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var config = require('./config/config')[env];

require('./config/mongoose')(config);

require('./config/express')(app, config);

require('./config/routes')(app, http, io);

// require()

http.listen(config.port, function(){
 console.log('listening on :'+config.port);
});

//app.listen(config.port);
//console.log('Listening on port ' + config.port + '...');
