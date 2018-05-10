import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import store from './store';
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueQuillEditor, /* { default global options } */)

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    store.dispatch('getAppContentCategories')  //进入每一个route之前获取栏目id及名字，这样就不用进入每一个页面都要调取一遍
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    store,
    router: router,
    render: h => h(App)
});


