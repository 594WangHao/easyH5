var colors = require('colors');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user_name: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
});

mongoose.model('User', UserSchema);

console.log('用户模型已建立'.green);