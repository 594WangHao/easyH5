'use strict';

module.exports = {
    user: {
        username: { type: String, require: true },
        password: { type: String, require: true },
        /*权限 用户：1 管理员：7 超级管理员：9*/
        jurisdiction: { type: Number, require: true, default: 1 }
    }
}
