<template>
    <div class="content">
        <!-- {{colcontent}} -->
        <!-- <button @click="getState">获取state</button> -->
        <div class="top">
             <Form  :label-width="80"> 
            <FormItem label="已建栏目">
                <Select  @on-change="getContentById" v-model="model1" style="width:100%">
                <Option v-for="item in colList" :value="item.value" :key='item.value' >
                    {{ item.label }}
                </Option>
                </Select>
            </FormItem>
       </Form>
        <Button type="info" >内容发布</Button>   
        </div>
        <br>       
        <Table border :columns="columns1" :data="manageCont"></Table>
    </div>
</template>

<script >
    import { mapGetters } from 'vuex'
    export default {
         data () {
            return {
                model1: '',//栏目ID
                columns1: [
                    {
                        title: '栏目名称',
                        key: 'name'
                    },
                    {
                        title: '作者/来源',
                        key: 'source'
                    },
                    {
                        title: '类型',
                        key: 'type'
                    },
                    {
                        title: '样式',
                        key: 'style'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small'
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.show(params.index)
                                //         }
                                //     }
                                // }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
               
            }
        },    
        methods:{
            getContentById () {              
                this.$store.dispatch('getContentById',this.model1)
            },
            show (index) {
                this.$router.push({path:'/contentIssue',query:{classId:this.colList[index].id}})
                // this.$Modal.info({
                //     title: 'User Info',
                //     content: `Name：${this.colcontent[index].name}<br>childNmae：${this.colcontent[index].childName}`
                // })
            },
            remove (index) {
                
                console.log('this.manageCont')
                console.log(this.manageCont)
                this.$store.dispatch('deleteAppDynamicFind', this.manageCont[index].id)  
                this.manageCont.splice(index, 1);
                this.$Notice.info({
                    title: '删除成功' 
                })  
            }       
        },
        computed:mapGetters([
            'colList',//栏目名字以及ID 
            'manageCont',//根据ID获取的内容  
        ]),
       
    }
</script>
<style  scoped>
.top{
    display:flex
}
form{
    flex:1
}
button{
    flex:0 0 50px
}
.ivu-btn {
    margin: 1px 0 0 10px;
    height: 32px;
}

form {
        margin-left:-10px;
}
</style>