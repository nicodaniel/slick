var Channels = require('mongoose').model('Channels');
var Messages = require('mongoose').model('Messages');



exports.getChannels = function(req, res) {
	
};

exports.getMessage = function(req, res) {
	console.log('req.params.channel', req.params.channel);
	 Messages.find({channel:req.params.channel}, function(err, messages){
	 	res.json({messages : messages});
	 });
};

exports.getChannel = function(req, res){
	Channels.findOne({name : req.params.channel}, function(err, channel){
		res.json({channel : channel});
	});
};
