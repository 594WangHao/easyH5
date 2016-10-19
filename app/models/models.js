'use strict';

module.exports = {
    User: {
        'userName': { type: String, require: true },
        'password': { type: String, require: true },
        /*权限 用户：1 管理员：7 超级管理员：9*/
        'jurisdiction': { type: Number, require: true, default: 1 },
        'createTime': { type: Number, require: true }
    },
    Work: {
        'userName': { type: String, require: true },
        'workName': { type: String, require: true },
        'createTime': { type: Number, require: true },
        'lastSaveTime': { type: Number, require: true },
        'about': { type: Object, required: true, default: {} },
        /*主要内容*/
        'data': { type: Object, required: true, default: {} },
        /*设置信息*/
        'config': { type: Object, required: true, default: {} },
        /*保存记录的数组*/
        'saveRecord': { type: Object, required: true, default: {} },
        /*状态 0：草稿 1：发布*/
        'status': { type: Number, require: true, default: 0 },

    }
}
