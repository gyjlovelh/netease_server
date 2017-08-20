var express = require('express');
var router = express.Router();
var appData = require('./data.json');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var path = require('path');

router.post('/', function(req, res, next) {
    res.send(req.body);
});

router.post('/:type', function(req, res, next) {
    console.log(req.body);
    var type = req.param('type');
    // res.send(req.body)
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/resource/tmp';
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        res.send({
            fields,
            files
        });
        // var oldPath = __dirname.replace('/routes','') + '/' + files[type].path;
        // var newPath = oldPath + path.extname(files[type].name);
        // fs.rename(oldPath, newPath, function(err) {
        //     if (err) {
        //         throw err;
        //     }
        //     res.json({
        //         o: oldPath,
        //         n: newPath,
        //         c: files[type]
        //     });
        // });  
    });

});

module.exports = router;
