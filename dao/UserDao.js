var User = require('../models/User.js');
module.exports = {
    register: function (param, cb) {
        User.create(param, function(err) {
            User.findOne(param, {username: 1, password: 1, nickname: 1, cover: 1}, {} ,function(err, result) {
                if (err) throw err;
                cb(result);
            });
        });
    },
    login: function (param, cb) {
        User.findOne(param, {username: 1, password: 1, nickname: 1, cover: 1}, {} ,function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    findUserById: function(param, cb) {
        User.findOne({_id: param.id}, {username: 1, password: 1, nickname: 1, cover: 1}, {} , function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }
};