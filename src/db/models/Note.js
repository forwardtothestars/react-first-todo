var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    text: {type: String, required: true},
    importance: {type: String, required: true},
    createdAt: {type: Date},
    status: {type: String}
});

module.exports = mongoose.model('Note', NoteSchema);
