var Users = require('mongoose').model('Users');

exports.checkUsers = function(req, res) {
 Users.find({ username: "ndaniel" }, function (err, user) {
  	console.log("user2", user, err);
  });
};

exports.getAllUsers = function(req, res){
	Users.find({}, function (err, users) {
  	res.json({users:users});
  });
};

