var GeDao = require('../models/GeDan.js');

module.exports = {
    createGeDan: function (param, cb) {
        GeDao.create(param, function (err) {
            if (err) throw err;
            GeDao.find(
                {creator: param.creator},
                {creator: 1, name: 1, label: 1, desc: 1, cover: 1, createtime: 1, songs: 1, num: 1},
                {},
                function (err, result) {
                    if (err) throw err;
                    cb(result);
                }
            );
        });
    },
    findAllGD: function (cb) {
        GeDao.find(
            {},
            {creator: 1, name: 1, label: 1, desc: 1, cover: 1, createtime: 1, songs: 1, num: 1},
            {}
        ).populate('creator').exec(function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    findGDByUserId: function (param, cb) {
        GeDao.find(
            {creator: param},
            {creator: 1, name: 1, label: 1, desc: 1, cover: 1, createtime: 1, songs: 1, num: 1},
            {},
            function (err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    },
    findGDById: function (param, cb) {
        GeDao.findOne(
            {_id: param},
            {creator: 1, name: 1, label: 1, desc: 1, cover: 1, createtime: 1, songs: 1, num: 1},
            {}
        ).populate('creator').exec(function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateGD: function (param, cb) {
        GeDao.update(
            {_id: param._id},
            {$set: param},
            {upset: true},
            function (err) {
                if (err) {
                    cb('ok');
                }
            }
        );
    }
};