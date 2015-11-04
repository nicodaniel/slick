var mongoose = require('mongoose');




//Schema Definition
var usersSchema = mongoose.Schema({
    username : String,
    email :  String,
    firstname :  String,
    lastname :  String,
    password :  String
});



var Users = mongoose.model('Users', usersSchema);