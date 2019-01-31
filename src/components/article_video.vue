<template>
  <!--pages/video/video.wxml-->


  <div class="background">


    <!-- 视频 -->
    <div v-if="isHaveVideo" class="videoBox">
      <video id="myVideo" class='video' :src="articleinfo.video_url" controls="controls"
             controlslist='nodownload'>
        <!--<cover-div v-if='!buy' class='mask' @click='jumpToBuy'>解锁当前课程</cover-div>-->
      </video>
      <div v-if='!buy' class='mask' @click='jumpToBuy'>解锁当前课程</div>

    </div>
    <div v-if="isHaveVideo" class="video_placeholder"></div>


    <!-- 文章主体 -->
    <!--<el-container>-->
    <!---->
    <!--</el-container>-->
    <!--<scroll-div scroll-y class='videoContent' style='height:680px;'>-->


    <!-- 文章标题 -->
    <div class='articleTitle'>
      <span class='article_title'>{{articleinfo.article_title}}</span>
      <div class='article_articleInfo'>
        <div class='article_authorImg'>
          <img :src='authorinfo.author_pic'/>
        </div>

        <div class='article_authorInfo'>
          <span class='article_author'>{{authorinfo.author_name}}</span>
          <span class='article_time'>{{articleinfo.publish_time}}</span>

        </div>
      </div>
    </div>


    <!-- 音频播放器 -->
    <div class='articleAudio' v-if="isHaveAudio">

      <div class='audio_mask' v-if='!buy' @click='jumpToBuy'>解锁当前课程</div>

      <audio ref="audio" :src="articleinfo.audio_url"></audio>
      <!--当前为停止状态  -->
      <div class='player' v-if="isplay==false">
        <div class='playerIcon' @click='play'>
          <img class='playStop' src='../../static/img/article_play.png'>
        </div>
        <div class='playerInfo'>
          <span class='player_article_title'>{{articleinfo.article_title}}</span>
          <div class='player_article_audioInfo'>
            <span class='player_article_declaimer'>朗读人：丁婵</span>
            <span class='player_article_time'>02'34''</span>
            <img src='../../static/img/acticle_line.png'>
            <span class='player_article_size'>1.18M</span>
          </div>
        </div>
        <!-- <div class='playerDown'>
          <img src='../../static/img/article_down.jpg'>
        </div> -->
      </div>
      <!--当前为播放状态  -->
      <div class='player' v-if="isplay==true">
        <div class='playerIcon' @click='stop'>
          <img class='playStop' src='../../static/img/article_stop.png'>
        </div>
        <div class='playerInfo'>
          <span class='player_article_title'>{{articleinfo.article_title}}</span>
          <div class='player_article_audioInfo'>
            <span class='player_article_declaimer'>朗读人：丁婵</span>
            <span class='player_article_time'>02'34''</span>
            <img src='../../static/img/acticle_line.png'>
            <span class='player_article_size'>1.18M</span>
          </div>
        </div>
        <!-- <div class='playerDown'>
          <img src='../../static/img/article_down.png'>
        </div> -->
      </div>
    </div>


    <!-- 文章主体 -->
    <div v-html="articleinfo.content" class='articleContent'></div>


    <!-- 精选留言 -->
    <div class='articleMessage'>
      <div class='msgTitle'>
        <img class='article_msg_line' src='../../static/img/article_msg_line.png'>
        <span>精选留言</span>
        <img class='article_msg_line' src='../../static/img/article_msg_line.png'>
      </div>
      <div v-for='(item,index) in guestbookinfo'>
        <div class='msgContent'>
          <div class='msgUserImg'>
            <img :src='item.headimage'>
          </div>
          <div class='msgspan'>
            <div class='msgHead'>
              <span class='msgUserName'>{{item.nickname}}</span>
              <div class='msgLikeGroup' @click='msglike($event)' :data-index="index"
                   :data-guestbook_id='item.guestbook_id'>
                <!-- <img class='msgLike' src='../../static/img/article_transmit.png'> -->
                <img v-if="item.is_valid=='0'" class='msgLike' src='../../static/img/article_msg_like_hover.png'
                     :data-index="index" :data-guestbook_id='item.guestbook_id'>
                <img v-else class='msgLike' src='../../static/img/article_msg_like.png' :data-index="index"
                     :data-guestbook_id='item.guestbook_id'>
                <span class='likeNum'>{{item.countpraise}}</span>
              </div>
            </div>
            <span class='msg'>{{item.content}}</span>
            <span class='msgTime'>{{item.guestbook_time}}</span>
          </div>
        </div>
      </div>
    </div>


    <!--</scroll-div>-->


    <!-- 点赞、转发及写留言 -->
    <div class='articleTabbar'>
      <div class='tabbarList' @click='articleLike'>
        <img v-if="articleinfo.is_valid=='0'" src='../../static/img/article_like_hover.png'>
        <img v-else src='../../static/img/article_like.png'>
        <span class='tabbarspan'>{{articleinfo.countcollect}}</span>
      </div>
      <div class='tabbarList' @click='jumpToMsg' :data-articleid='articleinfo.article_id'>
        <img src='../../static/img/article_msg.png'>
        <span class='tabbarspan'>写留言</span>
      </div>
      <!--<button class='tabbarList acticleShare' open-type='share'>-->
      <!--<img src='../../static/img/acticle_share.png'>-->
      <!--<span class='tabbarspan'>分享给朋友</span>-->
      <!--</button>-->
    </div>


  </div>
</template>

<script>
  import {getArticleInfo, getArticleGuestbookInfo, uploadArticleLikeInfo, uploadMsgLikeInfo,uploadTrace} from '../api/index'
  import {mapState} from 'vuex'

  export default {
    name: "article_video",
    data() {
      return {
        buy: false,//是否购买了当前文章
        isActicle: false,//是否是音频文章
        articleinfo: {},//文章信息
        authorinfo: {},//作者信息
        guestbookinfo: [],//留言信息
        isplay: false, //是否播放
        isHaveAudio: false, //是否含有音频
        isHaveVideo: false, //是否含有视频
        a: '',
        b: ''
      }
    },
    computed: {
      ...mapState({
        wxuserinfo: 'wxuserinfo',
      })
    },
    created() {
      //获取路由带来得参数
      this.getParams();
      // //获取文章信息
      // this.getArticleInfoRequest();
      // //获取留言数据
      // this.getArticleGuestbookInfoRequest();
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      //'$route': 'getParams'
      '$route'() {
        this.getParams()
      }
    },
    methods: {
      //获取路由带来得参数
      getParams() {
        // 取到路由带过来的参数
        console.log(this.$route.params);
        let routerParams = this.$route.params.dataobj;
        // 将数据放在当前组件的数据内
        this.article_id = routerParams;
        this.course_id = this.$route.params.course_id;
        console.log(this.article_id);
        console.log(this.course_id);

        //获取文章信息
        this.getArticleInfoRequest();
        //获取留言数据
        this.getArticleGuestbookInfoRequest();
        // 上传用户浏览信息
        this.uploadTraceRequest();
      },
      // 音频播放器
      //播放
      play() {
        let myaudio = this.$refs.audio;
        myaudio.play();
        console.log(myaudio.duration);
        this.isplay = true
      },
      // 停止
      stop() {
        let myaudio = this.$refs.audio;
        myaudio.pause();
        this.isplay = false
      },
      //用户浏览记录上传
      uploadTraceRequest(){

        uploadTrace({
          openid: this.$store.state.wxuserinfo.openid,
          source: 'fwh',
          unionid: this.$store.state.wxuserinfo.unionid,
          article_id: this.article_id,
          course_id: this.course_id
        })
          .then(res =>{
            console.log(res);
            if(res.data.msg == '1'){
              console.log('---------用户浏览记录上传成功-----------')
            }else if(res.data.msg == '2'){
              console.log("-------------浏览记录保存失败---------------")
            }else if(res.data.msg == '3'){
              console.log("-------------浏览记录更新成功---------------")
            } else if (res.data.msg == '4'){
              console.log('---------浏览记录更新失败----------')
            }else{
              console.log('---------------浏览记录接口失败-------------------')
            }
          })
          .catch(res =>{
            console.log('---------用户浏览记录上传失败-----------')
          })
      },
      //留言点赞
      msglike($event) {
        console.log($event);
        let key = $event.target.dataset.index;
        let guestbook_id = $event.target.dataset.guestbook_id;

        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');
          if (this.guestbookinfo[key].is_valid == '0') {
            this.guestbookinfo[key].is_valid = '1';
            this.guestbookinfo[key].countpraise = Number(this.guestbookinfo[key].countpraise) - 1;
            this.guestbookinfo[key].num = '-1';
            console.log(this.guestbookinfo[key].num);
            this.a = this.guestbookinfo[key].num;
            this.b = guestbook_id;
            console.log(this.b);
            this.msgLikeUpload()
            //console.log(a)
          } else {
            this.guestbookinfo[key].is_valid = '0';
            this.guestbookinfo[key].countpraise = Number(this.guestbookinfo[key].countpraise) + 1;
            this.guestbookinfo[key].num = '1';
            console.log(this.guestbookinfo[key].num);
            this.a = this.guestbookinfo[key].num;
            this.b = guestbook_id;
            console.log(this.b);
            this.msgLikeUpload()
            //console.log(a)
          }
        }else {
          console.log('-------未绑定手机号---------');
          this.$router.push(
            {
              path:'/phone',
              name:'phone',
            }
          )
        }


      },
      //留言点赞接口
      msgLikeUpload() {
        uploadMsgLikeInfo({
          num: this.a,
          guestbook_id: this.b,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('-----------留言点赞信息上传成功啦------------')
          })
          .catch(res => {
            console.log('-----------失败啦------------')
          })
      },
      //文章点赞
      articleLike() {
        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');
          if (this.articleinfo.is_valid == '0') {
            this.articleinfo.is_valid = '1';
            this.articleinfo.countcollect = Number(this.articleinfo.countcollect) - 1;
            this.artLikeUpload()
          } else {
            this.articleinfo.is_valid = '0';
            this.articleinfo.countcollect = Number(this.articleinfo.countcollect) + 1;
            this.artLikeUpload()
          }
        }else {
          console.log('-------未绑定手机号---------');
          this.$router.push(
            {
              path:'/phone',
              name:'phone',
            }
          )
        }

      },
      //文章点赞上传接口
      artLikeUpload() {
        uploadArticleLikeInfo({
          article_id: this.articleinfo.article_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('-----------文章收藏信息上传成功啦------------')
          })
          .catch(res => {
            console.log('-----------失败啦------------')
          })
      },
      //跳转到留言页面
      jumpToMsg() {

        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');
          this.$router.push(
            {
              path: '/message',
              name: 'message',
              params: {
                name: 'article_id',
                dataobj: this.articleinfo.article_id
              }
            }
          )
        }else {
          console.log('-------未绑定手机号---------');
          this.$router.push(
            {
              path:'/phone',
              name:'phone',
            }
          )
        }

      },
      //跳转到购买页面
      jumpToBuy() {

        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');
          // 判断是单文还是课程中的文章
          // course_id = 0为单文
          if (this.articleinfo.course_id == "0") {
            this.$router.push(
              {
                path: '/buy',
                name: 'buy',
                params: {
                  name: 'article_id',
                  dataobj: this.articleinfo.article_id
                }
              }
            )
          } else {
            this.$router.push(
              {
                path: '/buy',
                name: 'buy',
                params: {
                  name: 'course_id',
                  dataobj: this.articleinfo.course_id
                }
              }
            )
          }

        }else {
          console.log('-------未绑定手机号---------');
          this.$router.push(
            {
              path:'/phone',
              name:'phone',
            }
          )
        }

      },
      //获取文章信息
      getArticleInfoRequest() {
        getArticleInfo({
          article_id: this.article_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('------------文章信息------------');
            console.log(res);
            //判断是否含有音频和视频
            //根据是否有audio_id来判断是否含有音频，如果有audio_id则含有音频，isHaveAudio为true,如果没有则不含有音频，isHaveAudio为false,
            //根据是否有video_id来判断是否含有视频，如果有video_id则含有视频，isHaveVideo为true,如果没有则不含有视频，isHaveVideo为false,
            if (res.data.articleinfo.audio_id) {
              console.log('------含有音频---------');
              this.isHaveAudio = true
            }
            if (res.data.articleinfo.video_id) {
              console.log('------含有视频---------');
              this.isHaveVideo = true
            }
            // 判断该文章是否为试读课程
            //is_audition为1则为试读课程，课程可读，进行赋值操作
            //is_audition为1则为非试读课程，进行下一步判断
            if (res.data.articleinfo.is_audition == '1') {
              this.buy = true;
              this.articleinfo = res.data.articleinfo;
              this.authorinfo = res.data.authorinfo;
            } else {
              this.articleinfo = res.data.articleinfo;
              this.authorinfo = res.data.authorinfo;
              //判断用户是否购买
              //msg=1 代表已购买
              //msg=0 代表未购买
              if (res.data.msg == "1") {
                this.buy = true;
              }else {
                this.buy = false;
              }
            }
          })
          .catch(res => {
            console.log('出错啦')
          })
      },
      //获取留言数据
      getArticleGuestbookInfoRequest() {
        getArticleGuestbookInfo({
          article_id: this.article_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('------------留言信息------------');
            console.log(res);
            this.guestbookinfo = res.data.guestbookinfo
          })
          .catch(res => {
            console.log('出错啦')
          })
      }
    },

  }
</script>

<style scoped>
  /* pages/video/video.wxss */

  /* video */
  .background {
    background-color: #fff;
  }

  .videoBox {
    position: fixed;
    width: 100%;
    height: 420px;
    z-index: 1;
  }

  .video {
    max-width: 750px;
    width: 100%;
    height: 420px;
    /*position: absolute;*/
  }

  .mask {
    max-width: 750px;
    width: 100%;
    height: 420px;
    background-color: #00000099;
    color: #fff;
    /* display: flex;
    align-items: center;
    justify-content: center; */
    line-height: 560px;
    text-align: center;
    font-size: 28px;
    position: absolute;
    top: 0;
  }

  .video_placeholder {
    width: 100%;
    height: 420px;
  }

  .videoContent {
    /* padding: 0 30px 0 30px; */
    width: 100%;
  }

  /* 文章标题 */

  .articleTitle {
    padding: 0 30px 0 30px;
  }

  .article_title {
    font-size: 44px;
    display: block;
    padding: 38px 0 68px 0;
  }

  .article_articleInfo {
    display: flex;
    flex-direction: row;
  }

  .article_authorInfo {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  .article_time {
    display: inline-block;
    font-size: 20px;
    color: #999;
    padding-top: 12px;
  }

  .article_author {
    font-size: 26px;
  }

  .article_authorImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
  }

  .article_authorImg img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  /* 播放器样式 */

  .articleAudio {
    padding: 30px 30px 10px 30px;
    /* padding-bottom: 50px; */
  }

  .audio_mask {
    width: 694px;
    height: 158px;
    position: absolute;
    background-color: #00000099;
    color: #fff;
    line-height: 158px;
    text-align: center;
    font-size: 28px;
  }

  .player {
    width: 100%;
    height: 158px;
    border: 1px solid #EAEAEA;
    /* padding: 38px 20px 40px 32px; */
    /* box-sizing: border-box; */
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
  }

  .playerIcon {
    width: 130px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playerIcon img {
    width: 58px;
    height: 58px;
  }

  .playStop {
    width: 30px;
    height: 30px;
  }

  .playerInfo {
    width: 480px;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    align-content: center; */
  }

  .player_article_title {
    font-size: 30px;
    color: #353535;
    width: 100%;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-top: 38px;
  }

  .player_article_audioInfo {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    padding-top: 18px;
  }

  .player_article_audioInfo img {
    height: 14px;
    width: 1px;
    padding-left: 10px;
  }

  .player_article_declaimer {
    color: #666666;
    font-size: 20px;
  }

  .player_article_time {
    color: #999999;
    font-size: 20px;
    padding-left: 60px;
  }

  .player_article_size {
    color: #7EBBF4;
    font-size: 20px;
    padding-left: 10px;
  }

  .playerDown {
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .playerDown img {
    width: 84px;
    height: 84px;
  }

  /* 文章主体 */

  .articleContent {
    padding: 40px 30px;
    font-size: 32px;
    color: #353535;
  }

  .articleContent span {
    font-size: 32px;
    color: #353535;
  }

  /* 精选留言 */

  .articleMessage {
    margin-top: 70px;
    padding-bottom: 98px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  .msgTitle {
    height: 110px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .msgTitle span {
    text-align: center;
    font-size: 34px;
  }

  .article_msg_line {
    width: 280px;
    height: 1px;
  }

  .msgContent {
    padding: 20px 30px 40px 30px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #eaeaea;
  }

  .msgUserImg {
    width: 60px;
    height: 60px;
    /* float: left; */
  }

  .msgUserImg img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .msgspan {
    /* float: left; */
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .msgHead {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .msgUserName {
    font-size: 26px;
    padding-top: 10px;
  }

  .msg {
    color: #666;
    font-size: 22px;
    /* padding-top: 34px; */
  }

  .msgTime {
    color: #afafaf;
    font-size: 20px;
    padding-top: 18px;
  }

  .msgLikeGroup {
    /* float: right; */
    width: 100px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 34px;
  }

  .msgLike {
    /* padding-top: 10px; *//* padding-right: 30px; */
    padding-right: 20px;
    width: 22px;
    height: 22px;
  }

  .likeNum {
    color: #666;
    /* font-size: 30px; */
    font-size: 22px;
  }

  /* tabbar */

  .articleTabbar {
    position: fixed;
    /*left: 0;*/
    bottom: 0;
    max-width: 750px;
    width: 100%;
    background-color: #fff;
  }

  .tabbarList {
    width: 49%;
    display: inline-block;
    text-align: center;
  }

  .tabbarList img {
    width: 40px;
    height: 40px;
    padding-top: 12px;
  }

  .tabbarspan {
    display: block;
    color: #888;
    font-size: 22px;
  }

  /* .acticleShare{
    border: none;
  } */

  button::after {
    border: none;
  }

  button {
    background-color: #fff;
    height: 86px;
    border-radius: none;
    line-height: 37px;
    position: none;
  }

  .button-hover {
    color: rgb(0, 0, 0);
    background-color: #fff;
  }

</style>
