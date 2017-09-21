var mongoose = require('mongoose');
var db = require('./db.js');

var RoomSchema = new mongoose.Schema({
    name: String,
    width: Number,
    height: Number,
    size: Object,
    position: Object,
    createtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = db.model('Room', RoomSchema);