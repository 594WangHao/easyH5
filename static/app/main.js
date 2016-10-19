var Vue = require('vue');
var VueRouter = require('vue-router');
var Vuex = require('vuex');
var VueResource = require('vue-resource');

var Utils = require('./utils/utils.js');

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(Utils);

var App = require('./components/app.vue');
var Edit = require('./components/edit/main.vue');
var Index = require('./components/index/main.vue');


var router = new VueRouter({
    routes: [
    {
        path: '/edit/:_id',
        component: Edit,
    }, {
        path: '/',
        component: Index,
    }]
})



new Vue(Vue.util.extend({ router: router }, App)).$mount('#app')
