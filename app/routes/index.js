var express = require('express');
var router = express.Router();


router.get('/', inedx); // 首页

function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
}

module.exports = router;