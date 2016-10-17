<template>
    <!-- <transition name="fade"> -->
    <div>
        <header>
            <nav>
                <ul>
                    <li><a href="/">easyH5</a></li>
                </ul>
            </nav>
            <ul v-if="edit">
                <li>文本</li>
                <li>图片</li>
                <li>背景</li>
                <li>音乐</li>
            </ul>
            <ul v-if="edit">
                <li>保存</li>
                <li>预览</li>
                <li>设置</li>
            </ul>
            <ul>
                <li @click="exit()">退出</li>
                <li>{{user.userName}}</li>
            </ul>
        </header>
        <router-view></router-view>
    </div>
    <!-- </transition> -->
</template>
<script>
    module.exports = {
        data: function() {
            return {
                edit: this.$route.path.split('/')[1] === 'edit',
                user: {}
            }
        },
        created: function() {
            this.$http.get('/api/userInfo')
                .then(this.$utils.throwError)
                .then(function(response) {
                    this.user = response.body.data.user;
                })
                .catch(this.$utils.catchError);
        },
        methods: {
            exit: function(event) {
                this.$http.get('/api/exit')
                    .then(this.$utils.throwError)
                    .then(function(response) {
                        window.location = response.body.data.url
                    })
                    .catch(this.$utils.catchError);
            }
        }
    }
</script>
