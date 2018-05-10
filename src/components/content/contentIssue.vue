<template>
<div class="contentIssue">
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">       
        <FormItem label="栏目名称" prop="select">
            <!-- <Select  v-model="model1" style="width:100%">
              <Option @click.native="pickCol(item.label,item.value)"   v-for="item in colList" :value="item.value" :key='item.value' >
                  {{ item.label }}
              </Option>
            </Select> -->
            <Select  @on-change="getAppContentById" v-model="model1" style="width:100%">
              <Option @click.native="pickCol(item.label,item.value)"   v-for="item in colList" :value="item.value" :key='item.value' >
                  {{ item.label }}
              </Option>
            </Select>
        </FormItem>
        <FormItem label="标题"  prop="input1">
            <Input v-model="formValidate.input1" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="简短描述" prop="textarea">
            <Input v-model="formValidate.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="关键字" >
            <Input v-model="formValidate.input2" placeholder="多个词用逗号隔开，为广告时此项不填写"></Input>
        </FormItem>
        <FormItem label="来源/作者" prop="input3">
            <Input v-model="formValidate.input3" placeholder="此项可以不填写"></Input>
        </FormItem>
        <FormItem label="Radio" prop="radio1">
            <RadioGroup v-model="formValidate.radio1">
                <Radio label="1">网站内容</Radio>
                <Radio label="2">广告</Radio>
            </RadioGroup>
        </FormItem>
        
     <!-- bidirectional data binding（双向数据绑定） -->
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <FormItem label="Radio" prop="radio2">
            <RadioGroup v-model="formValidate.radio2">
                  <Row>
                    <Col span="8">
                      <Radio label="1">样式一</Radio>
                      <img style="display:block" width="250" height="100" :src="styleSrc1">
                    </Col>
                    <Col span="8">
                      <Radio label="2">样式二</Radio>
                      <img style="display:block" width="250" height="100" :src="styleSrc2">
                    </Col>
                    <Col span="8">
                      <Radio label="3">样式三</Radio>
                      <img style="display:block" width="250" height="100" :src="styleSrc3">
                    </Col>
                  </Row>    
            </RadioGroup>
        </FormItem>
        <FormItem label="上传图片"  prop="photos">
            <section class="photos" >
                <div  class="demo-upload-list" v-for="item in uploadList">
                    <template  v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name,item.path)"></Icon>
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
                    <img :src="baseUrl+'/' + imgUrl  " v-if="visible" style="width: 100%">
                </Modal>
            </section>
        </FormItem>
        <FormItem>
            <Button type="primary"  @click="handleSubmit('formValidate')">Submit</Button>
            <!-- <Button type="ghost" style="margin-left: 8px">Cancel</Button> -->
        </FormItem>
    </Form>
</div> 
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
       
        model1: '',//栏目ID
        //上传照片s
                imgName: '',
                imgUrl:'',
                uploadList: [],
                visible: false,
        //上传照片e
        //富文本编辑器
        content: '<h2>I am Example</h2>',
        editorOption: {
          // some quill options
        },
        //表单
        styleSrc1: require('../../images/1.png'),
        styleSrc2: require('../../images/2.png'),
        styleSrc3: require('../../images/3.png'),
        formValidate: {
                    input1: '',
                    input2: '',
                    input3: '',
                    select: '',
                    radio1: '',
                    radio2: '',
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: '',
                    photos:'',
        },
        ruleValidate: {
                    input1:[
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    textarea:[
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input2:[
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input3:[
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    radio1: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    radio2: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    photos: [
                        { required: true, message: '请上传图片', trigger: 'change' },
                       
                    ],
        },
        //回传服务器的信息s
        sendBacks:{
            // "name": "甲状腺结节",            //标题
            // "description": "testtest",      //描述
            // "source": "精确医疗",             //来源                
            // "style": 1,                    //app样式，多少张图片，数值就为多少
            "photoUrl": [],                //照片地址
            // "contentUrl": "/baike/57bc09def0b433a9e00e191b_0.html", //内容url
            // "commentId": "",
            // "classId": "57e23cc738328f6996319b47", //栏目ID
            // "type": 1  // 1为网站内容 ， 2 为广告
        },
       
                //回传服务器的信息e        
      }
    },
    methods: {
         //记录回传Id
        pickCol(name,id){
            this.sendBacks.name = name;
            this.sendBacks.classId = id;
        }, 
      //提交
      handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    // if(Contchangeable){提交更改接口}else{以下内容}
                    if (valid) {
                        this.$Message.success('Success!');
                        this.sendBacks.name = this.formValidate.input1
                        this.sendBacks.keywords = this.formValidate.input1.split(",")
                        this.sendBacks.description = this.formValidate.textarea
                        this.sendBacks.source = this.formValidate.input3
                        this.sendBacks.style = parseInt(this.formValidate.radio2)
                        this.sendBacks.type = parseInt(this.formValidate.radio1)     
                        this.sendBacks.content = this.content
                        if(this.Contchangeable){
                            this.$store.dispatch('updateAppDynamicFind',this.sendBacks)
                            
                        }else{
                            this.$store.dispatch('createAppDynamicFind',this.sendBacks)
                            
                        }
                        this.$router.replace({path: '/contentList',query:{id:this.sendBacks.classId}})//创建成功后去到列表页
                        // location.reload()
                    } else {
                        this.$Message.error('Fail!');
                    }
                })              
      },

      getAppContentById () {              
            
            const getJSON = () => {
                        return new Promise( (resolve, reject) => {
                                            resolve(this.$store.dispatch('getAppDynamicFind',this.model1))
                                })
                        }   
                        const getJSONend = () => 
                            getJSON()
                        .then(() => {
                                setTimeout(() => {
                                    console.log('this.getAppDynamicFind')
                                    console.log(this.getAppDynamicFind)
                                    if(this.Contchangeable){
                                        this.formValidate.input1 = this.getAppDynamicFind[0].name
                                        this.formValidate.textarea = this.getAppDynamicFind[0].description
                                       
                                        this.formValidate.radio2 = JSON.stringify(this.getAppDynamicFind[0].style)
                                        this.formValidate.radio1 = JSON.stringify(this.getAppDynamicFind[0].type)
                                        this.formValidate.input2 = this.getAppDynamicFind[0].keywords.join(",")
                                        this.formValidate.input3 = this.getAppDynamicFind[0].source
                                        this.content = this.getAppDynamicFind[0].content
                                 
                                        console.log(' this.formValidate ')
                                        console.log( this.formValidate )      
                                    }
                                    
                                }, 1000);
                            
                        })//这一句就自动激活了函数，不用点击button
                        getJSONend() 
      },
      //文字编辑器
      onEditorBlur(quill) {
        console.log('editor blur!', quill)
      },
      onEditorFocus(quill) {
        console.log('content')
        console.log(this.content)
        console.log('editor focus!', quill)
      },
      onEditorReady(quill) {
        console.log('editor ready!', quill)
      },
      onEditorChange({ quill, html, text }) {
        console.log('editor change!', quill, html, text)
        this.content = html
      },
      //上传照片
      handleView (name,url) {
          console.group('打印uploadList')
          console.log(this.uploadList)
          console.groupEnd()
          this.imgName = name;
          this.imgUrl = url;
          this.visible = true;
      },
      handleRemove (file) {
          console.log('删除图片时file')
          console.log(file)
          const fileList = this.$refs.upload.fileList;
          this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
          this.sendBacks.photoUrl.splice(fileList.indexOf(file), 1);//删除传回的数据
      },
      handleSuccess (res, file) {
          console.group('打印uploadList')
          console.log(this.uploadList)
          console.group('上传图片后res.file_infos[0].path')
          console.log(res.file_infos[0].path)
          console.groupEnd()
          console.group('上传图片后返回的res')
          console.log(res)
          console.groupEnd()
          file.url = `${this.baseUrl}/${res.file_infos[0].path}`
          file.name = `${res.file_infos[0].name}`//提示错误使用
          file.path = `${res.file_infos[0].path}`
          console.log('上传图片后应显示图片file.url')
          console.log(file.url)
          this.sendBacks.photoUrl.push(res.file_infos[0].path)//传回服务器，删除在handleRemove (file)
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
          const check = this.uploadList.length < 5;
          if (!check) {
              this.$Notice.warning({
                  title: 'Up to five pictures can be uploaded.'
              });
          }
          return check;
      },
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    computed:mapGetters([
            'baseUrl',
            'colList',//栏目名字以及ID
            'defaultList',//已有的轮播图
            'getAppDynamicFind',//根据id获取的内容
            'Contchangeable'//根据id返回的内容是否为空
           
    ]), 
    updated(){
      console.log('defaultList')
      console.log(this.defaultList)
      console.log('this.formValidate.photos')
      console.log(this.formValidate.photos)
      if(this.uploadList.length == 0){
          this.formValidate.photos =''
      }else{this.formValidate.photos ='1'}
    },
    mounted() {
      console.log('defaultList')
      console.log(this.defaultList)
      console.log('this is current quill instance object', this.editor)//这么访问computed 里面的内容
      this.uploadList = this.$refs.upload.fileList;//上传照片
    }
  }
</script scoped>
<style>

</style>
