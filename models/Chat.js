var mongoose = require('mongoose');
var db = require('./db.js');

var ChatSchema = new mongoose.Schema({
    msg: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = db.model('Chat', ChatSchema);