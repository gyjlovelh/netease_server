var Room = require('../models/Room.js');

module.exports = {
    findAllRoom: function (cb) {
        Room.find(
            {},
            {},
            {}
        ).exec(function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    createRoom: function (param, cb) {
        Room.create(param, function (err) {
            if (err) throw err;
            Room.find(
                {},
                {},
                {}
            ).exec(function (err, result) {
                if (err) throw err;
                cb(result);
            });
        });
    },
    updateRoom: function (param, cb) {
        Room.update(
            {_id: param._id},
            {$set: param},
            {upsert: true}
        ).exec(function (err) {
            if (err) throw err;
            Room.find(
                {},
                {},
                {}
            ).exec(function (err, result) {
                if (err) throw err;
                cb(result);
            });
        })
    },
    deleteRoom: function (param, cb) {
        Room.remove(
            {_id: param._id}
        ).exec(function (err) {
            if (err) throw err;
            Room.find(
                {},
                {},
                {}
            ).exec(function (err, result) {
                if (err) throw err;
                cb(result)
            });
        })
    }
};