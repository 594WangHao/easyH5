<template>
    <div>
        <eh5-head :user="user"></eh5-head>
        <eh5-sidebar-left :page-data.sync="pageData"></eh5-sidebar-left>
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
                    var work = {
                        data: {
                            pageData: {
                                currentPage: 0,
                                list: [{
                                    name: 'ddddd'
                                }, {
                                    name: 'ssssss'
                                }]
                            }
                        }
                    };
                    this.pageData = work.data.pageData;
                }).catch(this.$utils.catchError);
                var _this = this;
            setInterval(function() {
                console.log(_this.pageData.currentPage);
            }, 1000)
        },
        components: {
            'eh5-head': Head,
            'eh5-sidebar-left': SidebarLeft,
        }
    }
</script>
