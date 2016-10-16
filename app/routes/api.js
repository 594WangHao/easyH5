var express = require('express');
var router = express.Router();
var xss = require('xss');

var utils = require('../utils/utils.js');
var DB = require('../models/DB.js');


router.get('/userInfo', userInfo);
router.get('/exit', exit);

function userInfo(req, res, next) {
    var cookies = req.cookies;
    var username = cookies.username;
    var User = DB.getModel('User');
    User.findOne({
        username: username
    }).then(function(result) {
        res.send(utils.resData({
            user: {
                username: result.username
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

module.exports = router;
