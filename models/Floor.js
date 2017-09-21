var mongoose = require('mongoose');
var db = require('./db.js');

var FloorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rooms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Room'
        }
    ],
    createtime: {
        type: Date,
        default: Date.now
    }
});

module.exports = db.model('Floor', FloorSchema);


