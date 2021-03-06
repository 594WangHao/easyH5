var crypto = require('crypto');
var moment = require('moment')();
var colors = require('colors');

module.exports = {
    checkLogin: function(req, res, next) {

        if (req.session.user || req.cookies.login) {
            next();
        } else {
            // res.redirect('/login?url=' + req.originalUrl);
            // res.send(req.url)
            res.redirect('/login')
        }
    },
    md5: function(string) {
        var md5 = crypto.createHash('md5');
        md5.update('easyH5' + string);
        return md5.digest('hex');
    },
    resData: function(dataOrMsg, code) {
        if (typeof dataOrMsg === 'string') {
            return {
                code: 0 || code,
                message: dataOrMsg,
                time: moment.format(),
            }
        } else {
            return {
                code: 1,
                message: '成功',
                time: moment.format(),
                data: dataOrMsg
            }

        }
    },
    catchError: function(err) {
        console.error(err.stack.red)
    },
}
