var Mv = require('../models/Mv.js');
module.exports = {
    upload: function(param, cb) {
        Mv.create(param, function(err) {
            if (err) throw err;
            cb({ok: true});
        });
    },
    getMvById: function(id, cb) {
        Mv.findOne(
            {_id: id},
            {_id: 1, name: 1, singer: 1, src: 1, uploader: 1, desc: 1, createtime: 1},
            {},
            function(err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    },
    getMvByUploader: function(id, cb) {
        Mv.find(
            {uploader: id}, 
            {_id: 1, name: 1, singer: 1, src: 1, uploader: 1, desc: 1, createtime: 1}, 
            {}, 
            function(err, result) {
                if (err) throw err;
                cb(result);
            }
        );
    }
}