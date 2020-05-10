var mongoose = require("mongoose");
var Note = require('./models/Note.js');
var Users = require('./models/Users.js');
var config = require('../../etc/config');

mongoose.model('Note');
mongoose.model('Users');

function setUpConnection() {
    mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/${config.db.name}`);
}

function listNotes(userId) {
    if (!userId) {
        return Note.find();
    } else {
        return Note.find({userId})
    }
}

function createNote(data) {
    const note = new Note({
        userId: data.userId,
        title: data.title,
        text: data.text,
        status: data.status || 'active',
        importance: data.importance,
        createdAt: new Date()
    });

    return note.save();
}

function deleteNote(id) {
    return Note.findById(id).remove();
}

/*База пользователей */

function getUsers(userId) {
    if (!userId) {
        return Users.find();
    } else {
        return Users.findById(userId)
    }
}

function createUser(data) {
    const user = new Users({
        firstName: data.firstName,
        lastName: data.lastName,
        photo: data.photoURL
    });
    return user.save();
}

function deleteUser(id) {
    return Users.findById(id).remove();
}

exports.setUpConnection = setUpConnection;
exports.listNotes = listNotes;
exports.createNote = createNote;
exports.deleteNote = deleteNote;

exports.getUsers = getUsers;
exports.createUser = createUser;
exports.deleteUser = deleteUser;

