import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
    manageCont:[]
}
const getters = {
    manageCont(){
        return state.manageCont
    }
}
const actions = {
    getContentById({commit,state},classId){
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
                if(data.length !==0 ){
                    alert();
                    commit(types.GET_CONTENTBYID,data)     
                }
                
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
    [types.GET_CONTENTBYID](state,data){
        console.log('data')
        console.log(data)  
        const reformList = data.map(function(obj) { 
        const rObj = {};
        rObj['name'] = obj.name;
        rObj['source'] = obj.source;
        rObj['type'] = obj.type;//类型
        rObj['style'] = obj.style;//样式
        return rObj;
        });//    
        
        console.log('reformList')
        console.log(reformList)
        return state.manageCont = reformList
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
