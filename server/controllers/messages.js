var Messages = require('mongoose').model('Messages');



exports.saveMessage = function(req, res) {
 	var message = new Messages(req.body);
    message.save();
 	res.json({id: message._id});
};


exports.getLastTenMessages = function(req, res){
	var beforeDate = req.beforeDate;
	 Messages.find({ timestamp: {$lt:beforeDate}}, function (err, user) {
  	console.log("user2", user, err);
  });
};
