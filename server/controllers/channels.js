var Channels = require('mongoose').model('Channels');



exports.getChannels = function(req, res) {
	
};

exports.getChannel = function(req, res){
	Channels.findOne({name : req.params.channel}, function(err, channel){
		res.json({channel : channel});
	});
};
