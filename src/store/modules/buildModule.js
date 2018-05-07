import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
   buildModuleData : {
    // "name": "",
    // "childName": "",
    // "imgUrl": "" 
   },
   updateBModuleData:{
    "id": "",
    "name": "",
    "childName": "",
    "imgUrl": "",
    "infUrl": ""
   }
}
const getters = {
}

const actions = {
    buildModule({commit,state}){
        console.group('点击保存后打印state.buildModuleData')
        console.log(state.buildModuleData)
        console.groupEnd()
        const data = JSON.stringify({
                "name": state.buildModuleData.name,
                "childName": state.buildModuleData.childName,
                "imgUrl": state.buildModuleData.imgUrl
              })
        console.group('点击保存后打印data')
        console.log(data)
        console.groupEnd()      
        fetch(`${netFile.baseUrl}/cmt/api/app/content/category/create`,{
            method: 'POST',
            headers: netFile.myHeaders,
            mode:'cors',
            body: data    
        })
            .then(function (response) {
                return response.json();     
                /*if(res.data.errno === 0){
                    commit(types.GET_RATINGS,res.data.data)
                }*/
            })
            .then(function (data) {              
                // commit(types.UP_PIC,data)
                /*if(res.data.errno === 0){
                    commit(types.GET_RATINGS,res.data.data)
                }*/
            })
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
    updateModule({commit,state}){
        console.group('点击保存后打印state.updateBModuleData')
        console.log(state.updateBModuleData)
        console.groupEnd()
        const data = JSON.stringify(state.updateBModuleData)
        console.group('点击保存后打印data')
        console.log(data)
        console.groupEnd()      
        fetch(`${netFile.baseUrl}/cmt/api/app/content/category/update`,{
            method: 'PUT',
            headers: netFile.myHeaders,
            mode:'cors',
            body: data    
        })
            .then(function (response) {
                return response.json();     
                /*if(res.data.errno === 0){
                    commit(types.GET_RATINGS,res.data.data)
                }*/
            })
            .then(function (data) {              
                // commit(types.UP_PIC,data)
                console.group('更新栏目内容返回的res')
                console.log(data)
                console.groupEnd() 
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
    // [types.UP_PIC](state,data){
    //     return state.upPic = data
        
    // },
    changeBModuleData(state,msg){
        state.buildModuleData.name = msg.name;
        state.buildModuleData.childName = msg.childName;
    },
    updateBModuleData(state,{x,y}){
        // alert('updateBModuleData函数')//
        const object2 = Object.assign({}, state.buildModuleData);
        object2.id = x //添加对象
        object2.infUrl = y //添加对象
        state.updateBModuleData = object2
        
        console.log('state.updateBModuleData')
        console.log(state.updateBModuleData)
    },//更新栏目增加的条目
    categoryPicUrl(state,url){
        state.buildModuleData.imgUrl=url
        console.group('上传图片后打印state.buildModuleData')
        console.log(state.buildModuleData)
        console.groupEnd()    
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
