var express = require('express');
var router = express.Router();
var xss = require('xss');

var utils = require('../utils/utils.js');
var DB = require('../models/DB.js');


router.get('/userInfo', userInfo);      /*获取用户信息*/
router.get('/exit', exit);              /*退出登录*/
router.post('/create', create);         /*创建作品*/

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
    }).catch(function(err) {
        console.error(JSON.stringify(err).red);
    })
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
    var workName = req.body.workName;
    var userName = req.session.user.userName;

    var Work = DB.getModel('Work');
}

module.exports = router;
