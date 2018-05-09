import content from './components/content/content';
/*import modules from './components/modules/modules';*/

const routers = [{
    path: '/',
    redirect: '/content'
}, {
    path: '/content',
    component: content
}, {
    path: '/modules',
    component: (resolve) => require(['./components/module/module.vue'], resolve)
}];
export default routers;