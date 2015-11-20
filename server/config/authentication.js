var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy;
var Users = require('mongoose').model('Users');

passport.use(new LocalStrategy(function(username, password, done) {
	Users.findOne({
		username : username
	}, function(err, user) {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(null, false, {
				message : 'Incorrect username.'
			});
		}
		if (user.password != password) {
			return done(null, false, {
				message : 'Incorrect password.'
			});
		}
		return done(null, user);
	});
}));

  passport.serializeUser(function(user, done) {
    if(user) {
      done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
    Users.findOne({_id:id}).exec(function(err, user) {
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  });

exports.login = function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send({success:false});}
    req.login(user, function(err) {
      if(err) {return next(err);}
      //FIXME
      res.cookie('sessionCookie','you-can-loggin-all-time-'+user._id);
      res.send({success:true, user:user});
    });
  });
  auth(req, res, next);
};

exports.getCurrentUser = function(req, res, next) {
  if(req.cookies.sessionCookie){
  	var str = req.cookies.sessionCookie;
  	//FIXME
	var id = str.substring(24, str.length);
  	Users.findOne({_id:id}).exec(function(err, user) {
      if(user) {
      	res.send({user : user});
      }
      });
  } else {
    res.send(204);
  }
};
