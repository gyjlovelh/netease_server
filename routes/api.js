var express = require('express');
var router = express.Router();
var appData = require('./data.json');
var formidable = require('formidable');
var fs = require('fs');
var path =  require('path');

var UserDao = require('../dao/UserDao.js');
var SongDao = require('../dao/SongDao.js');
var MvDao = require('../dao/MvDao.js');
var GeDanDao = require('../dao/GeDanDao.js');
var RoomDao = require('../dao/RoomDao.js');

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
/**
 * 根据上传人查找歌曲
 */
router.get('/getSongsByUploader', function(req, res, next) {
    SongDao.getSongsByUploader(req.query.id, function(result) {
        res.send({result: result});
    });
});
/** 根据id查找mv */
router.get('/getMvById', function(req, res, next) {
    MvDao.getMvById(req.query.id, function(result) {
        res.send({result: result});
    });
});
/** 根据上传人查找MV */
router.get('/getMvByUploader', function(req, res, next) {
    MvDao.getMvByUploader(req.query.id, function(result) {
        res.send({result: result});
    });
});
/**
 * 查找所有Mv
 */
router.get('/getAllMv', function (req, res, next) {
   MvDao.getAllMv(function (result) {
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
            uploader: fields.uploader,
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
/** 上传MV */
router.post('/upload/mv', function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/resource/tmp';
    form.parse(req, function(err, fields, files) {
        var _mv = files.src;
        var _mvExtName = path.extname(_mv.name);
        var _mvNewName = (_mv.path.split('upload_')[0] + _mv.path.split('upload_')[1] + _mvExtName).replace('/tmp/', '/' + _mvExtName.replace('.', '') + '/');
        var _mvOldPath = __dirname.replace('/routes','') + '/' + _mv.path;
        var _mvNewPath = __dirname.replace('/routes', '') + '/' + _mvNewName;
       
        var _mvDir = __dirname.replace('/routes', '') + '/public/resource/' + _mvExtName.replace('.', '');
        try{
            fs.statSync(_mvDir);
        } catch (error) {
            fs.mkdirSync(_mvDir);
        }
      
        fs.readFile(_mvOldPath, function(err, data) {
            if (err) throw err;
            fs.writeFile(_mvNewPath, data, function(err) {
                if (err) throw err;
                fs.unlink(_mvOldPath, function(err) {
                    if (err) throw err;
                });
            });
        });
        // 储存数据
        var _data = {
            name: fields.name,
            uploader: fields.uploader,
            singer: fields.singer,
            desc: fields.desc,
            src: _mvNewName
        };
        MvDao.upload(_data, function(result) {
            res.send(result);
        });
    });
});
/**
 * 上传用户头像
 */
router.post('/upload/userCover', function (req, res, next) {
     var form = new formidable.IncomingForm();
     form.uploadDir = 'public/resource/tmp';
     form.parse(req, function (err, fileds, files) {
         var _cover = files.cover;
         var _coverExtName = path.extname(_cover.name);
         var _coverNewName = (_cover.path.split('upload_')[0] + _cover.path.split('upload_')[1] + _coverExtName).replace('/tmp/', '/' + _coverExtName.replace('.', '') + '/');
         var _coverOldPath = __dirname.replace('/routes','') + '/' + _cover.path;
         var _coverNewPath = __dirname.replace('/routes', '') + '/' + _coverNewName;

         var _coverDir = __dirname.replace('/routes', '') + '/public/resource/' + _coverExtName.replace('.', '');
         try{
             fs.statSync(_coverDir);
         } catch (error) {
             fs.mkdirSync(_coverDir);
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
         // 储存数据
         var _data = {
             id: fileds.id,
             cover: _coverNewName
         };
         UserDao.uploadCover(_data, function(result) {
             res.send(result);
         });
     });

});
/**
 * 上传歌单封面
 */
router.post('/upload/gdCover', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'public/resource/tmp';
    form.parse(req, function (err, fileds, files) {
        var _cover = files.cover;
        var _coverExtName = path.extname(_cover.name);
        var _coverNewName = (_cover.path.split('upload_')[0] + _cover.path.split('upload_')[1] + _coverExtName).replace('/tmp/', '/' + _coverExtName.replace('.', '') + '/');
        var _coverOldPath = __dirname.replace('/routes','') + '/' + _cover.path;
        var _coverNewPath = __dirname.replace('/routes', '') + '/' + _coverNewName;

        var _coverDir = __dirname.replace('/routes', '') + '/public/resource/' + _coverExtName.replace('.', '');
        try{
            fs.statSync(_coverDir);
        } catch (error) {
            fs.mkdirSync(_coverDir);
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
        // 储存数据
        var _data = {
            _id: fileds._id,
            cover: _coverNewName
        };
        GeDanDao.updateGD(_data, function(result) {
            res.send(result);
        });
    });
});
/**
 * 用户注册
 */
router.post('/register', function(req, res, next) {
    UserDao.register(req.body, function(result) {
        GeDanDao.createGeDan({creator: result._id, name: '我的最爱'}, function () {
            res.send({result: result});
        });
    });
});
/**
 * 用户登录
 */
router.post('/login', function(req, res, next) {
    UserDao.login(req.body, function(result) {
        res.send({result: result});
    });
});
/**
 * 根据用户id查询用户信息
 */
router.post('/findUserById', function(req, res, next) {
    UserDao.findUserById(req.body, function(result) {
        res.send({result: result});
    });
});
/**
 * 个人设置
 */
router.post('/updateUser', function (req, res, next) {
    UserDao.updateUser(req.body, function (result) {
        res.send({result: result});
    });
});
/**
 * 新建歌单
 */
router.post('/createGeDan', function (req, res, next) {
    GeDanDao.createGeDan(req.body, function (result) {
        res.send({result: result});
    });
});
/**
 * 查询用户创建的歌单
 */
router.get('/findGDByUserId', function (req, res, next) {
    GeDanDao.findGDByUserId(req.query.id, function (result) {
        res.send({result: result});
    });
});
/**
 * 查询所有歌单信息
 */
router.get('/findAllGD', function (req, res, next) {
    GeDanDao.findAllGD(function (result) {
        res.send({result: result});
    });
});
/**
 * 查询歌单详情
 */
router.get('/findGDById', function (req, res, next) {
    GeDanDao.findGDById(req.query.id, function (result) {
        res.send({result: result});
    });
});
/**
 * 设置歌单信息
 */
router.post('/updateGD', function (req, res, next) {
    GeDanDao.updateGD(req.body, function (result) {
        res.send({result: result});
    });
});
/**
 * 收藏歌曲到歌单
 */
router.post('/addSongToGD', function (req, res, next) {
    GeDanDao.addSongToGD(req.body, function (result) {
        res.send({result: result});
    });
});

/**
 * 拖拽页面接口
 */
router.get('/findAllRoom', function (req, res, next) {
    RoomDao.findAllRoom(function (result) {
        res.send({result: result});
    });
});

router.post('/createRoom', function (req, res, next) {
    RoomDao.createRoom(req.body, function (result) {
        res.send({result: result});
    }) ;
});

router.post('/updateRoom', function (req, res, next) {
    RoomDao.updateRoom(req.body, function (result) {
        res.send({result: result});
    });
});

router.post('/deleteRoom', function (req, res, next) {
    RoomDao.deleteRoom(req.body, function (result) {
        res.send({result: result});
    });
});

module.exports = router;
