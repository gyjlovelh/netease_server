var mongoose = require('mongoose');
var db = require('./db.js');

var SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    singer: {
        type: String,
        required: true
    },
    types: [String],
    cover: {
        type: String,
        default: ''
    },
    src: {
        type: String,
        required: true
    },
    createtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = db.model('Song', SongSchema);