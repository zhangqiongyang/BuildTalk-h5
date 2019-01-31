<template>
  <!--pages/myMsgDetails/myMsgDetails.wxml-->

  <div class='back'>

    <div class='msgItem'>
      <div class='myMsg'>
        <div class='myMessage'>
          <span class='myMsgInfo'>留言·{{guestbookinfo.guestbook_time}}</span>
          <div class='myMessageimg' @click='myMsgDel(guestbookinfo.guestbook_id)'
               :data-guestbook_id='guestbookinfo.guestbook_id'>
            <img src='../../static/img/myMsg_delete.png'>
          </div>
          <!-- <button open-type='share'>
            <img src='../../static/img/myMsg_share.png'>
          </button> -->
        </div>
        <div class='myMsgspanBox'>
          <span class='myMsgspan'>{{guestbookinfo.content}}</span>
        </div>
      </div>


      <div class='authorMsg'>
        <div class='article' @click='jumpToArticle(guestbookinfo.article_id,guestbookinfo.course_id)'
             :data-article_id='guestbookinfo.article_id'
             :data-audio_id='guestbookinfo.audio_id'>
          <img src='../../static/img/myMsg_book.png'>
          <!-- <span>第{{guestbookinfo.article_number}}讲</span>
          <span>|</span> -->
          <span>{{guestbookinfo.article_title}}</span>
          <span class='right'>></span>
        </div>
        <!-- <div class='authorMessage'>
          <div class='authorReply'>
            <div class='line'></div>
            <span class='myMsgInfo'>作者回复</span>
          </div>
          <span class='authorMsgspan'>{{guestbookinfo.author_reply}}</span>
          <span class='authorMsgTime'>回复于·{{guestbookinfo.reply_time}}</span>
        </div> -->
      </div>

    </div>


  </div>
</template>

<script>
  import {getMyMsgDetail, delMyMsg} from '../api/index'

  export default {
    name: "myMsgDetails",
    data() {
      return {
        guestbookinfo: null//留言信息
      }
    },
    created() {
      //获取路由带来得参数
      this.getParams();

    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route'(){
        this.getParams()
      }
    },
    methods: {
      //获取路由带来得参数
      getParams() {
        // 取到路由带过来的参数
        let routerParams = this.$route.params.dataobj;
        // 将数据放在当前组件的数据内
        this.guestbook_id = routerParams;
        console.log(this.guestbook_id);
        //查询当前留言信息
        this.getMyMsgDetailRequest()
      },
      //删除留言
      myMsgDel(id) {
        console.log(id);
        this.guestbook_id = id;


        this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.delMsg();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.$router.history.go(-1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //跳转到相应文章页面
      jumpToArticle(article_id,course_id) {
        console.log(article_id + course_id);
        this.$router.push(
          {
            path: '/article_video',
            name: 'article_video',
            params: {
              name: 'article_id',
              dataobj: article_id,
              course_id:course_id
            }
          }
        )
      },
      //删除留言接口
      delMsg() {
        delMyMsg({
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
          guestbook_id: this.guestbook_id
        })
          .then(res => {
            console.log('------------我的留言删除成功------------');
          })
          .catch(res => {
            console.log('出错啦')
          })
      },

      //查询当前留言信息接口
      getMyMsgDetailRequest(){
        getMyMsgDetail({guestbook_id: this.guestbook_id})
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
  /* pages/myMsgDetails/myMsgDetails.wxss */
  .back {
    border-bottom: 1px solid #eff0f0;
  }

  .myMsg {
    padding: 30px 36px 0 36px;
  }

  .myMessage {
    display: flex;
    justify-content: space-between;
  }

  .myMsgInfo {
    font-size: 24px;
    color: #888;
    width: 500px;
  }

  .myMessageimg {
    width: 100px;
    text-align: center;
  }

  .myMsg img {
    /* flex: 1; */
    width: 35px;
    height: 35px;
    /* float: right; */
  }

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

  .myMsgspanBox {
    /* padding-top: 44px; */
    padding-bottom: 42px;
  }

  .myMsgspan {
    /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; */
    line-height: 56px;
  }

  .authorMsg {
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    margin-left: 34px;
    margin-right: 34px;
    margin-bottom: 40px;
    border-radius: 10px;
    /* box-shadow: 0 0 50px 10px #f4f5f7; */
  }

  .article {
    height: 78px;
    line-height: 78px;
  }

  .article span {
    font-size: 24px;
    color: #888;
    padding-left: 10px;
  }

  .authorMsg img {
    width: 31px;
    height: 27px;
    padding-left: 24px;
  }

  .authorMessage {
    display: flex;
    flex-direction: column;
    padding: 24px 30px 26px 24px;
  }

  .right {
    float: right;
    padding-right: 30px;
  }

  .authorReply {
    display: flex;
    flex-direction: row;
  }

  .line {
    width: 4px;
    height: 26px;
    background-color: #ff5a05;
    margin-right: 10px;
  }

  .authorMsgspan {
    /* overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; */
    padding-top: 14px;
    margin-bottom: 22px;
    color: #888;
    line-height: 56px;
  }

  .authorMsgTime {
    font-size: 20px;
    color: #888;
  }
</style>
