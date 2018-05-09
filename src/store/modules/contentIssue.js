import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
    getAppDynamicFind:[],
    Contchangeable :false
}
const getters = {
    getAppDynamicFind (state){
        return state.getAppDynamicFind
    },
    Contchangeable (state){
        return state.Contchangeable
    },
}
// const data = {
//     "name": "甲状腺结节",            //标题
//     "description": "testtest",      //描述
//     "source": "精确医疗",             //来源                
//     "style": 1,                    //app样式，多少张图片，数值就为多少
//     "photoUrl": [],                //照片地址
//     "contentUrl": "/baike/57bc09def0b433a9e00e191b_0.html", //内容url
//     "commentId": "",
//     "classId": "57e23cc738328f6996319b47", //栏目ID
//     "type": 1  // 1为网站内容 ， 2 为广告
// }
const actions = {

    getAppDynamicFind({commit,state},classId){
        fetch(`${netFile.baseUrl}/cmt/api/app/dynamic/find/class/${classId}`,{ 
                headers: netFile.myHeaders,
                mode:'cors'
        })
            .then(function (response) {                 
                return response.json();             
            })
            .then(function(data) {
                console.log('根据Id获取内容res') 
                console.log(data)
                if(data.length !=0 ){
                    alert(data.length !=0);
                    state.Contchangeable = true
                    commit(types.GET_APPDYNAMIC,data)     
                }             
              })//
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
    createAppDynamicFind({commit,state},data){
        console.log('提交创建内容发布后发送的数据data') 
        console.log(data)
        fetch(`${netFile.baseUrl}/cmt/api/app/dynamic/find`,{ 
                method:'post',
                headers: netFile.myHeaders,
                mode:'cors',
                body: JSON.stringify(data)
        })
            .then(function (response) {                 
                return response.json();             
            })
            .then(function(data) {
                console.log('提交创建内容后获取的数据res') 
                console.log(data)
                // commit(types.CREATE_PHOTOS,data)
              })//
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
    [types.GET_APPDYNAMIC](state,data){  
        return state.getAppDynamicFind = data
    },
    // [types.CREATE_PHOTOS](state,data){  
        
    //     // return state.defaultList = data
    // },
}
export default {
    state,
    getters,
    actions,
    mutations
}
