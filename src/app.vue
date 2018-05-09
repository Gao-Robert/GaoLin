
<template>
    <div class="app">
        <div class="layout">
            <Layout>
                <Header>
                    <p class="title">App内容管理发布工具</p>
                    <Menu mode="horizontal" theme="dark"   active-name= "0">
                        <div class="icon" >
                            <Icon type="ios-home-outline" size="20" color="hsla(0,0%,100%,.7)"></Icon>
                        </div>
                        <div class="layout-logo">
                        </div>
                        <div class="layout-nav">
                            <MenuItem name="1">
                                <Icon type="person"></Icon>
                                Admin
                            </MenuItem>
                            <MenuItem name="2">
                                <Icon type="log-out"></Icon>

                            </MenuItem>

                        </div>
                    </Menu>
                </Header>
                <Layout>
                    <Sider hide-trigger :style="{background: '#fff'}">
                        <Menu
                        @on-select='toBuildModule' 
                        theme="light" width="auto" :open-names="['2']"   active-name="module"
                        >
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-navigate"></Icon>
                                    <router-link to="/start" :class="deBlue">
                                        App启动
                                    </router-link>
                                </template>
                                <!-- <MenuItem name="test">
                                  
                                        实验模块
                                    
                                </MenuItem>
                                <MenuItem name="categoryPic">
                                    
                                        categoryPic.vue
                                  
                                </MenuItem>
                                <MenuItem name="handUploadPic">
                                    
                                        handUploadPic
                                    
                                </MenuItem>
                                <MenuItem name="handUploadPicDefault">
                                   
                                        handUploadPicDefault
                               
                                </MenuItem>
                                <MenuItem name="table">
                                   
                                        table
                                   
                                </MenuItem> -->
                            </Submenu>
                            <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                        栏目模块                                   
                                </template>                                                     
                                    <MenuItem name="module" >
                                    栏目列表
                                    </MenuItem>    
                                    <MenuItem name="buildModule" >
                                    栏目创建
                                    </MenuItem>                                                         
                                    <MenuItem name="changePhoto">
                                        轮播图片编辑
                                    </MenuItem>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                        内容管理
                                </template>
                                <MenuItem name="contentList"> 
                                        内容列表                           
                                </MenuItem>
                                <MenuItem name="contentIssue"> 
                                        内容发布                           
                                </MenuItem>
                               
                            </Submenu>
                        </Menu>
                    </Sider>
                    <Layout :style="{padding: '0 24px 24px',minHeight:'100%'}">
                        <Breadcrumb :style="{margin: '24px 0'}">
                            <!-- <BreadcrumbItem>Home</BreadcrumbItem>
                            <BreadcrumbItem>{{this.$route.path}}</BreadcrumbItem> -->
                        </Breadcrumb>
                        <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
                            <keep-alive>
                                <router-view></router-view>
                            </keep-alive>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </div>
    </div>

</template>
<script>
    export default {
        created(){
            this.deBlue = 'deBlue'
        },
        methods:{
            toBuildModule(name){
               
                this.$router.push({path:`/${name}`})
            }
        }
    }
</script>
<style scoped>
    .app{
        height:100%
    }
    .layout{
        height:100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .ivu-layout{
        height:100%
    }
    .title{
        position: absolute;
        top: 19px;
        display: block;
        width: 250px;
        color: white;
        left: 50%;
        z-index: 901;
        margin-left: -125px;
        text-align: center;
        line-height: 20px;
        height: 20px;
        font-size: 20px;
    }
    .layout-logo{
        width: 100px;
        height: 30px;
        /*background: #5b6270;*/
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }
    .layout-nav{
        width: 162px;
        margin: 0 auto;
        margin-right: 0;
    }
   .ivu-layout-content{
        overflow: auto;
    }
    .deBlue{
        color: #495060!important;
    }
    .icon{
        width: 30px;
        padding-top: 4px;
        float: left;
    }
   
</style>