var cors = require('cors');
var bodyParser = require("body-parser");
var config = require("../etc/config");
var express = require('express');
var db = require('./db/db');

// Initialization of express application
const app = express();

// Set up connection of database
db.setUpConnection();

// Using bodyParser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json() );

// Allow requests from any origin
app.use(cors({ origin: '*' }));

// RESTFull api handlers
app.get('/notes/:id', (req, res) => {
    console.log(req.params.id)
    db.listNotes(req.params.id).then(data => res.send(data));
});

app.post('/notes/', (req, res) => {
    const result ={};
    db.createNote(req.body)
        .then(data => {
            result.ResultCode = 0;
            result.id = data._id
            return res.send(result)
        })
        .catch(err => {
            result.ResultCode = 1;
            result.Error = {...err}
            return res.send(result)
        });
});

app.delete('/notes/:id', (req, res) => {
    db.deleteNote(req.params.id).then(data => res.send(data))
        .catch(err => res.send(err));
});

// Users table

app.get('/users', (req, res) => {
    db.getUsers(req.body.userId).then(data => res.send(data))
        .catch(err => res.send(err));
});

app.post('/users', (req, res) => {
    console.log(req.body);
    db.createUser(req.body).then(data => res.send(data))
        .catch(err => res.send(err));
});

app.delete('/users/:id', (req, res) => {
    db.deleteUser(req.params.id).then(data => res.send(data))
        .catch(err => res.send(err));
});

const server = app.listen(config.serverPort, function() {
    console.log(`Server is up and running on port ${config.serverPort}`);
});
