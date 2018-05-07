<template>
    <Upload 
        ref="upload"
        action="http://localhost:8066/cmt/api/files"
        multiple
        :headers="{'Access-Control-Allow-Origin': '*'}"
        name='files'
        :before-upload="handleBeforeUpload"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
    >
        <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
    </Upload>
</template>
<script>
    export default {
       
        data(){
            return {
                uploadList: [],
                categoryPicHas:''
            }
        },
        methods:{
            handleSuccess (res, file) {
             
                    // console.log('this.formValidate.photos')
                    // console.log(this.formValidate.photos)
                    if(this.uploadList.length == 0){
                        this.categoryPicHas = ''
                        this.$store.commit('categoryPicHas',this.categoryPicHas)//通过改变vuex实现父子数据传递
                    }
                    else{
                        this.categoryPicHas = '1'
                        this.$store.commit('categoryPicHas',this.categoryPicHas)
                    }
                console.group('打印res.file_infos[0].path')
                console.log(res.file_infos[0].path)
                console.groupEnd()
                this.$store.commit('categoryPicUrl',res.file_infos[0].path)
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
                console.log(this.uploadList.length)
                const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to 2 pictures can be uploaded.'
                    });
                }
                return check;
            }
        },
         mounted () {
            this.uploadList = this.$refs.upload.fileList;//用的巧妙
            console.group('打印this.$refs.upload')
            console.log(this.$refs.upload)
            console.groupEnd()
        },
        updated(){
          
        },
    }
</script>
