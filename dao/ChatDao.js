var Chat = require('../models/Chat.js');

module.exports = {
    findAllChats: function (cb) {
        Chat.find(
            {},
            {},
            {}
        ).populate('user').exec(function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    saveChat: function (param, cb) {
        Chat.create(param, function (err) {
            if (err) throw err;
            cb('ok');
        });
    }
};