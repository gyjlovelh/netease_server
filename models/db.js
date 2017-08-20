var mongoose = require('mongoose');
var mongoConfig = 'mongodb://localhost/netease';
var promise = mongoose.createConnection(mongoConfig, {
    useMongoClient: true
});

promise.then(function() {
    console.log('>>>>>>>>  ' + mongoConfig + '  <<<<<<<<<<<< connect suceess');
});

module.exports = promise;