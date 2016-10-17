<template>
    <div>
        <h1>edit</h1>
    </div>
</template>
<script>
    module.exports = {
        data: function () {
            return {
                work:{},
            }
        },
        created: function () {
            console.log()
            var _id = this.$route.params._id;
            this.$http.get('/api/work/' + _id)
            .then(this.$utils.throwError)
            .then(function (response) {
                console.log(response.body.data);
            }).catch(this.$utils.catchError)
        }
    }
</script>