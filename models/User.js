var mongoose = require('mongoose');
var db = require('./db.js');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    nickname: String,
    cover: {
        type: String,
        default: 'http://localhost:3000/images/default.jpg'
    },
    email: String
});

module.exports = db.model('User', UserSchema);