<template>
  <!--pages/myMsg/myMsg.wxml-->
  <div class='back'>

    <div v-if='!isHaveMsg' class='none'>暂无留言，快去留言吧</div>


    <div v-else>
      <div v-for='item in guestbookinfo'>
        <div class='msgItem'>
          <div class='myMsg'>
            <div class='myMessage'>
              <span class='myMsgInfo'>留言·{{item.guestbook_time}} 赞{{item.countpraise}}</span>
              <div class='myMessageimg' @click='myMsgDel' :data-guestbook_id='item.guestbook_id'>
                <img src='../../static/img/myMsg_delete.png'>
              </div>
              <!-- <button open-type='share'>
                <img src='../../static/img/myMsg_share.png'>
              </button> -->
            </div>
            <div class='myMsgspanBox' @click='jumpToDetails(item.guestbook_id)' :data-guestbook_id='item.guestbook_id'>
              <span class='myMsgspan'>{{item.content}}</span>
            </div>
          </div>


          <div class='authorMsg'>
            <div class='article' @click='jumpToArticle(item.article_id,item.course_id)' :data-article_id='item.article_id'
                 :data-audio_id='item.audio_id'>
              <img src='../../static/img/myMsg_book.png'>
              <!-- <span>第{{item.article_number}}讲</span>
              <span>|</span> -->
              <span>{{item.article_title}}</span>
              <span class='right'>></span>
            </div>
            <!-- <div class='authorMessage' @click='jumpToDetails' data-guestbook_id='{{item.guestbook_id}}'>
              <div class='authorReply'>
                <div class='line'></div>
                <span class='myMsgInfo'>作者回复</span>
              </div>
              <span class='authorMsgspan'>{{item.author_reply}}</span>
              <span class='authorMsgTime'>{{item.repaly_time}}</span>
            </div> -->
          </div>

        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import {getMyMsg, delMyMsg} from '../api/index'

  export default {
    name: "myMsg",
    data() {
      return {
        isHaveMsg: false,//是否有留言
        guestbookinfo: null//留言信息
      }
    },
    created() {
      //获取我的留言信息
      this.getMsg();
    },
    methods: {
      //跳转到留言详情
      jumpToDetails(id) {
        console.log(id);
        this.$router.push(
          {
            path: '/myMsgDetails',
            name: 'myMsgDetails',
            params: {
              name: 'guestbook_id',
              dataobj: id
            }
          }
        )
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
          this.getMsg();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
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
              course_id: course_id
            }
          }
        )
      },
      //获取我的留言信息接口
      getMsg() {
        getMyMsg({
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('------------我的留言信息------------');
            console.log(res);
            if (res.data.guestbookinfo.length == '0') {
              this.isHaveMsg = false
            } else {
              this.guestbookinfo = res.data.guestbookinfo;
              this.isHaveMsg = true
            }
          })
          .catch(res => {
            console.log('出错啦')
          })
      },
      //删除留言接口
      delMsg() {
        delMyMsg({
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh', guestbook_id: this.guestbook_id
        })
          .then(res => {
            console.log('------------我的留言删除成功------------');
          })
          .catch(res => {
            console.log('出错啦')
          })
      }
    },

  }
</script>

<style scoped>
  /* pages/myMsg/myMsg.wxss */

  .none {
    font-size: 28px;
    color: #888;
    width: 100%;
    text-align: center;
    height: 600px;
    line-height: 600px;
  }

  .msgItem {
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-height: 40px;
  }

  .authorMsg {
    display: flex;
    flex-direction: column;
    margin-left: 34px;
    margin-right: 34px;
    margin-bottom: 40px;
    border-radius: 10px;
    box-shadow: 0 0 50px 10px #f4f5f7;
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
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    padding-top: 14px;
    margin-bottom: 22px;
    line-height: 40px;
  }

  .authorMsgTime {
    font-size: 20px;
    color: #888;
  }

</style>
