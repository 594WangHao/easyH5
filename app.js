var express = require('express');
// var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config/config.js');
var app = express();

// 视图层模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'static/dist')));
// app.use(favicon(path.join(__dirname, 'static/dist', 'favicon.ico')));

// 配置路由
(function() {
    config.routes.forEach(function(obj) {
        var url = obj.url;
        var name = obj.name;
        var handle = require('./app/routes/' + obj.name);
        app.use(url, handle);
    })
    console.log('路由配置完成');
})()

// 连接数据库
require('./app/lib/connectDB.js')();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render('404');
    } else {
        res.render('error', {
            message: err.message,
            error: {}
        });
    }

});

app.listen(config.port, console.log('服务器启动：' + config.port + '端口'));