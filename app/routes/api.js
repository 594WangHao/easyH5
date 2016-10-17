var express = require('express');
var router = express.Router();
var xss = require('xss');

var utils = require('../utils/utils.js');
var DB = require('../models/DB.js');


router.get('/userInfo', userInfo); /*获取用户信息*/
router.get('/exit', exit); /*退出登录*/
router.post('/create', create); /*创建作品*/
router.get('/work/:_id', getWork) /*查询作品信息*/

function userInfo(req, res, next) {
    var cookies = req.cookies;
    var userName = cookies.userName;
    var User = DB.getModel('User');
    User.findOne({
        userName: userName
    }).then(function(result) {
        res.send(utils.resData({
            user: {
                userName: result.userName
            }
        }))
    }).catch(utils.catchError)
}

function exit(req, res, next) {
    var cookies = req.cookies;
    delete req.session.user;
    res.cookie('login', 'false', { expires: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), httpOnly: true });
    res.send(utils.resData({
        url: '/login'
    }));
}


function create(req, res, next) {
    var workName = xss(req.body.workName);
    var userName = req.session.user.userName;

    var Work = DB.getModel('Work');

    Work.findOne({
        workName: workName
    }).then(function(result) {
        if (result) {
            res.send(utils.resData('作品名重复'));
            return;
        }
        var work = new Work({
            workName: workName,
            userName: userName,
            createTime: Date.now(),
            lastSaveTime: Date.now()
        })

        work.save().then(function(result) {
            res.send(utils.resData({
                _id: result._id
            }))
        }).catch(utils.catchError);

    }).catch(utils.catchError);

}

function getWork(req, res, next) {
    var Work = DB.getModel('Work');
    var _id = req.params._id;
    if (_id.length !== 24) {
        res.send(utils.resData('未找到相应作品'));
        return;
    }
    Work.findOne({
        _id: req.params._id
    }).then(function(result) {
        if (!result) {
            res.send(utils.resData('未找到相应作品'))
            return;
        }
        res.send(utils.resData(result))

    }).catch(utils.catchError);


}

module.exports = router;
