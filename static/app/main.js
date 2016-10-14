var Vue = require('vue');
var VueRouter = require('vue-router');
var VueResource = require('vue-resource');
var utils = require('./utils/utils.js');

Vue.use(VueRouter);
Vue.use(VueResource);

var App = require('./components/app.vue');
var Edit = require('./components/edit/main.vue');
var Index = require('./components/index/main.vue');


var router = new VueRouter({
    routes: [
    {
        path: '/edit/:id',
        component: Edit,
    }, {
        path: '/',
        component: Index,
    }]
})



new Vue(Vue.util.extend({ router: router }, App)).$mount('#app')
