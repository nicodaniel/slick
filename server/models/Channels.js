var mongoose = require('mongoose');

var channelsSchemas = mongoose.Schema({
    name : String,
    description :  String,
    creationDate :  String,
    users :  String
});


var Channels = mongoose.model('Channels', channelsSchemas);