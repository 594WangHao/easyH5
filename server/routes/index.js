var express = require('express');
var router = express.Router();


router.get('/', index); // 首页

function index(req, res, next) {
    res.render('index', {
        title: 'easyH5'
    });
}

module.exports = router;
