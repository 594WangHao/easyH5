var crypto = require('crypto');

module.exports = {
    checkLogin: function(req, res, next) {
        if (req.session.user || req.cookies.login) {
            next();
        } else {
            res.redirect('/login?url=' + req.originalUrl);
        }
    },
    md5: function(string) {
        var md5 = crypto.createHash('md5');
        md5.update('easyH5' + string);
        return md5.digest('hex');
    }

}
