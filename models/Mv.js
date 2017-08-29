var mongoose = require('mongoose');
var db = require('./db.js');

var MvSchema = new mongoose.Schema({
    name: String,
    src: String,
    singer: String,
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    desc: String,
    createtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = db.model('Mv', MvSchema);
