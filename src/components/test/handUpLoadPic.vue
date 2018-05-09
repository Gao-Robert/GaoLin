<template>
    <div>
        <Upload
            ref="upload"
            :before-upload="handleUpload"
            action="">
            <Button type="ghost" icon="ios-cloud-upload-outline">Select the file to upload</Button>
        </Upload>
        <div v-if="file !== null">Upload file: {{ file.name }} <Button type="text" @click="upload" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>
        <img :src=uploadList.url>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                file: null,
                loadingStatus: false,
                uploadList: []
            }
        },
        methods: {
            handleUpload (file) {
                console.log('上传前的file');
                
                this.file = file;
                console.log(file)//相当于input 标签里面input.files[0]
                return false;
            },
            upload () {
                this.loadingStatus = true;
                setTimeout(() => {
                    this.file = null;
                    this.loadingStatus = false;
                    this.$Message.success('Success')
                }, 1500);
                console.group("打印handUpLoadPic里this.$refs");
                console.log(this.$refs);
                console.groupEnd();
                console.group("打印handUpLoadPic里this.uploadList");
                console.log(this.uploadList);
                console.groupEnd();
            }
        }
    }
</script>
