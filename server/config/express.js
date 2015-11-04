var express = require('express');
var passport = require('passport');

module.exports = function(app, config) {  
    app.configure(function() {
//    app.use(express.logger('dev'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({secret: 'This is Top secret'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.clientPath));
  });
};
