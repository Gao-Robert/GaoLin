<template>
    <div class="buildModule">
        <!-- //表单S -->
        <template>
                  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                      <FormItem label="栏目名称" prop="name">
                          <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                      </FormItem>
                      <FormItem label="栏目子名" prop="childName">
                          <Input v-model="formValidate.childName" placeholder="Enter your name"></Input>
                      </FormItem>
                      <!-- <FormItem label="接口地址" prop="apiUrl">
                          <Input v-model="formValidate.apiUrl" placeholder="Enter your name"></Input>
                      </FormItem> -->
                      <div class="upPic">
                        <FormItem label="栏目图标"  prop='categoryPicHas'>
                        <categoryPic></categoryPic>
                        </FormItem>
                        <!-- <p class="specs pic">*栏目图标</p> -->
                      </div> 
                      <FormItem> 
                      
                      </FormItem>
                      <Button type="primary" @click="handleSubmit('formValidate')"  style="width:100%">保存</Button>
                      <!-- <button @click="upPic">保存上传</button> -->
                   </Form>
        </template>
        <!-- //表单E -->
    </div>
    
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import categoryPic from './categoryPic'
export default {
  data() {
    return {  
      value: "",
      //表单s
       formValidate: {
                    name: '', 
                    childName:'' ,   
                    apiUrl:'' ,  
                    categoryPicHas:''        
                },
       ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    childName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    // apiUrl: [
                    //     { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    // ],
                    categoryPicHas: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
       }
      //表单e
    };
  },
//   computed: {
//     categoryPicHas() {
//         return this.$store.getters.categoryPicHas;
//     }
//   },
//   watch:{
//       categoryPicHas(newValue,oldValue) {
//             // is triggered whenever the store state changes
//             alert(newValue,oldValue);
//              this.formValidate.categoryPicHas = newValue
//         }
//   },或下面的方法
    created(){
      this.$store.watch(
        (state)=>{
            console.log('this.$store.getters.categoryPicHas') // could also put a Getter here
            console.log(this.$store.getters.categoryPicHas)
            return this.$store.getters.categoryPicHas
        },
        (newValue, oldValue)=>{
            //something changed do something
            console.log(oldValue)
            console.log(newValue)
            this.formValidate.categoryPicHas = newValue
        },
        //Optional Deep if you need it
            {
            deep:true
            }
        )
    },
  methods: {
            //表单s
            handleSubmit (name) {
                console.log(name)
                console.log(this.$refs[name])
                console.log(this.formValidate)
                console.log('this.formValidate.categoryPicHas',this.formValidate.categoryPicHas)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        this.$store.commit('changeBModuleData',this.formValidate )//传送给后台的创建数据
                        if(this.$route.query.id != undefined){
                            
                           this.$store.commit('updateBModuleData',{x:this.$route.query.id,y:this.$route.query.infUrl})//传送给后台的更新数据 
                           this.$store.dispatch('updateModule')     
                        }else{
                            
                            this.$store.dispatch('buildModule')
                        }
                        
                        this.$router.replace({path: '/module'});
                        location.reload()
                    } else {}
                })
               
            }
            //表单e
        },
  components:{
    'categoryPic':categoryPic
  }
};
</script>
<style scoped>
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

