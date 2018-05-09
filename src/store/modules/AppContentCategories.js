import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
    total:{name:2}
}
const getters = {
    total(state){
        return state.total
    }
}
var uri = encodeURI(netFile.baseUrl)

const actions = {

    getTotal({commit,state}){
        console.group('netFile')
        console.log(netFile)
        console.groupEnd()
        console.group('uri')
        console.log(uri)
        console.groupEnd()
        fetch(`${netFile.baseUrl}/cmt/api/files`,{
                method: 'POST',
                headers: netFile.upFiles,
              /*  mode: 'no-cors'*/
               mode:'cors',
            //    body: JSON.stringify({
            //     'files':'@/home/accurme/下载/Mattermost.apk'
            //   })//test
        })
            .then(function (res) {
                console.log(res)
                commit(types.GET_TOTAL,res)
                /*if(res.data.errno === 0){
                    commit(types.GET_RATINGS,res.data.data)
                }*/
            })
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
    /*!// Want to use async/await? Add the `async` keyword to your outer function/method.
    async function getRatings() {
      try {
        const res = await axios.get('/api/ratings');
        if(res.data.errno === 0){
          commit(types.GET_RATINGS,res.data.data)
        }
      } catch (error) {
        console.error(error);
      }
    }*/

}
const mutations = {
    [types.GET_TOTAL](state,data){
        return state.total = data
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
