<template>
    <div>
        <myHeader></myHeader>
        <!-- 头部 -->
        <div style="width:900px;height:1000px;margin:0 auto;text-align:center;">

            <br>
            <br>
            <div style="margin-top:10px;float:left;width:900px;height:30px;margin-bottom:8px">
                <div type="flex" class="row-bg goodsName" justify="space-between">
                    <div :title="name_Msg" class="grid-content bg-purple  goodsName omit" style="font-weight:bold;width:860px;">
                  {{myGood.name}}
                    </div>

                    <el-col :span="19" :title="purpose_Msg">
                        <div class="grid-content bg-purple-light2 goodsSummary omit">
                            {{purpose_Msg}}
                        </div>
                    </el-col>
                </div>
            </div>
            <div style="width:600px;border:1px dashed rgba(186, 192, 193, 0.6);padding:8px;float:left;height:350px">


                <el-carousel :interval="5000" arrow="always" height="330px" >
                    <el-carousel-item v-for="sin in photosList">
                            <img :src="sin" style="height:100%;width:100%">
                  </el-carousel-item>
                </el-carousel>

            </div>

            <!-- 价格信息 -->
            <div style="float:left">
                <el-card style="margin-left:10px">
                    <div class="block">
                        <span  class="attr" style="margin-top:-10px;float:left;">  一口价：</span>
                        <div class=" item shanshuo omit" style="width:150px;font-size:26px;text-align:right;margin-left:30px">
                            ¥ {{myGood.price}}
                        </div>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  大类别：</span>
                        <span class="text item shanshuo" style="font-size:16px;text-align:right;color:#677ab7;font-weight:bold">
                    {{myGood.btype}}
                      </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  小类别：</span>
                        <span class="text item shanshuo" style="font-size:16px;text-align:right;color:#677ab7;font-weight:bold">
                    {{myGood.stype}}
                      </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  剩余数量：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right">
                        {{myGood.remain}}
                    </span>
                    </div>
                    <div class="text item block" style="text-align:right">
                        <span class="attr">  月销量：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right;">
                        {{myGood.monthSale}} <span style="font-size:14px">件</span>
                    </span>
                    </div>
                    <div class="text item block" style="text-align:right;border-bottom:0px solid white">
                        <span class="attr">  商品评分：</span>
                        <span class="text item shanshuo" style="font-size:20px;text-align:right;color:#ff9900">
                        {{myGood.grade}}</span>
                        <!-- <span style="text-align:right;font-size:14px">分</span> -->

                    </div>
                </el-card>
            </div>
            <!-- 购买按钮 'status','patentName','patentSummary','seller','price','buyer','imgPath'-->
            <div style="padding-left:20px;width:260px;float:left;margin-bottom:10px">
                  <div style="margin:10px 0px 0px 30px">
                    <el-input-number size="small" v-model="count" @change="handleChange" :min="1" :max="myGood.remain"></el-input-number>
                  </div>
                   <!-- 立即购买 -->
                  <div style="margin-left:10px">
                    <el-button type="success"   @click="buyNow()">立即购买</el-button>
                    <el-button  type="warning" @click="addCar()">加入购物车</el-button>
                  </div>

            </div>
                <!-- 评论区开始 -->
                <div style="width:1210px;margin:0 auto;">
                  <div style="float:left;margin-top:10px">
                    <div class="clearfix"></div>
                      <div style="text-align:left">
                          <el-collapse v-model="activeNames" style="width:861px">
                            <el-collapse-item title="评论区" name="1">
                                <div v-show="noComment" style="text-shadow:0px 0px 5px #9ab9f5;color:gray;;">还没有人评论过这件商品喔~~你要不要成为第一个？</div>
                                <div v-for="esingle in reviewList" style="height:auto!important;min-height:50px;margin-bottom:5px;border-bottom:1px dotted #cccccc">
                                  <div style="width:600px;float:left;font-size:14px;"><img :src="tx" width=25px height=25px style="vertical-align:middle;margin-right:5px">
                                    <span>{{esingle.username}}</span>
                                    <span>
                                      <el-rate
                                        v-model="esingle.grade"
                                        disabled
                                        text-color="#ff9900"
                                        text-template="{value}"
                                        style="display:inline;line-height:15px;margin-left:10px">
                                      </el-rate>
                                    </span>
                                  </div>
                                  <div style="float:right">发布于：{{esingle.time}}</div>
                                  <div class="clearfix" ></div>
                                  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{esingle.text}}</div>

                                </div>
                            </el-collapse-item>
                          </el-collapse>
                      </div>
                  </div>

                  <div class="clearfix"></div>
                    <div style="float:left;margin-top:10px">
                      <div class="clearfix"></div>
                        <div style="text-align:left;">
                            <el-collapse v-model="activeNames" style="width:861px">
                              <el-collapse-item title="购买了这件商品的人还买了" name="2">
                                <div style="display:flex;justify-content:space-around;padding:5px 0px;">
                                  <div @mouseenter="shakes" v-for="esingle in LoveList" style="float:left;width:150px;margin-left:0px;">
                                    <router-link :to="'/ItemInfo/' + esingle.id">
                                      <transition name="el-fade-in-linear">
                                        <el-card  class="box-card" :body-style="{ padding: '0px' }">
                                          <div style="position:absolute;z-index:9999" v-if="esingle.haveGrade">
                                            <span class="css-item-grade" style="position:absolute;width:17px;text-align:center;margin-left:134px;margin-top:-5px;color:white;font-weight:bold;text-shadow:0px 0px 5px yellow">{{esingle.grade}}</span>
                                              <i class="el-icon-star-on" style="margin:-15px 0px 0px 125px;font-size:34px;color:#FC7500;">
                                              </i>
                                          </div>
                                          <img :src="esingle.img" class="imgSmall" >
                                          <div style="padding:10px;">
                                            <div  class="omit" style="font-size:16px;line-height:30px;width:130px;height:35px;float:left">{{esingle.name}}</div>
                                            <div style="text-align:left;float:left;font-size:12px;font-weight:bold;color:rgb(230, 94, 64)" >￥
                                              <div style="text-align:left;width:80px;font-size:14px;float:right;line-height:17px;" class="omit" >{{esingle.price}}</div>
                                            </div>
                                            <div class="clearfix"></div>
                                          </div>
                                        </el-card>
                                        </transition>
                                    </router-link>
                                  </div>
                                </div>
                              </el-collapse-item>
                            </el-collapse>
                        </div>
                    </div>
                </div>
        </div>
        <div class="clearfix"></div>
            <myFooter></myFooter>
    </div>
</template>
<script>


import axios from 'axios'
import config from './../../publicAPI/config'
import { Message } from 'element-ui';//信息提示框
import { Notification } from 'element-ui';
import myHeader from './../Public/Header/Header'
import myFooter from './../Public/Footer/Footer'

export default {
    components: {
        top,
        myHeader,
        myFooter
    },
    data() {
        return {
            noComment:true,
            count:1,
            textarea3: '',
            inputContent: '',
            outputContent: '',
            uploadURL: '',
            item: '',
            rootURL: config.JXURL,
            tx: [
                require('./../../assets/img/tx.jpg'),
            ],
            xx: [
                require('./../../assets/img/buy.png'),
            ],
            photosList: [
      		  	 require('./../../assets/img/car7.jpg'),
      		  	 require('./../../assets/img/car8.jpg'),
      		  	 require('./../../assets/img/car9.jpg'),
             ],
            C: '',
            name_Msg: '',
            purpose_Msg: '',
            number_Msg: '',
            readNumber_Msg:0,

            paths_Msg: [],

            price_Msg: '正在拉取...',
            status_Msg: '正在拉取...',
            startTime_Msg: '正在拉取...',
            seller_Msg: '正在拉取...',

            activeNames: ['1', '2'],

            descrip_Msg: '正在拉取...',
            design_Msg: '正在拉取...',

            sho: false,

            sellerName_Msg: '',
            reviewList: [],
            myGood:{},
            LoveList:[{
                img:require('./../../assets/img/suannai.jpg'),
                id:'2',
                name:'华农酸奶（原味）',
                price:'2.50',
                seller:'5',
                cat:'6'
              },{
                img:require('./../../assets/img/weitanai.jpg'),
                id:'2',
                name:'维他奶（原味）',
                price:'3.00',
                seller:'5',
                cat:'6'
              },{
                img:require('./../../assets/img/pijiu.jpg'),
                id:'2',
                name:'百威啤酒（罐装）',
                price:'6.50',
                seller:'5',
                cat:'6'
              },{
                img:require('./../../assets/img/zhishi.jpg'),
                id:'2',
                name:'芝士蛋卷',
                price:'14.50',
                seller:'5',
                cat:'6'
              },{
                img:require('./../../assets/img/dikaila.jpg'),
                id:'2',
                name:'凯迪拉克S168',
                price:'1999999.99',
                seller:'5',
                cat:'6'
              }],
        }
    },
    methods: {
      ifGoToCart(){
        let that = this;
        const h = this.$createElement;
        this.$msgbox({
          title: '添加购物车成功！',
          message: h('p', null, [
            h('span', null, '恭喜你！这件商品已加入进了你的购物车，'),
            h('br', { style: 'color: teal' }, ''),
            h('B', { style: 'color: teal' }, '是否 现在'),
              h('span', null, ' 前往查看？ '),
          ]),
          showCancelButton: true,
          confirmButtonText: '我们走吧！',
          cancelButtonText: '不，谢谢',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '购物车呈现中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  // instance.confirmButtonLoading = false;
                  that.$router.push({path:'/userIndex/ShoppingCart'})
                }, 300);
              }, 1500);
                instance.confirmButtonLoading = false;
            } else {
              done();
            }
          }
        }).then(action => {
          // this.$message({
          //   type: 'info',
          //   message: 'action: ' + action
          // });
        });
      },
        handleChange(value) {
          console.log(value);
        },
      buyNow(){
        let that = this ;
        var querystring = require('querystring');//Json数据查询器
        axios.post(that.rootURL +'/shopping.do',
           querystring.stringify({
             cid:that.C,
             csize:that.count,
           })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
          )
          .then(function(res){
          if(res.data.status){
            Notification.success({
                      title: '购买成功！',
                      message: '你直接购买成功了！',
                      offset: 65,
                        duration:2000
                    })
          } else {
            Notification.error({
                      title: '购买失败！',
                      message: res.data.msg,
                      offset: 65,
                      duration:2000
                    })
            // window.location = '#/tradeSystem/login'
          }
          })
          .catch(function(error){
            Message.error('请检查网络配置！');
          });
      },
        addCar(){
          let that = this ;
          var querystring = require('querystring');//Json数据查询器
          axios.post(that.rootURL +'/addCart.do',
             querystring.stringify({
               cid:that.C,
               csize:that.count,
             })//将参数放到查询器的查询函数里，这样传过去的json形式的参数才能被发现然后提取
            )
            .then(function(res){
            if(res.data.status){
              that.ifGoToCart();
              // Notification.success({
              //           title: '添加成功！',
              //           message: '加入购物车成功了',
              //           offset: 65,
              //             duration:2000
              //         })
            } else {
              Notification.error({
                        title: '购买失败！',
                        message: res.data.msg,
                        offset: 65,
                        duration:2000
                      })
              // window.location = '#/tradeSystem/login'
            }
            })
            .catch(function(error){
              Message.error('请检查网络配置！');
            });
        },
      getItemInfo(){
          let that = this;

          that.photosList=[];
          axios.get(that.rootURL+'/getGoodsByCid.do?cid=' + that.C)
          .then(function(res){
              that.idx = res.data
              if(that.idx.status){
                that.myGood = {
                };
                that.myGood.id = that.idx.cid;
                that.myGood.name = that.idx.cname;
                that.myGood.btype = that.idx.btype;
                that.myGood.stype = that.idx.stype;
                that.myGood.price = that.idx.cprice;
                that.myGood.remain = that.idx.cremain;
                that.myGood.monthSale = that.idx.monthSale;
                if(that.idx.grade!=null&&that.idx.grade!=0){
                  that.myGood.grade = that.idx.grade;
                }else {
                  that.myGood.grade = '暂无评分'
                }
                that.photosList.push(that.rootURL+'/'+that.idx.pic1);
                that.photosList.push(that.rootURL+'/'+that.idx.pic2);
                that.photosList.push(that.rootURL+'/'+that.idx.pic3);
              } else {
                that.$router.push({path:'/byCategory'})
                Notification.error({
                          title: '请检查是否存在该商品ID！',
                          message: res.data.msg,
                          offset: 65,
                            duration:2000
                        })
              }
          })
          .catch(function(error){
            console.error(error)
          })
      },
      getReviewInfo(){
          let that = this;
          that.reviewList = [];

          axios.get(that.rootURL+'/queryReview.do?cid=' + that.C)
          .then(function(res){
            for( that.idx of res.data.list ){
              var myRev = {
              };
              myRev.id = that.idx.id;
              myRev.text = that.idx.text;
              myRev.time = that.idx.time;
              myRev.grade = that.idx.grade;
              myRev.username = (that.idx.username)?that.idx.username:'匿名用户'

              that.reviewList.push(myRev)
            }
            that.noComment =
              (that.reviewList.length == 0 ? true:false);
          })
          .catch(function(error){
            console.error(error)
          })
      },


      setLocalStorage(id){
          let that = this
          localStorage.setItem('catID',id)
          that.$router.push({path:'/tradeSystem/search/byCategory'})
      },

      hsytt(){
        let that = this ;
        that.C= that.$route.params.newID;
        this.getReviewInfo();
        this.getItemInfo();
        this.getRecommendByCid();
      },

      shakes(e){
        e = (e.targetclassName= 'imgSmall')? e.target :null;
        if (!time) var time=650;
        if (!distance) var distance=4;
        var originalStyle=e.style.cssText;
        e.style.position='relative';
        var start=(new Date()).getTime();
        animate();
        function animate(){
          var now=(new Date()).getTime();
          var elapsed=now-start;
          var fraction=elapsed/time; //按下按钮后经过长度为time的时间后 还原，也就是说动画执行的时间
          if (fraction<1)
          {
           var x=distance*Math.sin(fraction*4*Math.PI);
            e.style.left=x+'px';
            setTimeout(animate,Math.min(25,time-elapsed));
          }
          else
          {
            e.style.cssText=originalStyle;
          }
        }
      },

        fade(e){
          clearInterval(timer);
          e =e.target;
          console.log(e)
          var speed = 1;
          var timer = null;
          var alpha=50;
          e.onmouseover = function(){
            startrun(60);
          }
          e.onmouseout = function(){
            startrun(20);
          }
          function startrun(target){
            clearInterval(timer);
            timer = setInterval(function(){
              if(target > alpha){
                speed = 1;
              }else{
                speed = -1;
              }
              if(alpha == target){
                clearInterval(timer);
              }
              else{
                alpha = alpha + speed;
                e.style.filter = 'alpha(opacity='+alpha+')';
                e.style.opacity = alpha/60;
              }
            },10)
          }
        },
            getRecommendByCid(){
              // console.log("获取商品相关推荐");
              let that=this
              var url=that.rootURL+'/getRecommendByCid.do?cid='+that.C;
              var tmpList = {

              };
              that.LoveList = [];
              axios.get(url)
              .then(function(res){
                for( that.idx of res.data ){
                  console.log('推荐商品');
                    tmpList = [];
                    tmpList.img = that.rootURL+'/'+that.idx.commodity.miniPic,
                    tmpList.id = that.idx.introCid;
                    tmpList.name = that.idx.commodity.cname;
                    tmpList.price = that.idx.commodity.cprice;
                    tmpList.remain = that.idx.commodity.cremain;
                    if(that.idx.commodity.grade!=null){
                      tmpList.grade = that.idx.commodity.grade;
                      tmpList.haveGrade=true;
                    }else {
                      tmpList.haveGrade=true;
                      tmpList.grade ='5.0';
                    }
                    that.LoveList.push(tmpList);
                }
              })
              .catch(function(error){
                console.error(error)
              })
            }

    },
    created() {
      let that = this ;
      that.C= that.$route.params.newID;
      that.hsytt();
    },
    watch:{
      '$route':'hsytt'
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigFrame {
    border-style: dashed;
    margin: 0 auto;
    width: 1140px;
    margin-top: 10px;
    border-color: rgb(160, 160, 160);
}

.biankuang tr td {
    text-align: right;
    padding-right: 18px
}
.el-card{
  margin: 0px;
}
.buttons tr td button {
    width: 318px;
    height: 46px;
    border: 1px solid #377ab7;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #377ab7;
    padding: 3px 10px;
}

.buttons tr td button:hover {
    background: #276387;
    border: 1px solid #377ab7;
}

.buttons button {
    width: 318px;
    height: 46px;
    border: 1px solid #2E426C;
    outline: none;
    border-radius: 2px;
    font-size: 16px;
    color: #fff;
    background: #2E426C;
    padding: 3px 10px;
}

.buttons button:hover {
    background: #215a78;
    border: 1px solid #377ab7;
}


/*goods_top的*/

.goodsName,
.goodsSummary,
.goodsNum {
    font-size: 24px;
    float: left;
    text-align: left;
    padding-left: 5px;
    font-family: "微软雅黑";
    color: rgb(70, 80, 93);
}

.goodsSummary {
    font-size: 14px;
    padding-top: 5px;
    margin-left: 15px;
    color: rgb(163, 163, 163);
}

.goodsNum {
    float: right !important;
    margin-left: 20px !important;
    width: 330px !important;
    text-align: center;
    line-height: 30px;
    font-size: 10px;
    color: rgb(163, 163, 163);
}

.el-col {
    border-radius: 4px;
}

.bg-purple {
    background: rgba(#87a6f7, 0.59);
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}

.row-bg {
    padding: 5px 0;
    height: 65px;
    background-color: #f9fafc;
    border-radius: 6px;
}

.omit {
    width: 840px;
    overflow: hidden;
    vertical-align: top;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*不换行*/
}


/*面包屑的*/

.guide {
    font-family: '宋体';
    width: 1110px;
    margin: 0 auto;
    margin-top: 5px;
}

.route {
    font-family: '微软雅黑';
    font-size: 16px
}


/*priceInfo的*/

.attr {
    float: left;
    line-height: 30px;
}

.block {
    text-align: right;
    border-bottom: 1px dashed gray
}

.infoTop {
    float: right;
    margin-top: -12px;
    margin-right: -10px
}

.text {
    font-size: 16px;
}

.item {
    padding: 10px 0;
    color: #63738b
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card {
    width: 150px;
    height: 190px
}

.shanshuo:hover {
    text-shadow: 0 0 10px #42a0dd;
    opacity: 1;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
}

.askerImg {
    float: left;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-top: -2px;
}

/*购买按钮*/
.el-button--primary{
  width: 130px !important;
}
.el-button--success,.el-button--warning{
  padding: 0px;
  float:left;
  letter-spacing: 2px;
  font-size: 16px;
  width: 100px !important;
  height: 35px;
  margin-top:15px !important;
}
  .button {
    padding: 0;
    float: right;
  }

.nameText{
    margin-left: 30px !important;
    height:40px;
    /*background-color: rgba(145, 148, 156, 0.33);*/
    color:rgb(94, 109, 130);
    font-family: '微软雅黑';
    font-size: 24px;
    text-align: left;

  }
.purposeText{
    margin-top:5px;
    width:400px;
    height:40px;
    margin-left: 10px;
    /*background-color: rgba(145, 148, 156, 0.2);*/
    color:rgba(94, 109, 130, 0.72);
    font-family: '微软雅黑';
    font-size: 14px;
    text-align: left;

    overflow: hidden;
    vertical-align: top;
    text-overflow:ellipsis;
    white-space: nowrap;/*不换行*/
  }

 .buyerName{
    text-align: left;
    padding:5px;
    float:right;
    margin-top:5px;
    margin-left: 9px !important;
    width:200px;
    height:60px;
    margin-right: 42px;

    border:1px solid #377ab7;
    color:rgb(46, 46, 52);
    font-family: '微软雅黑';
    font-size: 14px;
  }

   .account{
      text-align: left;
      padding:5px;
      float:right;
      margin-top:5px;
      width: 375px !important;
      height:80px;
      margin-right: 8px;
      border:1px solid #377ab7;
      color:rgb(46, 46, 52);
      font-family: '微软雅黑';
      font-size: 14px;
    }
    .image_ApplyBox {
      width: 100%;
      display: block;
    }

     .resultList{
       /*border: 1px solid gray;*/
       width: 960px;
       min-height: 300px;
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

     .imgSmall {
        width: 150px;
        height:120px;
        display: block;
     }

     .css-item-grade{

     }
</style>
