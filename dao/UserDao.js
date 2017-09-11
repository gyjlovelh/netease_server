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
        User.findOne(
            {_id: param.id},
            {username: 1, password: 1, nickname: 1, cover: 1, desc: 1, sex: 1,birthday: 1, area: 1},
            {},
            function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateUser: function (param, cb) {
        User.update(
            {_id: param._id},
            {$set: param},
            {upsert: true},
            function (err) {
                if (err) throw err;
                cb({result: 'ok'});
            }
        )
    },
    uploadCover: function (param, cb) {
        User.update(
            {_id: param.id},
            {$set: param},
            {upset: true},
            function (err) {
                if (err) throw err;
                cb({result: 'ok'});
            }
        )
    }
};