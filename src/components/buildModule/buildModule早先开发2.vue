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
          <categoryPic></categoryPic>
          <p class="specs pic">*栏目图标</p>
        </div>  
        <Button type="primary" long>保存</Button>
        <!-- <button @click="upPic">保存上传</button> -->
    </div>
    
</template>
<script>
import {mapState} from 'vuex'
import categoryPic from './categoryPic'
export default {
  data() {
    return {
      
      value: "",
    
    };
  },
  components:{
    'categoryPic':categoryPic
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
.upPic{
  position:relative;
  padding: 10px 0 80px 0;

}
.pic{
  position:absolute;
  top:10px;
  right: 31px;
}

</style>

