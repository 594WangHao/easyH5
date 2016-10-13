var mongoose = require('mongoose');
var config = require('../../config/config.js');
var fs = require('fs');
var path = require('path');

module.exports = function() {
    var db = mongoose.connect(config.DBUri, function(err) {
        if (err) {
            console.error('无法连接到数据库'.red, err.toString().red);
            process.exit(0);
        }
        console.log('连接数据库成功'.green);
        //自动连接模型
        fs.readdirSync(path.join(__dirname, '../models')).forEach(function(name) {
            require('../models/' + name);
            console.log('读取模型完成'.green);
        });
    });
}