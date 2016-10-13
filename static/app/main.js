var Vue = require('vue');
var VueRouter = require('vue-router');
var utils = require('./utils/utils.js');

var App = require('./components/app.vue');


Vue.use(VueRouter);


var Login = require('./components/login/main.vue');
var Edit = require('./components/edit/main.vue');
var Index = require('./components/index/main.vue');

function certificate(to, from, next) {
    if (utils.getCookie('login') !== 'true') {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
}

var router = new VueRouter({
    routes: [{
        path: '/login',
        component: Login
    }, {
        path: '/edit',
        component: Edit,
        beforeEnter: certificate
    }, {
        path: '/',
        component: Index,
        beforeEnter: certificate
    }]
})



new Vue(Vue.util.extend({ router: router }, App)).$mount('#app')
