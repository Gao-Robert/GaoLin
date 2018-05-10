<template>
    <div class="content">
        <!-- {{colcontent}} -->
        <!-- <button @click="getState">获取state</button> -->
        <Button type="info" @click="toBuildModule" >            
            创建栏目         
        </Button>
        <br>
        <Table border :columns="columns1" :data="colcontent"></Table>
    </div>
</template>

<script >
    import { mapGetters } from 'vuex'
    export default {
        methods:{
            toBuildModule(){
                this.$router.push({path:'/buildModule'})
            },
            show (index) {
                this.$router.push({path:'/buildModule',query:{id:this.colcontent[index].id,infUrl:this.colcontent[index].infUrl,name:this.colcontent[index].name,childName:this.colcontent[index].childName}})
                // this.$Modal.info({
                //     title: 'User Info',
                //     content: `Name：${this.colcontent[index].name}<br>childNmae：${this.colcontent[index].childName}`
                // })
            },
            remove (index) {
                this.$store.dispatch('deleteAppContentCategory', this.colcontent[index].id)  
                this.colcontent.splice(index, 1);
                this.$Notice.info({
                    title: '删除成功' 
                })  
            }    
        },
        computed:mapGetters([
            'colcontent'
        ]),
      created(){
        //    this.$store.dispatch('getAppContentCategories')  
      },
      updated(){
          console.log('colcontent')
        console.log(this.colcontent)
      },
        data () {
            return {
                columns1: [
                    {
                        title: '栏目名称',
                        key: 'name'
                    },
                    {
                        title: '子栏目名称',
                        key: 'childName'
                    },
                    {
                        title: '接口地址',
                        key: 'infUrl'
                    },
                    {
                        title: '栏目图标地址',
                        key: 'imgUrl'
                    },
                    // {
                    //     title: '图片轮播',
                    //     key: 'infUrl'
                    // },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
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
                data1: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ]
            }
        }
    }
</script>
<style  scoped>
    .ivu-btn {
        margin-bottom: 10px;
    }
</style>