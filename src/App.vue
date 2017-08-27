<template>
  <div id="app">
    <div>
      <myHeader></myHeader>
      <div class="css-body">
        <div class="css-body-bigPics">
          <el-carousel indicator-position="outside" height="362px">
            <el-carousel-item v-for="(item,key) in pics" :key="key">
    		      <img :src="item" height="100%"  style="border-radius:8px"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="css-body-content">
          <div class="css-body-content-type">
            <el-input @keyup.enter.native="tryToSearch()" placeholder="请把要搜索的告诉我们..." v-model="myInput">
              <el-button slot="append" class="appBTN" icon="search" @click="tryToSearch()"> 搜 索 </el-button>
            </el-input>

            <div  class="resultList"  style="margin-left:-250px;padding:10px;padding-left:60px;width:1080px;text-align:left" >
                <div style="text-align:left;">
                  <div style="font-size:16px;font-weight:bold;padding-top:10px">热卖商品</div>
                  <div class="clearfix"></div>
                  <div style="margin:10px;margin:0 auto">
                    <div style="padding:10px;width:860px;text-align:left" >
                    <!-- 本周热卖 开始 -->
                    <div  style="padding: 0px 20px;width:180px;margin-left:10px;">
                      <div style="width:1080px;ext-align:left;margin-left:-100px" >

                        <div  @mouseenter="shakes" v-for="esingle in SomeList" style="width:180px;float:left;margin:10px;">
                          <router-link :to="'/ItemInfo/' + esingle.id">
                            <transition name="el-fade-in-linear">
                              <el-card  class="box-card" :body-style="{ padding: '0px' }">
                                <div style="position:absolute;" v-if="esingle.haveGrade">
                                  <span class="css-item-grade" style="position:absolute;margin-left:168px;font-size:15px;margin-top:-5px;color:white;font-weight:bold;text-shadow:0px 0px 5px yellow">{{esingle.grade}}</span>
                                    <i class="el-icon-star-on" style="margin:-15px 0px 0px 160px;font-size:36px;color:#FC7500;">
                                    </i>
                                </div>

                                <img :src="esingle.img" class="imgSmall" >
                                <div style="padding:10px;">
                                  <div id="name" class="omit" style="font-size:16px;line-height:30px;width:150px;height:35px;float:left">{{esingle.name}}</div>
                                  <div>
                                  <div style="text-align:left;float:left;font-size:12px;font-weight:bold;color:rgb(230, 94, 64)" >￥
                                    <div style="text-align:left;width:80px;font-size:14px;float:right;line-height:17px;" class="omit" >{{esingle.price}}</div>
                                  </div>
                                  <div style="text-align:left;float:right;font-size:12px;font-weight:bold;">总销量:<span style="color:green;">{{esingle.sales}}</span>
                                  </div>
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
                    <!-- 本周热卖 结束 -->
                  </div>
                </div>
                </div>
            </div>
            <div  class="resultList"  style="margin-left:-250px;padding:10px;padding-left:60px;width:1080px;text-align:left" >
                <div style="text-align:left;">
                  <div style="font-size:16px;font-weight:bold;padding-top:10px">猜你喜欢</div>
                  <div class="clearfix"></div>
                  <div style="margin:10px;margin:0 auto">
                    <div style="padding:10px;width:860px;text-align:left" >
                    <!-- 猜你喜欢 开始 -->
                    <div  style="padding: 0px 20px;width:180px;margin-left:10px;">
                      <div style="width:1080px;ext-align:left;margin-left:-100px" >

                        <div  @mouseenter="shakes" v-for="esingle in LoveList" style="width:180px;float:left;margin:10px;">
                          <router-link :to="'/ItemInfo/' + esingle.id">
                            <transition name="el-fade-in-linear">
                              <el-card  class="box-card" :body-style="{ padding: '0px' }">
                                <div style="position:absolute;" v-if="esingle.haveGrade">
                                  <span class="css-item-grade" style="position:absolute;margin-left:168px;font-size:15px;margin-top:-5px;color:white;font-weight:bold;text-shadow:0px 0px 5px yellow">{{esingle.grade}}</span>
                                    <i class="el-icon-star-on" style="margin:-15px 0px 0px 160px;font-size:36px;color:#FC7500;">
                                    </i>
                                </div>

                                <img :src="esingle.img" class="imgSmall" >
                                <div style="padding:10px;">
                                  <div  class="omit" style="font-size:16px;line-height:30px;width:150px;height:35px;float:left">{{esingle.name}}</div>
                                  <div>
                                  <div style="text-align:left;float:left;font-size:12px;font-weight:bold;color:rgb(230, 94, 64)" >￥
                                    <div style="text-align:left;width:50px;font-size:14px;float:right;line-height:17px;" class="omit" >{{esingle.price}}</div>
                                  </div>
                                  <div style="text-align:left;float:right;font-size:12px;font-weight:bold;">人气值:<span style="color:green;">{{esingle.rank}}</span>
                                  </div>
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
                    <!-- 猜你喜欢 结束 -->
                  </div>
                </div>
                </div>
            </div>
            <div  class=""  style="margin-left:-250px;padding:10px;padding-left:60px;width:1080px;text-align:left" >
                <div style="text-align:left;">
                  <div style="font-size:18px;font-weight:bold;padding-top:10px">热门分类</div>
                  <div class="clearfix"></div>
                  <div style="margin:10px;margin:0 auto">
                    <div style="padding:10px;width:860px;text-align:left" >
                    <!-- 一口价（模糊）开始 -->
                    <div  style="padding: 0px 20px;width:180px;margin-left:10px;">
                      <div style="width:1080px;ext-align:left;" >

                        <div v-for="esingle in TypeList" style="width:380px;float:left;margin:40px;">
                          <h1>{{esingle.name}}</h1>
                          <router-link to="/byCategory">
                              <el-card  class="types" :body-style="{ padding: '0px' }">
                                <img :src="esingle.img" class="image" >
                              </el-card>
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
          </div>
        </div>
      </div>
    </div>

        <myFooter></myFooter>
  </div>

</template>

<script>
import config from './publicAPI/config'
import axios from 'axios'
import myHeader from './components/Public/Header/Header'
import myFooter from './components/Public/Footer/Footer'

export default {
  components:{
    myHeader,
    myFooter
  },
  data () {
    return {
      rootURL: config.JXURL,	//请求的url
            TypeList:[{
              img:require('./assets/img/item2.png'),
              id:'2',
              name:'懂酒就懂他',
              price:'2.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/item3.png'),
              id:'2',
              name:'爱美的夏天',
              price:'3.00',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/item1.png'),
              id:'2',
              name:'进口的最爱',
              price:'6.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/item4.png'),
              id:'2',
              name:'渴了就来这',
              price:'14.50',
              seller:'5',
              cat:'6'
            }],
            SomeList:[{
              img:require('./assets/img/suannai.jpg'),
              id:'2',
              name:'华农酸奶（原味）',
              price:'2.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/weitanai.jpg'),
              id:'2',
              name:'维他奶（原味）',
              price:'3.00',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/pijiu.jpg'),
              id:'2',
              name:'百威啤酒（罐装）',
              price:'6.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/zhishi.jpg'),
              id:'2',
              name:'芝士蛋卷',
              price:'14.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/dikaila.jpg'),
              id:'2',
              name:'凯迪拉克S168',
              price:'1999999.99',
              seller:'5',
              cat:'6'
            }],
            LoveList:[{
              img:require('./assets/img/suannai.jpg'),
              id:'2',
              name:'华农酸奶（原味）',
              price:'2.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/weitanai.jpg'),
              id:'2',
              name:'维他奶（原味）',
              price:'3.00',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/pijiu.jpg'),
              id:'2',
              name:'百威啤酒（罐装）',
              price:'6.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/zhishi.jpg'),
              id:'2',
              name:'芝士蛋卷',
              price:'14.50',
              seller:'5',
              cat:'6'
            },{
              img:require('./assets/img/dikaila.jpg'),
              id:'2',
              name:'凯迪拉克S168',
              price:'1999999.99',
              seller:'5',
              cat:'6'
            }],
      myInput:'',
      pics: [
  		   require('./assets/img/index3.png'),
		  	 require('./assets/img/index1.png'),
		  	 require('./assets/img/index2.png'),
		  	 require('./assets/img/index0.png'),
      ]
    }
  },
  methods:{
    getRecommendByUser(){
      let that=this
      var url=that.rootURL+'/getRecommendByUser.do';
      var tmpList = {

      };
      that.LoveList = [];
      axios.get(url)
      .then(function(res){
        for( that.idx of res.data ){
          console.log('推荐商品');
            tmpList = [];
            tmpList.img = that.rootURL+'/'+that.idx.commodity.miniPic,
            tmpList.id = that.idx.cid;
            tmpList.name = that.idx.commodity.cname;
            tmpList.price = that.idx.commodity.cprice;
            tmpList.remain = that.idx.commodity.cremain;
            tmpList.rank = that.idx.rank;
            if(that.idx.commodity.grade!=null){
            tmpList.grade = that.idx.commodity.grade.toFixed(1);
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
    },
    getRecommendBySale(){
      let that=this
      var url=that.rootURL+'/getRecommendBySale.do';
      var tmpList = {

      };
      that.SomeList = [];
      axios.get(url)
      .then(function(res){
        for( that.idx of res.data ){
          console.log('推荐商品');
            tmpList = [];
            tmpList.img = that.rootURL+'/'+that.idx.commodity.miniPic,
            tmpList.id = that.idx.commodity.cid;
            tmpList.name = that.idx.commodity.cname;
            tmpList.price = that.idx.commodity.cprice;
            tmpList.sales = that.idx.sales;
            if(that.idx.commodity.grade!=null){
              tmpList.grade = that.idx.commodity.grade.toFixed(1);
              tmpList.haveGrade=true;
            }else {
              tmpList.haveGrade=true;
              tmpList.grade ='5.0';
            }
            that.SomeList.push(tmpList);
        }
      })
      .catch(function(error){
        console.error(error)
      })
    },
    tryToSearch(){
      let that = this;
      console.log(that.myInput)
      window.localStorage.setItem('myInput',that.myInput);
      that.$router.push({path:'/byType'})
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
    }
  },
  created(){
    console.log("首页")
    this.getRecommendByUser();
    this.getRecommendBySale();
  }

}
</script>

<style lang="scss">
  .css-body {
    width:1210px;
    margin:0 auto;
    .css-body-bigPics {
      margin:0 auto;
      padding:20px;
      height: 385px;
    }
    .css-body-content {
      margin-top: 15px;

      .css-body-content-type {
        width: 600px;
        margin: 0 auto;
        margin-top: 10px;

      }
      .css-body-content-search {
        width: 400px;
      }
    }
  }

  .el-carousel__item h3 {
     color: #475669;
     font-size: 18px;
     opacity: 0.75;
     line-height: 300px;
     margin: 0;
   }

   .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
   }

   .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
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

   .el-card{

     float: left;
     margin: 5px 30px;
   }

   .image {
     width: 360px;
     height:250px;
     display: block;
   }
   .el-input__inner{
     border: 0px solid #FC7500 !important;
       border-radius: 3px !important;

   }
   .el-input-group__append{
     border-radius: 0px;
       border: 0px solid #FC7500 !important;
       padding-right: 0px !important;
   }
   .el-input__inner{
     height:34px !important;
     border-radius: 3px !important;
       border: 2px solid #FC7500 !important;
   }
   .appBTN {
     margin-left: -15px !important;
     background-color: #FC7500 !important;
       border: 0px solid #FC7500 !important;
     color:white !important;
   }
   .imgSmall {
      width: 180px;
      height:150px;
      display: block;
   }
</style>
