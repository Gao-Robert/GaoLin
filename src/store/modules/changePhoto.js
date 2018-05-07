import types from '../types'
import 'whatwg-fetch'
import netFile from '../../utils/netFile.js'
const state = {
    getAppPhotosChangeByClassId:[],
    defaultList: [],//已有的轮播图
    picContentEdit:[],
    chanable:false// 根据ID获取轮播图是否有数据返回，没有则false
}
const getters = {
    defaultList(state){
        return state.defaultList
    },
    picContentEdit(state){
        return state.picContentEdit
    },
    getAppPhotosChangeByClassId(state){
        return state.getAppPhotosChangeByClassId
    },
    chanable(state){
        return state.chanable
    }
}
const actions = {
    getAppPhotosChangeByClassId({commit,state},classId){
        fetch(`${netFile.baseUrl}/cmt/api/app/photos/change/${classId}`,{ 
                headers: netFile.myHeaders,
                mode:'cors'
        })
            .then(function (response) {                 
                return response.json();             
            })
            .then(function(data) {
                console.log('根据Id获取轮播图res') 
                console.log(data)
                if(data.length !=0 ){
                    state.chanable = true
                    alert('data.length !=0');
                    console.log('dataS')
                    console.log(data)
                    commit(types.GET_PHOTOSDEFAULT,data)     
                }else{
                    state.chanable = false 
                }
                
              })//
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
    createAppPhotosChange({commit,state},data){
        console.log('提交创建轮播图后发送的数据data') 
        console.log(data)
        fetch(`${netFile.baseUrl}/cmt/api/app/photos/change/create`,{ 
                method:'post',
                headers: netFile.myHeaders,
                mode:'cors',
                body: JSON.stringify(data)
        })
            .then(function (response) {                 
                return response.json();             
            })
            .then(function(data) {
                console.log('提交创建轮播图后获取的数据res') 
                console.log(data)
                commit(types.CREATE_PHOTOS,data)
              })//
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
    updateAppPhotosChange({commit,state},data){
        console.log('提交更新轮播图后发送的数据data') 
        console.log(data)
        fetch(`${netFile.baseUrl}/cmt/api/app/photos/change/update`,{ 
                method:'put',
                headers: netFile.myHeaders,
                mode:'cors',
                body: JSON.stringify(data)
        })
            .then(function (response) {                 
                return response.json();             
            })
            .then(function(data) {
                console.log('提交更新轮播图后获取的数据res') 
                console.log(data)
                // commit(types.CREATE_PHOTOS,data)
              })//
            .catch(function (error) {
                /* console.log('this is error'+ error);*///等同于下面的模板字符串
                console.log(`this is error${error}`)
            });
    },
   

}
const mutations = {
    [types.GET_PHOTOSDEFAULT](state,data){  
        const photos = data[0].photos
        console.log('photos')
        console.log(photos)
        console.log('data')
        console.log(data)
        const reformdefaultList = photos.map(function(obj) { 
        const rObj = {};
       
        rObj['name'] = obj.name;
        rObj['url'] = 'http://localhost:8066/cmt/api/files?path='+obj.photoUrl;
        return rObj;
        });//
        console.log('reformdefaultList')
        console.log(reformdefaultList)
        // return {
        //     state['defaultList'] :reformdefaultList
        // }
        state.defaultList = reformdefaultList
        state.getAppPhotosChangeByClassId = data
       
    },
    [types.CREATE_PHOTOS](state,data){         
        // return state.defaultList = data
    },
    // chanable(state){
    //     state.chanable=true
    //     // console.group('上传图片后打印state.buildModuleData')
    //     // console.log(state.buildModuleData)
    //     // console.groupEnd()    
    // }
}
export default {
    state,
    getters,
    actions,
    mutations
}
