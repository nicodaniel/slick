var mongoose = require('mongoose');

var favoriteSchemas = mongoose.Schema({
	userId:String,
    messages:[{ _id : false , id: String, date: Date }]
});

var Favorites = mongoose.model('Favorites', favoriteSchemas);