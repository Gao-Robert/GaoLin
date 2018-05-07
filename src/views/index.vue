<template>
    <div class="index">
        <v-header></v-header>
        <div class="content">
            <div class="leftMenu">
                <Row>
                    <Col span="2">
                    <Menu :theme="theme2">
                        <Submenu name="1">
                            <template slot="title">
                                <router-link to="/start"><Icon type="ios-paper"></Icon>
                                    内容管理
                                </router-link>
                            </template>
                            <MenuItem name="1-1">文章管理</MenuItem>
                            <MenuItem name="1-2">评论管理</MenuItem>
                            <MenuItem name="1-3">举报管理</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-people"></Icon>
                                用户管理
                            </template>
                            <MenuItem name="2-1">新增用户</MenuItem>
                            <MenuItem name="2-2">活跃用户</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="stats-bars"></Icon>
                                统计分析
                            </template>
                            <MenuGroup title="使用">
                                <MenuItem name="3-1">新增和启动</MenuItem>
                                <MenuItem name="3-2">活跃分析</MenuItem>
                                <MenuItem name="3-3">时段分析</MenuItem>
                            </MenuGroup>
                            <MenuGroup title="留存">
                                <MenuItem name="3-4">用户留存</MenuItem>
                                <MenuItem name="3-5">流失用户</MenuItem>
                            </MenuGroup>
                        </Submenu>
                    </Menu>
                    </Col>
                </Row>
            </div>
            <div class="rightContent">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import header from '../components/header/header'
    export default {
        data(){
           return {
               theme2:'dark'
           }
        },
        methods: {
            handleStart () {
                this.$Modal.info({
                    title: 'Bravo',
                    content: 'Now, enjoy the convenience of iView.'
                });
            }
        },
        components:{
            'v-header':header
        }
    }
</script>
<style scoped lang="less">
    .index{
        width: 100%;
        display:flex;
        text-align: center;
        .content{
            position:absolute;
            top:20px;
            display: flex;
            .leftMenu{
                flex: 1;
                .ivu-row {
                    margin-left: -39px;
                }
            }
            .rightContent{
                flex: 1;
            }
        }

    }
</style>
