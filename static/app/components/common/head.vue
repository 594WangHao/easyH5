<template>
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
</template>
<script>
    module.exports = {
        props: ['user'],
        data: function() {
            return {
                edit: this.$route.path.split('/')[1]
            }
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
