var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    photo: {type: String}

});

module.exports = mongoose.model('Users', UsersSchema);