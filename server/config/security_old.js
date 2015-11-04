var passport = require('passport');
    crypto = require('crypto');

/* Remove sensitive user information */
var filterUser = function(user) {
  if ( user ) {
    return {
        _id : user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        roles:user.roles
    };
  } else {
    return { user: null };
  }
};

exports.createSalt = function() {
  return crypto.randomBytes(128).toString('base64');
}

exports.hashPwd = function(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  return hmac.update(pwd).digest('hex');
}

exports.logIn = function(req, res, next) {
  req.body.username = req.body.username.toLowerCase();
  var auth = passport.authenticate('local', function(err, user) {
    if(err) {return next(err);}
    if(!user) { res.send({success:false})}
    req.logIn(user, function(err) {
      if(err) {return next(err);}
      res.send({success:true, user:filterUser(user)});
    })
  })
  auth(req, res, next);
};

exports.logOut = function(req, res, next) {
    req.logout();
    res.send(204);  
};

exports.getCurrentUser = function(req, res, next) {
  if(req.user){
    res.send({user:filterUser(req.user)});
  } else {
    res.send(204);
  }
};

exports.requiresLogin = function(req, res, next) {
  if(!req.isAuthenticated()) {
    res.status(403);
    res.end();
  } else {
    next();
  }
};

exports.requiresRole = function(role) {
  return function(req, res, next) {
    if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1) {
      res.status(403);
      res.end();
    } else {
      next();
    }
  }
}