import types from '../types'
const state = {
    count:90
}
const getters = {
    count(state){
        /* console.log(store)*/
        return state.count
    }
}
const actions = {
    increment({commit,state}){
        commit('types.INCREMENT')
    },
    decrement({commit,state}){
        if(state.count < 10){
            commit('types.DECREMENT')
        }
    }

}
const mutations = {
    [types.INCREMENT](state){
        state.count ++
    },
    [types.DECREMENT](state){
        state.count --
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
