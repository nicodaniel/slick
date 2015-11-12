var Favorites = require('mongoose').model('Favorites');
var async = require('async');

exports.addMessage = function(req, res) {
	 async.waterfall([
     function(callback) {
    	Favorites.findOne({userId : req.body.userId},	function(err, result) {
          callback(null, result);
        });
      },
	  function(res, callback) {
        if(res == null){
        //no favorite for user create one
        var favorite = new Favorites({userId:req.body.userId, messages:[{id:req.params.id, date:Date.now()}]});
     	favorite.save();
        callback(null, 'done');
        }else{
        // updates favorite list
        var added = res.messages.addToSet({id:req.params.id, date:Date.now()});
        res.save();
        callback(null, added);
		}
	}], function (err, result) {
		console.log(result);
		res.json({result : "added to favorite"});
	});
};
