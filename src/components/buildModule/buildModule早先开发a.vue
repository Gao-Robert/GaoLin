<template>
    <div class="buildModule">
        <div class="linesWrapper">
            <div class="lines">
                <Input class="inCol" v-model="value" placeholder="请输入栏目名称"></Input>
                <p class="specs">*栏目名称唯一</p>
            </div>
        </div>
        <div class="linesWrapper">
            <div class="lines">
                <Input class="inCol" v-model="value" placeholder="请输入栏目子名称"></Input>
                <p class="specs">*栏目子名称</p>
            </div>
        </div>
        <div class="linesWrapper">
            <div class="lines">
                <Input class="inCol" v-model="value" placeholder="接口地址，服务器自动分配"></Input>
                <p class="specs">*接口地址唯一</p>
            </div>
        </div>  
        <div class="upPic">
            <template>
              <div class="demo-upload-list" v-for="item in uploadList">
                  <template v-if="item.status === 'finished'">
                      <img :src="item.url">
                      <div class="demo-upload-list-cover">
                          <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
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
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:58px;">
                  <div style="width: 58px;height:58px;line-height: 58px;">
                      <Icon type="camera" size="20"></Icon>
                  </div>
              </Upload>
              <Modal title="View Image" v-model="visible">
                  <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
              </Modal>
            </template>
        </div>  
        <button @click="upPic">保存上传</button>
    </div>
    
</template>
<script>
import {mapState} from 'vuex'
export default {
  data() {
    return {
      
      value: "",
      //上传图片S
      
      defaultList: [
        {
          name: "bc7521e033abdd1e92222d733590f104",
          url:
            "https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar"
        }
      ],
      imgName: "",
      visible: false,
      uploadList: []
      //上传图片E
    };
  },
  created() {
    console.group("打印this.$refs");
    console.log(this.$refs);
    console.groupEnd();
  },
  methods: {
      handleBeforeUpload(file) {
      //这里面的file相当于input.files[0]，见上传文件练习
      // this.$store.state.file = file 这一句并不能放到vuex state中
      this.$store.commit('picFile', file)//传到mutations里面
      console.group('打印this.$store')
      console.log(this.$store)
      console.groupEnd()
      console.group('打印this.$store.state')
      console.log(this.$store.state)
      console.groupEnd()
      return false;
      const check = this.uploadList.length < 2;
      if (!check) {
        this.$Notice.warning({
          title: "Up to 2 pictures can be uploaded."
        });
      }
      return check;
    },
    upPic(){
      this.$store.dispatch("upPic")
    },
    handleView(name) {
      this.imgName = name;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleSuccess(res, file) {
      file.url = upPic.imgUrl;
      file.name = "7eb99afb9d5f317c912f08b5212fd69a";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "The file format is incorrect",
        desc:
          "File format of " +
          file.name +
          " is incorrect, please select jpg or png."
      });
    },
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "Exceeding file size limit",
        desc: "File  " + file.name + " is too large, no more than 2M."
      });
    },
 
    upload () {
                
            }
  },
  mounted() {
    this.uploadList = this.$refs.upload.fileList;
  }
};
</script>
<style scoped>
.linesWrapper {
  margin: 0 0 20px 0;
}
.lines {
  display: flex;
}
.inCol {
  flex: 1;
}
.specs {
  display: inline-block;
  font-size: 14px;
  color: #ff1244;
  flex: 0 0 98px;
  padding: 5px 0 0 4px;
}
/* 上传图片S */
.demo-upload-list {
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
/* 上传图片E */
</style>

