var mongoose = require('mongoose');

var messagesSchemas = mongoose.Schema({
    channel : String,
    author :  String,
    message :  String,
    favorite : {type: Number, default: 0},
    timestamp :  String
});



var Messages = mongoose.model('Messages', messagesSchemas);