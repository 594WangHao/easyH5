<template>
    <aside>
        <h3>页面列表</h3>
        <ul>
            <li v-for="(item,index) in pageData.list" @click="selectPage(index)">
                <span>第{{index + 1}}页</span>
                <span @click="delPage(index)">x</span>
            </li>
        </ul>
    </aside>
</template>
<script>
    module.exports = {
        props: ['pageData'],
        methods: {
            selectPage: function(index) {
                this.pageData.currentpage = index;
                console.log(this.pageData)
            },
            delPage: function(index) {
                this.pageData.list.splice(index, 1)
            }
        }
    }
</script>
