var mongoose = require('mongoose');
var config = require('../../config/config.js');
var fs = require('fs');
var path = require('path');

module.exports = function() {
    var db = mongoose.connect(config.uri, function(err) {
        if (err) {
            console.error('无法连接到数据库');
            console.log(err);
            return
        }
        console.log('连接数据库成功');
        //自动连接模型
        fs.readdirSync(path.join(__dirname, '../models')).forEach(function(name) {
            require('../models/' + name);
            console.log('读取模型完成');
        });
    });
    mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    });
    return db;
}