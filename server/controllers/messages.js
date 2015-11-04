var Messages = require('mongoose').model('Messages');



exports.saveMessage = function(messageObj, res) {
	// console.log("saving message", messageObj);
 	var message = new Messages(messageObj);
 	message.save(function(err){
 		console.log(err);
 		if(!err){
 			
 		}else{
 			console.log("error during message storing");
 		}
 	});
};


exports.getLastTenMessages = function(req, res){
	var beforeDate = req.beforeDate;
	 Messages.find({ timestamp: {$lt:beforeDate}}, function (err, user) {
  	console.log("user2", user, err);
  });
};
