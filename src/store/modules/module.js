import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
    colcontent:[],
    colList:[]//栏目名字以及ID
}
const getters = {
    colcontent(){
        return state.colcontent
    },
    colList(){
        for(var i=0,l=state.colcontent.length;i<l;i++){
            state.colList.push({'label':state.colcontent[i].name,'value':state.colcontent[i].id})
		
        }       
        
        return state.colList
        
    }//轮播图栏目名称
}

const actions = {
    getAppContentCategories({commit,state}){
        fetch(`${netFile.baseUrl}/cmt/api/app/content/category/get`,{
              
                headers: netFile.myHeaders,
                mode:'cors'
        })
            .then(function (response) {
                console.log('res')
                console.log(response)
                // console.log('res.json()')
                // console.log(response.json()) //这里用了json.response.bodyUsed就变成true了无法在使用               
                return response.json();             
            })
            .then(function(data) {
                console.log('获取已创建栏目信息getAppContentCategories-res')
                console.log(data)
                if(data != null&&data!= ''){
                    commit(types.GET_COLCONTENT,data)     
                }
                
              })//
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
    deleteAppContentCategory({commit,state},data){
            console.log('要删除的id')
            console.log(data)
        fetch(`${netFile.baseUrl}/cmt/api/app/content/category/${data}`,{
                method:'delete',
                headers: netFile.myHeaders,
                mode:'cors'
        })
            .then(function (response) {
                console.log('res')
                console.log(response)
                // console.log('res.json()')
                // console.log(response.json()) //这里用了json.response.bodyUsed就变成true了无法在使用               
                return response.json();             
            })
            .then(function(data) {
                console.log('获取删除栏目返回信息')
                console.log(data)
                if(data.status == 'OK'){
                     
                }else{alert('删除失败')}
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
    [types.GET_COLCONTENT](state,data){  
        
        return state.colcontent = data
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}
