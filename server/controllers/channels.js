var Channels = require('mongoose').model('Channels');



exports.getChannels = function(req, res) {
	
};

exports.getChannel = function(req, res){
	console.log("req.channel", req.params.channel);
	Channels.findOne({name : req.params.channel}, function(err, channel){
		console.log("channel", channel);
		res.json({channel : channel});
	});
};
