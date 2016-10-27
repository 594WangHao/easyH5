<template>
    <!-- <transition name="fade"> -->
    <div>
        <router-view :user="user"></router-view>
    </div>
    <!-- </transition> -->
</template>
<script>
    module.exports = {
        data: function() {
            return {
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

    }
</script>


