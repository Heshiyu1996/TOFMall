<template>
  <div style="width:100%">
    <div id="bigBlock">
      <div id="home-tb-div" style="width:1100px;text-align:center;margin:0 auto;height:900px">
        <div style="float:left;margin-left:20px">
          <div class="block">
            <el-cascader
              :options="options"
              v-model="selectedOptions"
              @change="handleChange">
            </el-cascader>
          </div>
        </div>
        <div style="text-align:center;float:left;margin-left:20px;width:600px">
          <div style="width:200px;margin-left:-10px;float:left">
            <div style="float:left;width:100px;">
              <el-button type="primary" @click="handleCat"> 搜 索 </el-button>
            </div>
            <div>
              <el-button type="success" @click="goBack">按 类 型</el-button>
            </div>
          </div>
          <div style="float:left;margin-left:12px;width:380px;">
            <el-alert
              :title="Tip" type="info":closable="false">
            </el-alert>
          </div>
        </div>
        <div class="clearfix"  ></div>
        <div style="margin:10px;margin:0 auto">
          <div style="padding:10px;padding-left:60px;width:1100px;text-align:left" >
            <!-- 所有专利（模糊）开始 -->
            <div  v-if="true" style="width:200px;float:left;margin:10px">
              <div style="height:900px;margin-left:-70px;padding:10px;width:1100px;text-align:left" >
                <div v-for="esingle in SomeList" style="width:200px;float:left;margin:10px;margin-bottom:25px">
                  <router-link :to="'/' + esingle.id">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                      <img :src="esingle.img" class="image">
                      <div style="padding:10px;">
                        <div style="float:left;width:200px;margin-top:-8px">
                          <el-tag type="primary" v-for="single in esingle.cat">{{single}}</el-tag>
                        </div>
                        <div id="name" class="omit" style="font-size:16px;line-height:30px;width:120px;height:35px;float:left">{{esingle.name}}</div>
                        <div id="price" class="omit" style="font-size:16px;line-height:30px;width:50px;height:35px;float:left">{{esingle.name}}</div>
                        <div style="text-align:left;float:left;width:80px;font-size:12px;color:gray;" >卖家：
                          <div style="float:left;text-align:right;width:40px;font-size:14px;float:right;line-height:20px;color:rgb(230, 94, 64)" class="omit" >{{esingle.seller}}</div>
                        </div>
                        <div class="clearfix"></div>
                      </div>
                    </el-card>
                  </router-link>
                </div>
              </div>
              <div class="clearfix"></div>
              <div class="block"  style="float:left;margin-top:-10px;margin-left:650px;width:420px;">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-count = "totalPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper">
              </el-pagination>
            </div>
          </div>
          <!-- 所有专利（模糊）结束 -->
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>

import config from './../../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'

export default {
  components:{
  },
  data () {
    return {
      rootURL: config.URL,	//请求的url

      idList:[],
      item:'',


      rootURL: config.URL,	//请求的url
      tableData:[],
      loading3: true,

      currentCatId: '',
      currentCatName: '',
      Tip:'请通过左侧下拉框，选择目录名来查询技术',
      Some:false,
      SomeList:[{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        seller:'5',
        cat:'6'
      }],

      totalPage: 0,
      currentPage: 1,
      pageSize: 12,

      paths_Msg:[],
      paths_Tips:[],
      options: [{
       value: 'zhinan',
       label: '指南',
       children: [{
         value: 'shejiyuanze',
         label: '设计原则',
         children: [{
           value: 'yizhi',
           label: '一致'
         }, {
           value: 'fankui',
           label: '反馈'
         }, {
           value: 'xiaolv',
           label: '效率'
         }, {
           value: 'kekong',
           label: '可控'
         }]
        }, {
         value: 'daohang',
         label: '导航',
         children: [{
           value: 'cexiangdaohang',
           label: '侧向导航'
         }, {
           value: 'dingbudaohang',
           label: '顶部导航'
         }]
       }]
        }, {
         value: 'zujian',
         label: '组件',
         children: [{
           value: 'basic',
           label: 'Basic',
           children: [{
             value: 'layout',
             label: 'Layout 布局'
           }, {
             value: 'color',
             label: 'Color 色彩'
           }, {
             value: 'typography',
             label: 'Typography 字体'
           }, {
             value: 'icon',
             label: 'Icon 图标'
           }, {
             value: 'button',
             label: 'Button 按钮'
           }]
         }, {
           value: 'form',
           label: 'Form',
           children: [{
             value: 'radio',
             label: 'Radio 单选框'
           }, {
             value: 'checkbox',
             label: 'Checkbox 多选框'
           }, {
             value: 'input',
             label: 'Input 输入框'
           }, {
             value: 'input-number',
             label: 'InputNumber 计数器'
           }, {
             value: 'select',
             label: 'Select 选择器'
           }, {
             value: 'cascader',
             label: 'Cascader 级联选择器'
           }, {
             value: 'switch',
             label: 'Switch 开关'
           }, {
             value: 'slider',
             label: 'Slider 滑块'
           }, {
             value: 'time-picker',
             label: 'TimePicker 时间选择器'
           }, {
             value: 'date-picker',
             label: 'DatePicker 日期选择器'
           }, {
             value: 'datetime-picker',
             label: 'DateTimePicker 日期时间选择器'
           }, {
             value: 'upload',
             label: 'Upload 上传'
           }, {
             value: 'rate',
             label: 'Rate 评分'
           }, {
             value: 'form',
             label: 'Form 表单'
           }]
         }, {
           value: 'data',
           label: 'Data',
           children: [{
             value: 'table',
             label: 'Table 表格'
           }, {
             value: 'tag',
             label: 'Tag 标签'
           }, {
             value: 'progress',
             label: 'Progress 进度条'
           }, {
             value: 'tree',
             label: 'Tree 树形控件'
           }, {
             value: 'pagination',
             label: 'Pagination 分页'
           }, {
             value: 'badge',
             label: 'Badge 标记'
           }]
         }, {
           value: 'notice',
           label: 'Notice',
           children: [{
             value: 'alert',
             label: 'Alert 警告'
           }, {
             value: 'loading',
             label: 'Loading 加载'
           }, {
             value: 'message',
             label: 'Message 消息提示'
           }, {
             value: 'message-box',
             label: 'MessageBox 弹框'
           }, {
             value: 'notification',
             label: 'Notification 通知'
           }]
         }, {
           value: 'navigation',
           label: 'Navigation',
           children: [{
             value: 'menu',
             label: 'NavMenu 导航菜单'
           }, {
             value: 'tabs',
             label: 'Tabs 标签页'
           }, {
             value: 'breadcrumb',
             label: 'Breadcrumb 面包屑'
           }, {
             value: 'dropdown',
             label: 'Dropdown 下拉菜单'
           }, {
             value: 'steps',
             label: 'Steps 步骤条'
           }]
         }, {
           value: 'others',
           label: 'Others',
           children: [{
             value: 'dialog',
             label: 'Dialog 对话框'
           }, {
             value: 'tooltip',
             label: 'Tooltip 文字提示'
           }, {
             value: 'popover',
             label: 'Popover 弹出框'
           }, {
             value: 'card',
             label: 'Card 卡片'
           }, {
             value: 'carousel',
             label: 'Carousel 走马灯'
           }, {
             value: 'collapse',
             label: 'Collapse 折叠面板'
           }]
         }]
       }, {
         value: 'ziyuan',
         label: '资源',
         children: [{
           value: 'axure',
           label: 'Axure Components'
         }, {
           value: 'sketch',
           label: 'Sketch Templates'
         }, {
           value: 'jiaohu',
           label: '组件交互文档'
         }]
      }],
      selectedOptions: [],//级联读取结果
      options2: [],
      options3: [],
      value: '',
      value2: '',
      value3: '',

    }
  },
  methods:{
    handleChange(value) {
  console.log(value);
},
    goBack(){
      let that = this
      that.$router.push({path:'/byType'})
    },
    // getSomeList(){
    //   let loadingInstance = Loading.service({ body: true });
    //   let that = this
    //   this.SomeList = [];
    //   that.item=''
    //   axios.get(that.rootURL+'/patent/getPatentByP_C?page='+ that.currentPage +'&pageSize=' + that.pageSize +'&cata_id=' + that.currentCatId)
    //   .then(function(res){
    //     if(res.data.obj==null)
    //     alert("没有符合条件的技术！")
    //     else{
    //       that.totalPage = Math.ceil(res.data.dataCount/that.pageSize)
    //       for( that.item of res.data.obj ) {
    //
    //         if(that.item.catalog1en!=null){
    //           that.paths_Msg.push(that.item.catalog1en.name)
    //           that.paths_Tips.push(that.item.catalog1en.name)
    //           if(that.item.catalog2en!=null){
    //             that.paths_Msg.push(that.item.catalog2en.name)
    //             that.paths_Tips.push(that.item.catalog2en.name)
    //             if(that.item.catalog3en!=null){
    //               that.paths_Msg.push(that.item.catalog3en.name)
    //               that.paths_Tips.push(that.item.catalog3en.name)
    //               if(that.item.catalog4en!=null){
    //                 that.paths_Msg.push(that.item.catalog4en.name)
    //                 that.paths_Tips.push(that.item.catalog4en.name)
    //               }
    //
    //             }
    //           }
    //         }
    //         var paths =''
    //         if(that.paths_Tips!=''){
    //           paths = paths + '【' + that.paths_Tips.pop() + '】'
    //           if(that.paths_Tips!=''){
    //             paths = paths + '【' + that.paths_Tips.pop() + '】'
    //             if(that.paths_Tips!=''){
    //               paths = paths + '【' + that.paths_Tips.pop() + '】'
    //             }
    //           }
    //         }
    //         that.Tip=('以下就是有关于'+paths+'的技术')
    //
    //         if(that.item.patentImages!=''){
    //           that.SomeList.push({
    //             img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patentImages[0].url,
    //             id:that.item.id,
    //             name:that.item.name,
    //             seller:that.item.user.name,
    //             cat:that.paths_Msg
    //           })
    //         }
    //         else{
    //           that.SomeList.push(
    //             {
    //               img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
    //               id:that.item.id,
    //               name:that.item.name,
    //               seller:that.item.user.name,
    //               cat:that.paths_Msg
    //             }
    //           )
    //         }
    //         that.paths_Msg=[]
    //       }
    //     }
    //     loadingInstance.close();
    //     that.Some=true;
    //     localStorage.removeItem('catID')
    //   })
    //   .catch(function(error){
    //     console.error(error)
    //   })
    //
    // },

    handleCat(val) {
      let that = this
      // console.log(that.value,that.value2,that.value3)
      if(that.value3!=''&&that.value3!='空'){
        that.currentCatId=that.value3;
      }else{
        if(that.value2!=''&&that.value2!='空'){
          that.currentCatId=that.value2;
        }else{
          that.currentCatId=that.value1;
        }
      }
      if(that.currentCatId!=undefined){
        that.Some=true;
        this.SomeList = [];
        that.getSomeList();
      }else{
        that.Tip = ('这个目录下是空的！')
      }

    },

    handleSizeChange(val) {
      let that = this
      this.pageSize = val;
      this.SomeList = [];
      that.getSomeList();
    },
    handleCurrentPageChange(val) {
      let that = this
      this.currentPage = val;
      this.SomeList = [];
      that.getSomeList();
    },

    getTwo(data){
      // console.log(data);
      let that = this
      that.options2=[]
      that.value2=''

      axios.get(that.rootURL + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data)
      .then(function(res) {

        if(res.data.obj!=null)    {
          for(var it of res.data.obj)
          that.options2.push({
            label2: it.name,
            value2: it.id,
          })
          that.value2=that.options2[0].value2

        }
        else{
          // console.log('2'+res.data.msg)
          that.value2 = '空'

        }

      })
      .catch(function(error) {
        console.error(error)
      })


    },
    getThree(data){
      // console.log(data);
      let that = this
      that.options3=[]
      that.value3=''
      if(that.value2!='空')
      axios.get(that.rootURL + '/patent_catalog/getNextLevelPatent_catalogById?id=' + data)
      .then(function(res) {
        if(res.data.obj!=null){
          for(var it of res.data.obj)
          that.options3.push({
            label3: it.name,
            value3: it.id,
          })

          that.value3=that.options3[0].value3

        }
        else{
          // console.log('3'+res.data.msg)
          that.value3 = '空'
        }
      })
      .catch(function(error) {
        console.error(error)
      })


    },
    loadFromLocalStorage(id){
      let that = this
      if(localStorage.getItem('catID')!=null){
        var id = localStorage.getItem('catID')
        that.currentCatId = id
        that.getSomeList()
      }

    },
  },
  created(){
    this.loadFromLocalStorage()
  },
  watch:{
    '$route':'loadFromLocalStorage'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  margin-top: 20px;
  margin-bottom: 50px;
  text-align: center;
  color:#444;
}
#topBlock{
  width: 100%;
}
h1{
  text-align: center;
  color: #475669;
  font-size: 28px;
}
/*首页的表格*/
#home-tb-div{
  width: 1080px;
  margin: 0 auto !important;
  margin-top: 20px !important;
  margin-bottom: 60px;
}

.image {
  width: 200px;
  height:120px;
  display: block;
}

.purpose {
  font-size: 14px;
  color: #999;

}
.omit{
  line-height: 13px;
  width:200px;
  overflow: hidden;
  vertical-align: top;
  text-overflow:ellipsis;
  white-space: nowrap;/*不换行*/
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.block{
  float:left;
}
</style>
