var express = require('express');
var router = express.Router();
var appData = require('./data.json');
var formidable = require('formidable');
var fs = require('fs');
var path =  require('path');

var UserDao = require('../dao/UserDao.js');
var SongDao = require('../dao/SongDao.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/**
 * 查找歌曲
 */
router.get('/songs', function(req, res, next) {
    SongDao.queryAll(function(result) {
        res.send({result: result});
    });
});
router.get('/types', function(req, res, next) {
    res.send({result: appData.types});
});
/**
 * 上传歌曲
 */
router.post('/upload/song', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/resource/tmp';
    form.parse(req, function(err, fields, files) {
        var _cover = files.cover;
        var _coverExtName = path.extname(_cover.name);
        var _coverNewName = (_cover.path.split('upload_')[0] + _cover.path.split('upload_')[1] + _coverExtName).replace('/tmp/', '/' + _coverExtName.replace('.', '') + '/');
        var _coverOldPath = __dirname.replace('/routes','') + '/' + _cover.path;
        var _coverNewPath = __dirname.replace('/routes', '') + '/' + _coverNewName;
       
        var _src = files.src;
        var _srcExtName = path.extname(_src.name);
        var _srcNewName = (_src.path.split('upload_')[0] + _src.path.split('upload_')[1] + _srcExtName).replace('/tmp/', '/' + _srcExtName.replace('.', '') + '/');
        var _srcOldPath = __dirname.replace('/routes','') + '/' + _src.path;
        var _srcNewPath = __dirname.replace('/routes','') + '/' + _srcNewName;
        
        var _coverDir = __dirname.replace('/routes', '') + '/public/resource/' + _coverExtName.replace('.', '');
        var _srcDir = __dirname.replace('/routes', '') + '/public/resource/' + _srcExtName.replace('.', '');
        try{
            fs.statSync(_coverDir);
        } catch (error) {
            fs.mkdirSync(_coverDir);
        }
        try {
            fs.statSync(_srcDir);
        } catch (error) {
            fs.mkdirSync(_srcDir);
        }
      
        fs.readFile(_coverOldPath, function(err, data) {
            if (err) throw err;
            fs.writeFile(_coverNewPath, data, function(err) {
                if (err) throw err;
                fs.unlink(_coverOldPath, function(err) {
                    if (err) throw err;
                });
            });
        });
        fs.readFile(_srcOldPath, function(err, data) {
            if (err) throw err;
            fs.writeFile(_srcNewPath, data, function(err) {
                if (err) throw err;
                fs.unlink(_srcOldPath, function(err) {
                    if (err) throw err;
                });
            });
        });
        // 储存数据
        var _data = {
            name: fields.name,
            singer: fields.singer,
            types: JSON.parse(fields.types),
            cover: _coverNewName,
            src: _srcNewName
        };
        SongDao.upload(_data, function(result) {
            res.send(result);
        });
    });
});
router.post('/register', function(req, res, next) {
    console.log('param', req.query);

    res.send({result: req.body});
});

module.exports = router;
