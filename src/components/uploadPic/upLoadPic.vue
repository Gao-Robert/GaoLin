<template>
  <section class="photos">
            <div class="demo-upload-list" v-for="item in uploadList">
                <template v-if="item.status === 'finished'">
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
                action="http://localhost:8066/cmt/api/files"
                :headers="{'Access-Control-Allow-Origin': '*'}"
                 name='files'
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="'http://localhost:8066//cmt/api/files?path=' + imgUrl  " v-if="visible" style="width: 100%">
            </Modal>
        </section>
</template>
<script>
 import {mapGetters} from 'vuex'
export default {
  data(){
      return {
        imgName: '',
        imgUrl:'',
        visible: false,
        uploadList: [],
      }
  },
  methods:{
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
          file.url = `http://localhost:8066//cmt/api/files?path=${res.file_infos[0].path}`
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
    computed:mapGetters([
            'colList',//栏目名字以及ID
            'defaultList',//已有的轮播图
           
    ]),
    mounted() {
      console.log('defaultList')
      console.log(this.defaultList)
      this.uploadList = this.$refs.upload.fileList;
    }
}

</script>

