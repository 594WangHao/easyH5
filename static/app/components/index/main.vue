<template>
    <div>
        <eh5-head :user="user"></eh5-head>
        <h1>全部作品</h1>
        <ul>
            <li>
                <button @click="workNameForm = true">新建</button>
            </li>
        </ul>
        <div v-if="workNameForm">
            <form @submit.prevent="create()">
                <input type="text" placeholder="请输入作品名" v-model="workName">
                <button type="submit">确定</button>
            </form>
        </div>
    </div>
</template>
<script>
    var Head = require('../common/head.vue');
    module.exports = {
        props: ['user'],
        data: function() {
            return {
                workNameForm: false,
                workName: '',
            }
        },
        methods: {
            create: function() {
                this.$http.post('/api/create', {
                        workName: this.workName
                    })
                    .then(this.$utils.throwError)
                    .then(function(response) {
                        this.$router.push('/edit/' + response.body.data._id);
                    })
                    .catch(this.$utils.catchError);
            }
        },
        components: {
            'eh5-head': Head,
        }

    }
</script>
