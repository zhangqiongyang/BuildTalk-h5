<template>
  <div class='background'>


    <!-- 列表首图 -->
    <div class='listHeadImg'>
      <img :src='courseinfo.coursepic_url'>
    </div>


    <!-- 列表导航 -->
    <div class='listNav'>
      <div class='navContent'>
        <!-- <div class='navListOrder' @click='changeOrder'>
          <div class='navListOrderImgBox'> -->
        <!-- <div class='navListOrderImg'> -->
        <!-- <img class='navListOrderImg' src='../../static/img/list_order.png'> -->
        <!-- </div> -->
        <!-- </div>
          <span class='navListOrderspan' v-if='{{order==true}}'>倒序</span>
          <span class='navListOrderspan' v-if='{{order==false}}'>正序</span>
        </div> -->
        <!-- <span style='padding-top: 20px;padding-bottom: 20px;'>|</span> -->
        <span class='navContentspan'>已更新{{articleLen}}讲课程</span>
      </div>
      <div v-if='mode==true' class='navPattern' @click='changMode' data-mode='list'>
        <img v-if='mode==true' class='navPatternImg' src='../../static/img/list_list.png'>
        <span v-if='mode==true' class='navPatternspan' data-mode='list'>列表模式</span>
      </div>
      <div v-if='mode==false' class='navPattern' @click='changMode' data-mode='img'>
        <img v-if='mode==false' class='navPatternImg' src='../../static/img/list_image.png'>
        <span v-if='mode==false' class='navPatternspan' data-mode='img'>图文模式</span>
      </div>
    </div>


    <!-- 列表模式内容 -->
    <!-- <scroll-div scroll-y scroll-into-div='{{todiv}}' scroll-with-animation style='height:1000px;' v-if='{{mode==true}}' class='listMode'> -->
    <div v-if='mode==true' class='listMode'>
      <div v-for='item in articlelist'>
        <div class='listModeList' id='"inTodiv"+item.article_id' @click='jumpToArticle(item.article_id)'
             :data-articleid='item.article_id' :data-audioid='item.audio_id' :data-is_audition='item.is_audition'>
          <div>
            <div class='listModeContent'>
              <span class='listModeOrder'>第{{item.article_number}}讲</span>
              <!-- <span>|</span> -->
              <span class='listModeTitle'>{{item.article_title}}</span>
            </div>
            <div class='listModeTime'>
              <img src='../../static/img/list_time.png'>
              <span class='listModeTimespan'>{{item.publish_time}}</span>
            </div>
          </div>
          <div v-if="item.is_audition == '1'" class='listModeAudition'>试听</div>
        </div>
      </div>
    </div>
    <!-- </scroll-div> -->


    <!-- 图文模式内容 -->
    <!-- <scroll-div scroll-y scroll-into-div='{{todiv}}' scroll-with-animation style='height:1000px;' v-if='{{mode==false}}' class='imgspanMode'> -->
    <div v-if='mode==false' class='imgspanMode'>
      <div v-for='item in articlelist'>
        <div class='imgspanModeList' id='" inTodiv "+item.article_id' @click='jumpToArticle(item.article_id)'
             :data-articleid='item.article_id' :data-audioid='item.audio_id' :data-is_audition='item.is_auditio'>
          <div class='listModeContent'>
            <span class='listModeOrder'>第{{item.article_number}}讲</span>
            <!-- <span>|</span> -->
            <span class='listModeTitle'>{{item.article_title}}</span>
            <div v-if="item.is_audition == '1'" class='listModeAudition'>试听</div>
          </div>
          <div class='listModeTime'>
            <img src='../../static/img/list_time.png'>
            <span class='listModeTimespan'>{{item.publish_time}}</span>
          </div>
          <div class='imgspanImg'>
            <img :src='item.pic_url'>
          </div>
          <div class='imgspanspan'>
            <span>{{item.article_desc}}</span>
          </div>
          <div class='imgspanToFull'>
            <span>查看</span>
            <img src='../../static/img/list_more.png'>
          </div>

        </div>
      </div>
    </div>
    <!-- </scroll-div> -->


    <div>
      <div v-if="!isBuy" class='buy' @click='jumpToBuy'>
        <span>限时 ￥{{courseinfo.course_money}}</span>
        <span class='originalPrice'> ￥{{courseinfo.original_price}}</span>
      </div>

    </div>
    <div v-if="!isBuy" class='buyPlaceholder'></div>
    <!--<div v-else>-->
    <!--<div v-if="!isBuy" class='buy'>由于相关规范，iOS用户暂不可在小程序内订阅</div>-->
    <!--</div>-->

  </div>
</template>

<script>
  import {getCourseInfo} from '../api/index'

  export default {
    name: "list",
    data() {
      return {
        mode: true,//图文模式与列表模式
        order: true,//正序与倒序
        isBuy: null,//是否购买
        articleLen: null,//文章数量
        courseinfo: {},//课程信息
        articlelist: [],//文章信息
      }
    },
    created() {
      //获取路由带来得参数
      this.getParams();

    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      // '$route': 'getParams'
      '$route'() {
        this.getParams()
      }
    },
    methods: {
      //获取路由带来得参数
      getParams() {
        // 取到路由带过来的参数
        let routerParams = this.$route.params.dataobj;
        console.log('routerParams****', routerParams)
        // 将数据放在当前组件的数据内
        this.course_id = routerParams;
        console.log(this.course_id);
        //根据课程id获取课程信息
        this.getCourseInfoRequest();
      },
      //切换图文模式与列表模式
      changMode() {
        this.mode = !this.mode
      },
      //跳转到相应的文章页面
      jumpToArticle(id) {
        console.log(id);
        this.$router.push(
          {
            path: '/article_video',
            name: 'article_video',
            params: {
              name: 'article_id',
              dataobj: id,
              course_id:this.course_id
            }
          }
        )
      },
      //跳转到购买页面
      jumpToBuy() {
        this.$router.push(
          {
            path: '/buy',
            name: 'buy',
            params: {
              name: 'course_id',
              dataobj: this.course_id
            }
          }
        )
      },
      //根据课程id获取课程信息
      getCourseInfoRequest() {
        getCourseInfo({
          course_id: this.course_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('--------------课程列表信息----------------');
            console.log(res);
            //判断是否购买
            //msg=1代表已购买，msg=0代表未购买
            //已购买正常添加课程列表数据
            //未购买，将课程前五节isAudition设为true，反之false
            this.articleLen = res.data.articlelist.length;
            this.articlelist = res.data.articlelist;
            this.courseinfo = res.data.courseinfo;
            this.course_id = res.data.courseinfo.course_id;
            if (res.data.msg == '1') {
              this.isBuy = true;
              if (res.data.articlelist.length >= 5) {
                for (var i = 0; i < 5; i++) {
                  this.articlelist[i].is_audition = 0
                }
              } else {
                this.articlelist[0].is_audition = 0
              }
            } else {
              this.isBuy = false;
            }
          })
          .catch(res => {
            console.log('出错了')
          })
      }
    },

  }
</script>

<style scoped>
  /* 列表样式 */

  .background {
    background-color: #f5f5f5;
  }

  /* 列表首图 */
  .listHeadImg {
    width: 100%;
    height: 440px;
  }

  .listHeadImg img {
    width: 100%;
    height: 100%;
  }

  /* 列表导航 */
  .listNav {
    /* padding: 20px 34px 20px 22px; */
    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
    align-items: center;
    /* overflow: hidden; */
    line-height: 26px;
    height: 80px;
    background-color: #fff;
  }

  .listNav span {
    font-size: 24px;
  }

  .navContent {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
  }

  .navListOrder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* position: relative; */
    width: 144px;
    height: 100%;
    align-items: center;
  }

  .navListOrderImgBox {
    height: 100%;
    /* padding-right: 12px; */
    display: flex;
    align-items: center;
  }

  .navListOrderImg {
    width: 23px;
    height: 23px;

  }

  .navListOrderImg img {
    width: 23px;
    height: 23px;
  }

  .navContentspan {
    color: #999;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 12px;
  }

  .navPattern {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 200px;
    justify-content: flex-end;
    align-items: center;
    padding-right: 30px;
  }

  .navPatternImg {
    width: 23px;
    height: 18px;
    margin-right: 20px;
  }

  .navPatternImg img {
    width: 23px;
    height: 18px;
  }

  /* 列表模式内容 */

  .listMode {
    background-color: #fff;
    margin-top: 20px;
  }

  .listModeList {
    padding: 40px 30px 30px 30px;
    border-bottom: 1px solid #EAEAEA;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .listModeOrder {
    padding-right: 12px;
    font-size: 34px;
  }

  .listModeTitle {
    /* padding-left: 12px; */
    font-size: 34px;
    line-height: 34px;
  }

  .listModeTime {
    padding-top: 26px;
    line-height: 20px;
  }

  .listModeTime img {
    width: 21px;
    height: 21px;
  }

  .listModeTimespan {
    font-size: 20px;
    color: #999999;
    padding-left: 16px;
  }

  .listModeAudition {
    background-color: red;
    color: #fff;
    width: 100px;
    height: 44px;
    font-size: 28px;
    float: right;
    border-bottom-left-radius: 14px;
    text-align: center;
  }

  /* 图文模式内容 */
  .imgspanMode {
    margin-top: 20px;
    max-height: 9999px;
  }

  .imgspanModeList {
    background-color: #fff;
    padding: 40px 30px 0 30px;
    margin-bottom: 20px;
  }

  .imgspanImg {
    width: 100%;
    height: 328px;
    padding-top: 20px;
  }

  .imgspanImg img {
    width: 100%;
    height: 100%;
  }

  .imgspanspan {
    padding: 30px 0;
    border-bottom: 1px solid #EAEAEA;
  }

  .imgspanspan span {
    color: #666;
    font-size: 28px;
  }

  .imgspanToFull {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .imgspanToFull span {
    color: #999;
    font-size: 24px;
  }

  .imgspanToFull img {
    width: 15px;
    height: 28px;
  }

  .buy {
    width: 100%;
    height: 88px;
    position: fixed;
    bottom: 0;
    background: #7EBBF4;
    font-size: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }

  .buy span {
    color: #fff;
  }

  .originalPrice {
    font-size: 20px;
    text-decoration: line-through;
    padding-left: 10px;
    padding-top: 5px;
  }

  .buyPlaceholder{
    height: 88px;
    width: 100%;
  }
</style>
