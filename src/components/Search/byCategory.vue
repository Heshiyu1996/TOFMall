<template>
  <div>
      <myHeader></myHeader>
    <div id="bigBlock">
      <div class="clearfix"></div>
      <div>
      <div style="width:1100px;text-align:center;margin:0 auto;margin-top:20px;">
        <div style="float:left;margin-left:20px;">
            <el-select v-model="value" placeholder="请选择大类别" @change="selectBigTypes">
              <el-option
                v-for="item in types"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div style="float:left;margin-left:20px;" >
          <el-select v-model="value1" placeholder="请选择小类别" @change="selectSmallTypes">
            <el-option
              v-for="item in smallTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div style="float:left;margin-left:20px;" >
        <el-input @keyup.enter.native="handleCat()"
          placeholder="请输入商品"
          icon="search"
          v-model="value2"
          :value="condition"
          :on-icon-click="handleCat">
        </el-input>
      </div>
        <div style="text-align:center;float:left;margin-left:10px;">
          <div style="width:200px;margin-left:10px;float:left">
            <div style="float:left;width:100px;">
              <el-button type="primary" @click="handleCat"> 搜 索 </el-button>
            </div>
            <div>
              <el-button type="success" @click="goBack">按 关 键 字</el-button>
            </div>
          </div>
          <!-- <div style="float:right;margin-left:12px;width:550px;">
            <el-alert
              :title="Tip" type="info":closable="false">
            </el-alert>
          </div> -->
        </div>
      </div>
        <div class="clearfix"  ></div>
        <!-- 列表展示区 开始  -->
          <div  class="resultList "  style="margin-left:123px;padding:10px;padding-left:60px;width:860px;text-align:left" >
              <div style="text-align:center;margin:0 auto;">
                <div class="clearfix"></div>
                <div style="margin:10px;margin:0 auto">
                  <div style="padding:10px;width:860px;text-align:left" >
                  <!-- 一口价（模糊）开始 -->
                  <div  style="padding: 0px 20px;width:180px;margin-left:10px;">
                    <div   style="height:700px;width:960px;ext-align:left;margin-left:-70px" >

                      <div v-for="esingle in SomeList" style="width:180px;float:left;margin:10px;">
                        <router-link :to="'/ItemInfo/' + esingle.id">
                          <transition name="el-fade-in-linear">
                            <el-card  v-show="show2" class="box-card" style="float:none;margin : 0;" :body-style="{ padding: '0px' }">
                              <div style="position:absolute;" v-if="esingle.haveGrade">
                                <span class="css-item-grade" style="position:absolute;margin-left:168px;font-size:15px;margin-top:-5px;color:white;font-weight:bold;text-shadow:0px 0px 5px yellow">{{esingle.grade}}</span>
                                  <i class="el-icon-star-on" style="margin:-15px 0px 0px 160px;font-size:36px;color:#FC7500;">
                                  </i>
                              </div>
                              <img :src="esingle.img" class="image" >
                              <div style="padding:10px;">
                                <div id="name" class="omit" style="font-size:16px;line-height:30px;width:120px;height:35px;float:left">{{esingle.name}}</div>
                                <div style="text-align:left;float:left;font-size:12px;font-weight:bold;color:rgb(230, 94, 64)" >￥
                                  <div style="text-align:left;width:40px;font-size:14px;float:right;line-height:17px;" class="omit" >{{esingle.price}}</div>
                                </div>
                                <div class="clearfix"></div>
                              </div>
                            </el-card>
                            </transition>
                        </router-link>
                      </div>

                    </div>
                    <div class="clearfix"></div>


                </div>
                  <!-- 一口价（模糊）结束 -->
                </div>


              </div>
              </div>

          </div>
          <!--分页组件-->
          <div class="pagination">
            <el-pagination class="pagination"
              @size-change="handleSizeChange"
              @current-change="handleCurrentPageChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount">
            </el-pagination>
          </div>
      </div>
    </div>

    <div class="clearfix"></div>
        <myFooter></myFooter>
  </div>
</template>

<script>

import config from './../../publicAPI/config'
import axios from 'axios'
import { Loading } from 'element-ui';
import { Notification } from 'element-ui'
import myHeader from './../Public/Header/Header'
import myFooter from './../Public/Footer/Footer'

export default {
  components:{
    myHeader,
    myFooter
  },
  data () {
    return {
      show2: true,
      rootURL: config.JXURL,	//请求的url

      idList:[],
      item:'',

      tableData:[],
      loading3: true,

      currentCatId: '',
      currentCatName: '',
      Tip:'请通过左侧下拉框，选择标签来查询商品',
      Some:false,
      SomeList:[],

      totalCount: '',
      currentPage: 1,
      pageSize: 10,

      paths_Msg:[],
      paths_Tips:[],
      types: [],
      smallTypes:[],
      value: '',
      value1: '',
      value2: '',
      idx: '',
      idx2: '',
      btid: '',
      stid:'',
      condition:'',
    }
  },
  methods:{
    handleSizeChange(val) {
      let that = this
      that.pageSize = val;
      that.handleCat();
    },
    handleCurrentPageChange(val) {
      let that =this
      that.currentPage = val;
      that.handleCat();
    },
    handleCat(){
      let that = this;
      var bt = that.btid;
      var st = that.stid;
      that.show2 = false;
      setTimeout(() => {
        that.show2 = true;
      }, 100);
      var tmpList = {

      };
      that.SomeList = [];
      axios.get(that.rootURL+'/search.do?currentPage='+that.currentPage+'&pageSize='+that.pageSize+'&btid='+ bt + '&' +'stid=' + st+'&condition='+that.value2)
      .then(function(res){
        for( that.idx of res.data ){
            if(that.idx.cid!=null){
            tmpList = [];
            tmpList.img = that.rootURL+'/'+that.idx.miniPic,
            tmpList.id = that.idx.cid;
            tmpList.name = that.idx.cname;
            tmpList.price = that.idx.cprice;
            tmpList.remain = that.idx.cremain;
            if(that.idx.grade!=null){
              tmpList.grade = that.idx.grade.toFixed(1);
              tmpList.haveGrade=true;
            }else {
              tmpList.haveGrade=true;
              tmpList.grade ='5.0';
            }
            that.SomeList.push(tmpList);
          }
          if (that.idx.totalCount!=null) {
            that.totalCount=that.idx.totalCount;
            console.log('总记录数：'+that.idx.totalCount);
          }
        }
      })
      .catch(function(error){
        console.error(error)
      })
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
            label : ''
          };
          bt.value = that.idx.btid;
          bt.label = that.idx.btname;
          that.types.push(bt)
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },

    selectBigTypes(values){

      console.log('大标签'+values);
      let that = this;
      that.index = '';
      that.value1=[];
      that.btid=values;
      that.smallTypes=[];
      axios.get(that.rootURL+'/queryStype.do?btid='+values)
      .then(function(res){
        for( that.index of res.data.stypeList ){
          var st = {};
          st.value = that.index.stid;
          st.label = that.index.stname;
          that.smallTypes.push(st);
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },
    selectSmallTypes(val){
      console.log('小标签'+val);
      let that = this;
      that.stid=val;
    },

    handleChange(value) {

    },
    goBack(){
      let that = this
      that.$router.push({path:'/byType'})
    },

  },
  created(){
    let that = this;
    that.getBigTypes();
    that.handleCat();
  },
  watch:{
    // '$route':'loadFromLocalStorage'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.resultList{
  /*border: 1px solid gray;*/
  width: 960px;
  min-height: 600px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 30px 20px 50px 20px;
  background-color:rgba(247, 247, 247,0.2);
  -ms-filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 8 */
  filter: progid:DXImageTransform.Microsoft.Shadow(Strength=4, Direction=135, Color='#000000');  /* For IE 5.5 - 7 */
  -moz-box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for firefox */
  -webkit-box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for safari or chrome */
  box-shadow: -5px 0px 15px #D0D0D0,
  5px 0px 15px #D0D0D0;/* for opera or ie9 */
}

#bigBlock{
  width: 1210px;
  margin: 0 auto ;
  /*margin-top: 20px;*/
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

.transition-box {
margin-bottom: 10px;
border-radius: 4px;
box-sizing: border-box;
}
</style>
