var mongoose = require('mongoose');

var messagesSchemas = mongoose.Schema({
    channel : String,
    author :  String,
    message :  String,
    timestamp :  String
});



var Messages = mongoose.model('Messages', messagesSchemas);