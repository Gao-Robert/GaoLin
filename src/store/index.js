import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from './state'
import actions from './actions'
import getters from './getters'
import AppContentCategories from './modules/AppContentCategories'
import buildModule from './modules/buildModule'
import Module from './modules/Module'
import changePhoto from './modules/changePhoto'
import contentIssue from './modules/contentIssue'
import contentList from './modules/contentList'
import categoryPic from './modules/categoryPic'

export default new Vuex.Store({
    state,
    actions,
    getters,
    modules:{
        AppContentCategories,
        buildModule,
        Module,
        changePhoto,
        contentIssue,
        contentList,
        categoryPic
    }
})
