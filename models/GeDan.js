var mongoose = require('mongoose');
var db = require('./db.js');

var GeDanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: Array
    },
    desc: {
        type: String
    },
    cover: {
        type: String,
        default: 'public/resource/jpg/2c44ce4248b73322f3d7e8c5e60d1165.jpg'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createtime: {
        type: Date,
        default: Date.now
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Song'
        }
    ],
    num: {
        type: Number,
        default: 0
    }
});

module.exports = db.model('GeDan', GeDanSchema);