var Channels = require('mongoose').model('Channels');
var Messages = require('mongoose').model('Messages');



exports.getChannels = function(req, res) {
	
};

exports.getMessage = function(req, res) {
	if(req.params.channel.indexOf("@") !=-1){ //DIRECT MESSAGE
		//FIXME
		var userId = req.cookies.sessionCookie.substring(24, req.cookies.sessionCookie.length); 
		//query
	}else{ //channel
		Messages.find({channel:req.params.channel}, function(err, messages){
	 		res.json({messages : messages});
	 	});	
	}
};

exports.getChannel = function(req, res){
	Channels.findOne({name : req.params.channel}, function(err, channel){
		res.json({channel : channel});
	});
};
