var Messages = require('mongoose').model('Messages');



exports.saveMessage = function(messageObj, res) {
 	var message = new Messages(messageObj);
    message.save();
 	res.json({id: message._id});
};


exports.getLastTenMessages = function(req, res){
	var beforeDate = req.beforeDate;
	 Messages.find({ timestamp: {$lt:beforeDate}}, function (err, user) {
  	console.log("user2", user, err);
  });
};
