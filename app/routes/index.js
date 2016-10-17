var express = require('express');
var router = express.Router();
var xss = require('xss');

var utils = require('../utils/utils.js');
var DB = require('../models/DB.js');

router.get('/', utils.checkLogin, index); /*首页*/
router.get('/login', getLogin)
router.post('/login', postLogin); /*登录*/
router.post('/register', register); /*注册*/

function index(req, res, next) {
    if (!req.session.user) {
        req.session.user = {
            userName: req.cookies.userName
        }
    }
    res.render('index', {
        title: 'easyH5'
    });
}


function getLogin(req, res, next) {
    res.render('login', {
        title: '登录',
        url: req.query.url ? req.query.url : '/'
    })
}

function postLogin(req, res, next) {
    var userName = xss(req.body.userName);
    var password = xss(req.body.password);
    var weekLogin = xss(req.body.weekLogin);
    var User = DB.getModel('User');
    User.findOne({
            userName: userName,
            password: utils.md5(password)
        })
        .then(function(result) {
            if (!result) {
                // res.send({
                //     code: 0,
                //     message: '用户名或密码错误',
                //     time: moment.format(),
                // })
                res.send('<script>alert("用户名或密码错误")</script>')
            } else {
                req.session.user = result;
                //     res.send({
                //         code: 1,
                //         message: '成功',
                //         time: moment.format(),
                //         data: {
                //             url: req.query.url ? req.query.url : '/'
                //         }
                //     });
                if (weekLogin === 'on') {
                    res.cookie('login', true, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
                    res.cookie('userName', userName, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), httpOnly: true });
                }
                res.redirect(req.query.url ? req.query.url : '/');
            }
        })
}

function register(req, res, next) {
    var userName = xss(req.body.regUserName);
    var regPassword = xss(req.body.regPassword);
    var regPasswordAgain = xss(req.body.regPasswordAgain);
    console.log(userName,regPassword, regPassword)
    if (regPassword !== regPasswordAgain) {
        // res.send({
        //     code: 0,
        //     message: '两次输入密码不同',
        //     time: moment.format(),
        // });
        res.send('<script>alert("两次输入密码不同")</script>')
    } else {
        var User = DB.getModel('User');
        User.findOne({ userName: userName })
            .then(function(result) {
                if (result) {
                    // res.send({
                    //     code: 0,
                    //     message: '用户名重复',
                    //     time: moment.format(),
                    // })
                    res.send('<script>alert("用户名已存在")</script>')
                } else {
                    var user = new User({
                        userName: userName,
                        password: utils.md5(regPassword),
                        createTime: Date.now()
                    })
                    user.save(function(err, results) {
                        if (err) throw err;
                        // res.send({
                        //     code: 1,
                        //     message: '成功',
                        //     time: moment.format(),
                        //     data: {
                        //         url: req.query.url ? req.query.url : '/'
                        //     }
                        // });
                        res.redirect(req.query.url ? req.query.url : '/');
                    });
                }
            })
            .catch(utils.catchError)
    }
}


module.exports = router;
