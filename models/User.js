var mongoose = require('mongoose');
var db = require('./db.js');

var UserSchema = new mongoose.Schema({
    name: String,
    pwd: String,
    email: String
});

module.exports = db.model('User', UserSchema);