var express = require('express');
var router = express.Router();
var xss = require('xss');
var mongoose = require('mongoose');
var crypto = require('crypto');
var moment = require('moment')();

router.get('/', index); // 首页
router.get('/login', getLogin)
router.post('/login', postLogin); /*登录*/
router.post('/register', register); /*注册*/

function index(req, res, next) {
    res.render('index', {
        title: 'easyH5'
    });
}


function getLogin(req, res, next) {
    res.render('login', {
        title: '登录'
    })
}

function postLogin(req, res, next) {
    // body...
}

function register(req, res, next) {
    res.send({
        code: 1,
        message: '成功',
        responseTime: moment.format(),
        data: {}
    });
}

module.exports = router;
