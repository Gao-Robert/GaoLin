import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
    categoryPicHas:''
}
const getters = {
    categoryPicHas(state){
        return state.categoryPicHas
    }
}
const actions = {
}
const mutations = {
    categoryPicHas(state,flag){  
        console.log('flag')
        console.log(flag)
        state.categoryPicHas = flag
        console.log('this.state.categoryPicHas')
        console.log(this.state.categoryPicHas)
      
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
