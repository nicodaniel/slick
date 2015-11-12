var mongoose = require('mongoose');

var favoriteSchemas = mongoose.Schema({
	userId:String,
    messages:[{ id: String, date: Date }]
});



var Favorites = mongoose.model('Favorites', favoriteSchemas);