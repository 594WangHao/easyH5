<template>
    <div>
        <eh5-head :user="user"></eh5-head>
        <eh5-sidebar-left></eh5-sidebar-left>
        <h1>edit</h1>
    </div>
</template>
<script>
    var Head = require('../common/head.vue');
    var SidebarLeft = require('./sidebarLeft.vue');
    module.exports = {
        props: ['user'],
        data: function() {
            return {
                pageData: {},
            }
        },
        created: function() {
            var _id = this.$route.params._id;
            if (_id.length !== 24) {
                alert('未找到响应作品');
                return;
            }
            this.$http.get('/api/work/' + _id)
                .then(this.$utils.throwError)
                .then(function(response) {

                }).catch(this.$utils.catchError);


        },
        components: {
            'eh5-head': Head,
            'eh5-sidebar-left': SidebarLeft,
        }
    }
</script>
