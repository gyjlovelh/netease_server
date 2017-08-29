var Song = require('../models/Song.js');
module.exports = {
    upload: function(param, cb) {
        Song.create(param, function(err) {
            if (err) throw err;
            cb({ok: true});
        });
    },
    queryAll: function(cb) {
        Song.find({}, {_id: 1, name: 1,singer: 1,uploader: 1, types: 1, cover: 1, src: 1, createtime: 1}, {}).populate('uploader').exec((err, result) => {
            if (err) throw err;
            cb(result);
        });
    },
    getSongsByUploader: function(id, cb) {
        Song.find(
            {uploader: id},
            {_id: 1, name: 1,singer: 1, types: 1, cover: 1, src: 1, createtime: 1},
            {},
            function(err, result) {
                if (err) throw err;
                console.log('sgbu', result);
                cb(result);
            }   
        );
    }
};