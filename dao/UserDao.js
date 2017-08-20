var User = require('../models/User.js');
module.exports = {
    register: function (param, cb) {
        console.log('param', param);
        User.create(param, function(err) {
            console.log('saved');
            cb(err, param);
        });
    }
};