const routers = [
    /*{
        path: '/',
        redirect:'/start',
        component: (resolve) => require(['./components/start/start.vue'], resolve)
    },*/ //一个错误的写法
    {
        path: '/',
        redirect:'/module'
    },
    {
        path:'/start',
        component: (resolve) => require(['./components/start/start.vue'], resolve)
    },
    {
        path:'/module',
  /*      meta: {
            title: ''
        },*/
        component: (resolve) => require(['./components/module/module.vue'], resolve),
    }, 
    {
        path:'/buildModule',
        component: (resolve) => require(['./components/buildModule/buildModule.vue'], resolve) 
    },
    {
        path:'/test',
        component: (resolve) => require(['./components/test/test.vue'], resolve) 
    },
    {
        path:'/table',
        component: (resolve) => require(['./components/test/table.vue'], resolve) 
    },
    {
        path:'/handUploadPic',
        component: (resolve) => require(['./components/test/handUploadPic.vue'], resolve) 
    },
    {
        path:'/handUploadPicDefault',
        component: (resolve) => require(['./components/test/handUploadPicDefault.vue'], resolve) 
    },
    {
        path:'/categoryPic',
        component: (resolve) => require(['./components/buildModule/categoryPic.vue'], resolve) 
    },
    {
        path:'/changePhoto',
        component: (resolve) => require(['./components/buildModule/changePhoto.vue'], resolve) 
    },
    {
        path:'/contentList',
        component: (resolve) => require(['./components/content/contentList.vue'], resolve) 
    },
    {
        path:'/contentIssue',
        component: (resolve) => require(['./components/content/contentIssue.vue'], resolve) 
    }
       
            
   
    

];
export default routers;