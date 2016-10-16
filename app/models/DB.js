'use strict';

var mongoose = require('mongoose');

var config = require('../../config/config.js');
var models = require('./models.js');

var Schema = mongoose.Schema;

var DB = {
    setModel: function() {
        mongoose.connect(config.DBUri, function(err) {
            if (err) {
                console.error('无法连接到数据库'.red, err.toString().red);
                process.exit(0);
            }
            console.log('连接数据库成功'.green);
            for (var key in models) {
                mongoose.model(key, new Schema(models[key]));
            }
            console.log('模型配置成功'.green);
        })
    },
    getModel: function(type) {
        if (typeof type !== 'string') {
            console.error('请检查你的type'.red);
            return;
        }
        return mongoose.model(type);
    },


};
module.exports = DB;
