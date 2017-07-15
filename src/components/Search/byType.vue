<template>
  <div style="width:100%">
    <div id="bigBlock">
      <!-- 内置搜索栏 开始 -->
      <div  id="searchBox" style="width:1210px;text-align:center;margin:0 auto;">
        <div style="margin-top:30px;width:960px;margin: 0 auto;">
          <div style="padding-top:10px;width:1000px;">
            <div style="float:left;margin-top:15px;margin-left:-5px;margin-right:5px"><el-button type="warning"  @click="goBack()"  >按 目 录</el-button></div>
            <div style="float:left;margin-top: 15px;width:800px">
              <el-input placeholder="请把要搜索的告诉我们..." v-model="input5">
                <el-button slot="append" icon="search" @click="tryToSearch()"> 搜 索 </el-button>
              </el-input>
              <div style="float:left;margin-left:0px;width:800px;margin-top:5px;margin-bottom:5px">
              <el-alert  :title="Tip" :type="tipType":closable="false">
              </el-alert>
            </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 内置搜索栏 结束 -->
      <div class="clearfix"></div>

      <!-- 列表展示区 开始  -->
      <div id="home-tb-div" style="width:1210px;text-align:center;margin:0 auto;">
        <div>
          <div style="height:900px;">
            <div style="text-align:center;padding-left:90px;margin:0 auto;">
              <div class="clearfix"></div>
              <div style="margin:10px;margin:0 auto">
                <div style="padding:10px;padding-left:60px;width:1100px;text-align:left" >
                <!-- 一口价（模糊）开始 -->
                <div  v-if="true" style="width:200px;float:left;margin:10px">
                  <div style="height:900px;margin-left:-70px;padding:10px;width:1100px;text-align:left" >
                    <div v-for="esingle in SomeList" style="width:200px;float:left;margin:10px;margin-bottom:25px">
                      <router-link :to="'/' + esingle.id">
                        <el-card class="box-card" :body-style="{ padding: '0px' }">
                          <img :src="esingle.img" class="image">
                          <div style="padding:10px;">
                            <div style="float:left;width:180px;margin-top:-8px">
                              <el-tag type="primary" v-for="single in esingle.cat">{{single}}</el-tag>
                            </div>
                            <div id="name" class="omit" style="font-size:16px;line-height:30px;width:120px;height:35px;float:left">{{esingle.name}}</div>
                            <div id="price" class="omit" style="font-size:16px;line-height:30px;width:50px;height:35px;float:left">¥ {{esingle.price}}</div>
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
                    @size-change="handleSizeChange1"
                    @current-change="handleCurrentPageChange1"
                    :current-page="currentPage1"
                    :page-count = "totalPage1"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize1"
                    layout="total, sizes, prev, pager, next, jumper">
                  </el-pagination>
                </div>
              </div>
                <!-- 一口价（模糊）结束 -->
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表展示区 结束 -->
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
      rootURL: config.URL,	//请求的url
      tableData:[], 	//一口价表格的内容
      loading3: true, //一口价加载中

      input5: '',
      select: '所有专利',

      Some:false,
      FixPriceSome:false,
      auctionSome:false,

      currentCatId: '',
      currentCatName: '',
      showTip: false,
      Tip:'请通过左侧下拉框，选择目录名来查询技术',
      tipType:'info',

      totalPage: 0,
      currentPage: 1,
      pageSize: 12,


      totalPage1: 0,  //一口价总页数
      currentPage1: 1,  //一口价当前页
      pageSize1: 12,  //一口价每页记录
      name_Msg:'',

      totalPage2: 0,
      currentPage2: 1,
      pageSize2: 12,

      SomeList:[],
      fixSomeList:[],
      aucSomeList:[],

      paths_Msg:[],
      FixPriceSomeTF:false,
      auctionSomeTF:false,
      SomeTF:false,


      value:'所有专利',
      transitionName: 'slide-left',

      SomeList:[{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      },{
        img:require('./../../assets/img/car7.jpg'),
        id:'2',
        name:'3',
        price:'999',
        seller:'5',
        cat:'6'
      }],
      noClear:false,//不显示清除按钮
    }
  },
  methods:{
    getDates(date){//此函数用于从日期选择器获得input
      let that = this
      this.timeRange_Auc = date
      that.timeRange_Auc_Left  = that.timeRange_Auc.split(' - ')[0]
      that.timeRange_Auc_Right = that.timeRange_Auc.split(' - ')[1]
    },
    goBack(){
      let that = this
      that.$router.push({path:'/byCategory'})
    },
    searchAll(){
      this.tryToSearch()
    },

    getSomeList(){

    },
    getFixPriceSomeList(){
      let that = this
      that.name_Msg = that.input5
      that.fixSomeList = [];
      that.item=''
      if(that.name_Msg!=null){
        axios.get(that.rootURL+'/orderfixedprice/getOrderFixedPriceByName?' +
        'page='+ that.currentPage1 +
        '&pageSize=' + that.pageSize1 +
        '&name=' + that.name_Msg +
        '&status=' + that.Radio_status_Fix +
        '&low_price=' + that.priceRange_low_Fix +
        '&high_price=' + that.priceRange_high_Fix +
        '&orderS=' + that.Radio_type_Fix +
        '&orderO=' + that.Radio_order_Fix
      )
      .then(function(res){
        if(res.data.obj==null){
          that.currentPage1 =1
        }
        else{
          that.name_Msg=''
          that.totalPage1 = Math.ceil(res.data.dataCount/that.pageSize1)
          for( that.item of res.data.obj ) {
            if(that.item.patent.patentImages!='')
            that.fixSomeList.push({
              img:'http://og07ks0jb.bkt.clouddn.com/'+that.item.patent.patentImages[0].url,
              name:that.item.patent.name,
              purpose:that.item.patent.purpose,
              price:that.item.price,
              status:that.item.status == 1?'进行中':'已结束',
              id:that.item.id
            })
            else{
              that.fixSomeList.push({
                img:'http://og07ks0jb.bkt.clouddn.com/'+'image/user/default.png',
                name:that.item.patent.name,
                purpose:that.item.patent.purpose,
                price:that.item.price,
                status:that.item.status == 1?'进行中':'已结束',
                id:that.item.id
              })
            }
          }
        }
      })
      .catch(function(error){
        console.error(error)
      })
      }else{
        console.log('给我空格怎么搜？！')
      }
    },

    handleSizeChange1(val) {
      let that = this
      this.pageSize1 = val;
      this.fixSomeList = [];
      this.getFixPriceSomeList();
    },
    handleCurrentPageChange1(val) {
      this.currentPage1 = val;
      this.fixSomeList = [];
      this.getFixPriceSomeList();
    },


    tryToSearch() {
      let that = this
      var myChoose=that.select
      that.Tip = '【 搜索结果 】 ' + ' 类型：'+ that.select+' ， 关键字：' + that.input5
    },
 },
watch:{
  input5(val){
    let that = this
    that.input5 = val
  },
  someTF(val) {
    let that = this
    if(val == true){
      this.SomeT = true
      that.FixPriceSomeTF = false
      that.auctionSomeTF = false
      that.tipType = 'info'
      that.show_conditions_Fix=false
      that.show_conditions_Auc=false
      that.SomeList = [];
      that.aucSomeList = [];
      that.fixSomeList = [];
      //  that.tryToSearch()
      //  alert('someTF变化时执行的')
    }else{
      that.SomeTF = false
    }
  },
  select(val){
    let that = this
    that.select = val
    that.SomeList = [];
    that.aucSomeList = [];
    that.fixSomeList = [];
    that.tryToSearch()
    if(that.select == '所有专利'){
      that.show_conditions_Auc=false
      that.show_conditions_Fix=false
      that.tipType = 'info'

    }

  }
},
created(){
  let that = this
  that.tryToSearch()
},
}
</script>

<style scoped>
#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  margin-top: -20px;
  margin-bottom: 50px;
  text-align: center;
  color:#444;
}
h1{
  text-align: center;
  color: #475669;
  font-size: 28px;
}
.el-card{
  float: left;
  margin: 5px 30px;
}

#searchBox{
  width: 1080px;
  margin-top: 20px !important;
  margin: 0 auto
}
#home-tb-div{
  width: 1080px;
  margin: 0 auto !important;
  margin-bottom: 60px;
}
/*分页*/
.block{
  margin-top: 24px;
}
.el-pagination{
  float: right;
}

/*一口价模糊*/

.purpose {
  font-size: 13px;
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

.button {
  padding: 0;
  float: right;
}

.image {
  width: 200px;
  height:120px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
  }/*分页*/
  .block{
    float:left;
    margin-top: 24px;
    margin-left: 610px;
  }
  .el-pagination{
    float: right;
  }

  .condition_Fix .el-tag{
    background-color: white;
    border:1px solid  green;

    height:44px;
    padding:7px;
    padding-left:10px;
    width:1052px;
    margin-left: -45px
  }
  .el-button--warning{
    width:100px;
    height:77px;
    /*margin-top:50px*/
  }
  .condition_Auc .el-tag{
    background-color: white;
    border:1px solid  rgb(235, 5, 94);
    height:44px;
    padding:7px;
    padding-left:10px;
    width:1052px;
    margin-left: -45px
  }

  .smallCard .el-tag{
    background-color: transparent
  }
  </style>
