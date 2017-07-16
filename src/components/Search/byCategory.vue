<template>
  <div style="width:100%">
    <div id="bigBlock">
      <div id="home-tb-div" style="width:1100px;text-align:center;margin:0 auto;height:900px">
        <div style="float:left;margin-left:20px;">
          <div class="block">
            <el-cascader
            width="900px"
              :options="types"
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
      // types: [{
      //    value: 'zhinan',
      //    label: '指南',
      //    children: [{
      //      value: 'shejiyuanze',
      //      label: '设计原则'
      //     },
      //     {
      //      value: 'daohang',
      //      label: '导航'
      //     }]
      //   }, {
      //    value: 'zujian',
      //    label: '组件',
      //    children: [{
      //      value: 'basic',
      //      label: 'Basic'
      //    },{
      //      value: 'others',
      //      label: 'Others'
      //    }]
      //  }],
      types: [],
      selectedOptions: [],//级联读取结果
      value: '',
      value2: '',
      value3: '',
      idx: '',
      idx2: '',
      btid: '',
    }
  },
  methods:{
    handleCat(){

    },
    getBigTypes(){
      let that = this;
      that.idx = '';
      that.types = [];

      axios.get(that.rootURL+'/queryBtype.do')
      .then(function(res){
        for( that.idx of res.data.btypeList ){
          var bt = {
            value : '',
            label : '',
            children : []
          };
          bt.value = that.idx.btid;
          bt.label = that.idx.btname;

          if(that.idx.stypes!=null){
            for( that.idx2 of that.idx.stypes){
              var st = {
              };
              st.value = that.idx2.stid;
              st.label = that.idx2.stname;
              bt.children.push(st);
            }
          }
          that.types.push(bt)
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    getSmallTypes(idx,btid){
      console.log(idx,btid)
      let that = this;
      that.index = '';

      axios.get(that.rootURL+'/queryStype.do?btid='+btid)
      .then(function(res){
        for( that.index of res.data.stypeList ){
          var st = {};
          st.value = that.index.stid;
          st.label = that.index.stname;
          console.log(that.types[idx])
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    handleChange(value) {
      console.log(value);
    },
    goBack(){
      let that = this
      that.$router.push({path:'/byType'})
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
  },
  created(){
    let that = this;
    that.getBigTypes();
  },
  watch:{
    // '$route':'loadFromLocalStorage'
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
