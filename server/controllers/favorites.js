var Favorites = require('mongoose').model('Favorites');



exports.addMessage = function(obj, res) {
	console.log("favorite", obj);
 	var favorite = new Favorite(obj);
};
