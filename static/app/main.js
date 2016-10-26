var Vue = require('vue');
var VueRouter = require('vue-router');
var Vuex = require('vuex');
var VueResource = require('vue-resource');

var utils = require('./utils/utils.js');
var store = require('./store/index.js');

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);

Vue.use(utils);

var App = require('./components/app.vue');
var Edit = require('./components/edit/main.vue');
var Index = require('./components/index/main.vue');


var router = new VueRouter({
    routes: [{
        path: '/edit/:_id',
        component: Edit,
    }, {
        path: '/',
        component: Index,
    }]
})


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: (function(h) {
        return h(App)
    })
})


