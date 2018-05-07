<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div>
        <v-header></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/content">商品</router-link>
            </div>
            <div class="tab-item">
                <router-link to="/module">评论</router-link>
            </div>
        </div>
        <keep-alive>
            <router-view ></router-view>
        </keep-alive>
    </div>
</template>
<script>
    import header from './components/header/header.vue'
    export default {
        data () {
            return {}
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        },
        components:{
            'v-header':header
        }
    }
</script>
