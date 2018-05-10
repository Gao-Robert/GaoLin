<template>
    <div class="changePhoto">
        <div class="top">
                <div class="name">
                   
                    <!-- <button @click="test">defaultList</button> -->
                    <p>栏目名称</p>
                    <Select  @on-change="getAppPhotos" v-model="model1" style="width:100%">
                        <Option @click.native="pickCol(item.label,item.value)"  v-for="item in colList" :value="item.value" :key='item.value' >
                            {{ item.label }}
                        </Option>
                    </Select>
                </div>
                <div class="date">            
                    <p>选择日期</p>   
                    <DatePicker  :value="date" :clearable = false  type="date" placeholder="Select date" style="width:100%"
                         @on-change="handleChange"
                    >
                    </DatePicker>
                </div>
        </div>
        <section class="photos">
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
                    <img :src="item.url">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(item.name,item.url)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                    </div>
                </template>
                <template v-else>
                    <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                </template>
            </div>
            <Upload
                ref="upload"
                :show-upload-list="false"
                :default-file-list="defaultList"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                multiple
                type="drag"
                :action="baseUrl+'/cmt/api/files'"
                :headers="{'Access-Control-Allow-Origin': '*'}"
                 name='files'
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="imgUrl" v-if="visible" style="width: 100%">
            </Modal>
        </section>
        <footer>
            <div class="photoEdit">
                    <p>图片编辑</p>
                    <Select  @on-change="" v-model="model2" style="width:100%">
                        <Option @click.native="pickPic(item.value)" v-for="item in picList" :value="item.value" :key="item.value" >
                            {{ item.label }}
                        </Option>
                    </Select>
            </div>
            <div class="photoName">
                    <p>图片名称</p>
                    <Input @on-blur='picInput' v-model="photoName" placeholder="Enter something..." style="width:100%"></Input>
            </div>
            <div class="photoUrl">
                    <p>指向内容地址</p>
                    <Input @on-blur='urlInput' v-model="url" placeholder="Enter something..."  style="width:100%"></Input>
            </div>   
        </footer>
        <Button class="save" type="primary" @click="handleSubmit">保存</Button>       
    </div>  
</template>
<script>
import {mapGetters} from 'vuex'
    export default {
        data () {
            return {
                watch:false,//要操作图片时，就停止监视vuex，否则会覆盖
                date:'',//日期值
                //选择器s
                model1: '',//栏目ID
                //上传照片s
                imgName: '',
                imgUrl:'',
                visible: false,
                uploadList: [],
                //上传照片e
                //图片编辑s
                num:'',
                url:'',
                photoName:'',
                picList: [
                    {
                        value: 0,
                        label: '图片一',
                        photoName:''
                    },
                    {
                        value: 1,
                        label: '图片二',
                        photoName:''
                    },
                    {
                        value: 2,
                        label: '图片三'
                    },
                    {
                        value: 3,
                        label: '图片四'
                    },
                    {
                        value: 4,
                        label: '图片五'
                    }
                ],
                model2: '',
                //图片编辑e
                //回传服务器的信息s
                sendBacks:{
                    "name": "",
                    "classId": "",
                    "date": "",
                    "photos": []
                }
                //回传服务器的信息e
            }
        },
        created(){
            // this.$store.dispatch('getAppContentCategories')
        },       
        computed:mapGetters([
            'baseUrl',
            'colList',//栏目名字以及ID
            'defaultList',//已有的轮播图
            'getAppPhotosChangeByClassId',//根据id返回的全部数据
             'chanable'// 根据ID获取轮播图是否有数据返回，没有则false
        ]),
        watch:{          
            defaultList(newValue,oldValue) {
                if(this.watch){
                  
                      // is triggered whenever the store state changes
                    this.$refs.upload.fileList = []
                    this.$refs.upload.fileList.push.apply(this.$refs.upload.fileList,newValue);
                    this.uploadList = this.$refs.upload.fileList;
                }     
            }
        },      
        methods: {
            test(){
                console.log('this.defaultList')
                console.log(this.defaultList)
            },
            //栏目名与日期关联
            pickCol(name,id){ 
                //  this.watch = true//要选择下一个Id了，开始监视vuex,//on-change 已改变，也可以  
                // if(this.defaultList.length != 0){
                //     this.$router.push({path:`/changePhoto?${id}`})
                // }
                this.sendBacks.name = name;
                this.sendBacks.classId = id;
                console.log('选择后的回传数据this.sendBacks')
                console.log(this.sendBacks) 
            }, 
            getAppPhotos () {
                        // this.chanable = true //在这里直接改报错：Computed property "chanable" was assigned to but it has no setter.
                                             //是因为无法直接更改vuex传过来的值
                        this.watch = true                 
                        // console.log('chanable')
                        // console.log(this.chanable)
                        const getJSON = () => {
                        return new Promise( (resolve, reject) => {
                                            resolve(this.$store.dispatch('getAppPhotosChangeByClassId',this.model1))
                                })
                        }   
                        const getJSONend = () => 
                            getJSON()
                        .then(() => {
                                setTimeout(() => {
                                    console.log('this.getAppPhotosChangeByClassId')
                                    console.log(this.getAppPhotosChangeByClassId)
                                    if(this.chanable){
                                        this.date = this.getAppPhotosChangeByClassId[0].date
                                        this.sendBacks.date = this.date;
                                        this.sendBacks.id = this.getAppPhotosChangeByClassId[0].id//传回轮播图id
                                        // this.photoName = this.getAppPhotosChangeByClassId[0].name
                                         this.sendBacks.photos = this.getAppPhotosChangeByClassId[0].photos
                                        const C = this.getAppPhotosChangeByClassId[0].photos
                                        for(let i = 0;i< C.length;i++){
                                            this.picList[i].photoName = C[i].name
                                            this.picList[i].url = C[i].contentUrl
                                            // this.sendBacks.photos[i].photoUrl = C[i].photoUrl
                                            // this.sendBacks.photos = []
                                            // this.sendBacks.photos.push({'photoUrl':C[i].photoUrl})
                                            // this.sendBacks.photos.push({'name':C[i].name})
                                            // this.sendBacks.photos.push({'contentUrl':C[i].contentUrl})
                                            
                                        } 
                                        console.log('this.picList')
                                        console.log(this.picList)
                                        console.log('C.length')
                                        console.log(C.length)
                                        console.log('sendBacks')
                                        console.log(this.sendBacks)       
                                    }
                                    
                                }, 1000);
                            
                        })//这一句就自动激活了函数，不用点击button
                        getJSONend()
                           
            },
             //日期
             handleChange (date) {
                 console.log('日期选择器date')
                 console.log(date)
                 this.sendBacks.date = date;
                console.log('选择日期后的回传数据this.sendBacks')
                console.log(this.sendBacks)
            },
            //上传照片
            handleView (name,url) {
                console.group('打印uploadList')
                console.log(this.uploadList)
                console.log(url)
                console.groupEnd()
                this.imgName = name;
                this.imgUrl = url;
                this.visible = true;
            },
            handleRemove (file) {
                this.watch = false
                console.log('file')
                console.log(file)
                this.uploadList = this.$refs.upload.fileList;
                const fileList = this.$refs.upload.fileList;
                console.log('fileList')
                console.log(fileList) 
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
                // this.uploadList.splice(this.uploadList.indexOf(file), 1);//默认轮播图时传到了uploadList里面，所以在里面删除.更正：mounted时已经等于this.$refs.upload.fileList，再删就重复了，而且默认轮播如更改到了this.$refs.upload.fileList
                this.sendBacks.photos.splice(fileList.indexOf(file), 1);//删除传回的数据
            },
            handleSuccess (res, file) {
                this.watch = false
                console.group('打印uploadList')
                console.log(this.uploadList)
                console.group(' this.$refs.upload.fileList')
                console.log( this.$refs.upload.fileList)
                console.groupEnd()
                console.group('上传图片后返回的res')
                console.log(res)
                console.groupEnd()
                file.url = `${this.baseUrl}/${res.file_infos[0].path}`
                file.name = `${res.file_infos[0].name}`//提示错误使用
                // file.path = `${res.file_infos[0].path}`
                console.log('上传图片后应显示图片file.url')
                console.log(file.url)
                this.sendBacks.photos.push({"photoUrl":res.file_infos[0].path})//传回服务器，，删除在handleRemove (file)
                console.log('上传图片后回传数据sendbacks')
                console.log(this.sendBacks)
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                this.watch = false
                this.uploadList = this.$refs.upload.fileList;//添加的
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: '最多上传5张图片'
                    });
                }
                return check;
            },
            //图片编辑s
            pickPic(i){ 
                this.num = i
                console.log('选择了第i个图片名称')
                console.log(this.num)
                this.photoName = this.picList[i].photoName 
                this.url = this.picList[i].url 
                console.log('选择图片N之后的回传数据sendBacks')
                console.log(this.sendBacks)
            },
            picInput(){
                
                this.picList[this.num].photoName = this.photoName
                
                if(this.sendBacks.photos[this.num]!= undefined&&this.sendBacks.photos[this.num].photoUrl!=''&&this.sendBacks.photos[this.num].photoUrl!= undefined){
                    this.sendBacks.photos[this.num].name = this.photoName //放入回传数据      
                }else{
                    let i = this.num + 1
                    this.$Notice.error({
                    title: '请上传第'+i+'张图片', 
                });
                }//如果没有上传第二张图片就写第二张图片的描述
            },
            urlInput(){
                this.picList[this.num].url = this.url
                if(this.sendBacks.photos[this.num]!= undefined){
                     this.sendBacks.photos[this.num].contentUrl = this.url   //放入回传数据        
                }else{
                    let i = this.num + 1
                    this.$Notice.error({
                    title: '请上传第'+i+'张图片', 
                    })
                    }
            },
            //图片编辑e
            
            //提交数据
            handleSubmit(){
                if(this.chanable){
                    if(this.sendBacks.name == ''){
                        this.$Notice.error({
                        title: '请选择栏目名称', 
                        })   
                    }else if(this.sendBacks.name == ''){
                        this.$Notice.error({
                        title: '请选择日期', 
                        })      
                    }else if(this.sendBacks.photos == ''){
                        this.$Notice.error({
                        title: '请选择上传图片', 
                        })      
                    }else if(this.num.length ==  0){
                        // alert(this.num)
                        this.$Notice.error({
                        title: '请选择要编辑的图片', 
                        })      
                    }else if(this.sendBacks.photos.length != 0){
                        
                        let num =  this.sendBacks.photos.length
                        
                        for (var z=0;z<num;z++){
                            if(this.sendBacks.photos[z].name == undefined){
                               //这两个属性是push 进去的
                            this.$Notice.error({
                                title: `请填写第${z+1}张图片名称`, 
                            })   
                            }else if(this.sendBacks.photos[z].contentUrl == undefined){
                                this.$Notice.error({
                                title: `请填写第${z+1}张图片内容地址`, 
                            })
                            }else{
                                
                                this.$store.dispatch('updateAppPhotosChange',this.sendBacks)
                                this.$router.replace({path: '/module'});
                                location.reload()
                            };
                        }     
                    }
                }else{
                    
                    if(this.sendBacks.name == ''){
                        this.$Notice.error({
                        title: '请选择栏目名称', 
                        })   
                    }else if(this.sendBacks.name == ''){
                        this.$Notice.error({
                        title: '请选择日期', 
                        })      
                    }else if(this.sendBacks.photos == ''){
                        this.$Notice.error({
                        title: '请选择上传图片', 
                        })      
                    }else if(this.num.length ==  0){
                        // alert(this.num)
                        this.$Notice.error({
                        title: '请选择要编辑的图片', 
                        })      
                    }else if(this.sendBacks.photos.length != 0){     
                        let num =  this.sendBacks.photos.length                
                        for (var z=0;z<num;z++){
                            if(this.sendBacks.photos[z].name == undefined){
                              //这两个属性是push 进去的
                                this.$Notice.error({
                                    title: `请填写第${z+1}张图片名称`, 
                                })   
                            }else if(this.sendBacks.photos[z].contentUrl == undefined){
                                this.$Notice.error({
                                title: `请填写第${z+1}张图片内容地址`, 
                                })
                            }else if(z == num-1){    
                                
                             this.$store.dispatch('createAppPhotosChange',this.sendBacks)
                             this.$router.replace({path: '/module'});
                             location.reload()
                            }
                        }
                    }      
                }         
            },   

        },
        mounted () {
            this.uploadList = this.$refs.upload.fileList;
            console.log('mounted时uploadList')
            console.log(this.uploadList)
        },
        updated(){
            console.log('defaultList')//mapState通过扩展运算符将store.state.orderList 映射this.orderList  这个this 很重要，这个映射直接映射到当前Vue的this对象上。
                //所以通过this都能将这些对象点出来，同理，mapActions, mapMutations都是一样的道理。牢记~~~
            console.log(this.defaultList)
            console.log('uploadList')
            console.log(this.uploadList)
            console.log('this.$refs.upload.fileList')
            console.log(this.$refs.upload.fileList)
            
        }

        //上传照片e
    }
</script>
<style scoped lang="less">
.top{
    height:50px;
}
 .name,.date{
     float: left;
     width:50%;
 }
 .name{
     margin-right:20px;
      width: calc(~'50% - 20px');
 }
 .photos{
     margin:20px 0 20px 0;
 }
 .photoEdit,.photoName,.photoUrl{
     float: left;
     width:30%;
 }
 .photoName{
     margin:0 20px 0 20px
 }
 .photoUrl{
     width: calc(~'40% - 40px');
     
     
 }
 .ivu-layout{
     position:relative!important;
 }
 .save{
     margin:160px auto 20px;
     width:100%; 
 }
 /* 上传照片s */
 .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
/* 上传照片e */
</style>

