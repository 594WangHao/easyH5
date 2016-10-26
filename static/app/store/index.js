var Vue = require('vue');
var Vuex = require('vuex');

var work = require('./modules/work.js');
var actions = require('./actions.js')

Vue.use(Vuex);

module.exports = new Vuex.Store({
    modules: {
        work: work
    },
    actions: actions
})
