<template>
  <!-- 写留言 -->

  <div class='background'>


    <!-- 写留言 -->
    <div>
      <!-- <form> -->
      <div class='msgspanareaCon'>
        <textarea class='msgspanarea' :placeholder='placeholder'
                  :maxlength='maxlength' autofocus @change='bindWordLimit'
                  v-model='value'></textarea>
        <!--<el-input-->
        <!--type="textarea"-->
        <!--:rows="2"-->
        <!--placeholder="请输入内容"-->
        <!--class='msgspanarea'-->
        <!--autofocus-->
        <!--v-model="value">-->
        <!--</el-input>-->
        <span class='currentNoteLen'>{{currentNoteLen}}/{{maxlength}}个字</span>
      </div>
      <div>
        <div class='msgBtn' @click='msgSubmit'>提交</div>
      </div>
      <!-- </form> -->
    </div>


    <!-- 我的留言 -->
    <div class='myMsg'>
      <div class='myMsgTitle'>
        <span>我的留言</span>
      </div>
      <div v-for='(item,index) in guestbookinfo'>
        <div class='myMsgList'>
          <div class='magUserImg'>
            <!--<open-data type='userAvatarUrl' class='userAvatarUrl'></open-data>-->
            <img class='userAvatarUrl' :src="wxuserinfo.headimgurl" >
          </div>
          <div class='myMsgContent'>
            <!--<open-data type='userNickName' class='userNickName'></open-data>-->
            <span class="userNickName">{{wxuserinfo.nickname}}</span>
            <span class='myMsgCon'>{{item.content}}</span>
          </div>
          <div class='line'></div>
          <div class='myMsgDelBox'>
            <div class='myMsgDel' @click='myMsgDel(item.guestbook_id)' :data-index='item.index'
                 :data-guestbookid='item.guestbook_id'>
              <img src='../../static/img/search_calAllHistory.png'>
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {getMyGuestbookInfo, uploadMsg, delMyMsg} from '../api/index'
  import {mapState} from 'vuex'

  export default {
    name: "message",
    data() {
      return {
        maxlength: '2000',
        placeholder: '欢迎踊跃留言',
        value: '',
        myMsg: [],
        currentNoteLen: '0',
        guestbookinfo: []
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

    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      // '$route': 'getParams'
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
        this.article_id = routerParams;
        console.log(this.article_id);
        //获取我的留言接口
        this.getMsg();
      },
      // 字数限制
      bindWordLimit(event) {
        console.log(event);
        let value = event.target.value;
        let maxlength = this.maxlength;
        let len = parseInt(value.length);

        if (len > maxlength) {
          return;
        }

        this.currentNoteLen = len; //当前字数
        this.value = value        //文本域内容
      },
      //提交
      msgSubmit() {
        if (this.value == '') {
          this.$alert('留言不能为空', '提示', {
            confirmButtonText: '确定',
            center: true,
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              });
            }
          });
        }
        else {
          console.log(this.value);

          setTimeout(_ => {
            this.value = ''
          }, 300);

          // console.log(len);


          this.$message({
            message: '提交成功',
            type: 'success'
          });

          this.msgUpload()
          this.getMsg()
        }
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
      //上传留言接口
      msgUpload() {
        uploadMsg({
          article_id: this.article_id,
          wx_openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh', content: this.value
        })
          .then(res => {
            console.log('------------留言上传成功了------------');
          })
          .catch(res => {
            console.log('出错啦')
          })
      },
      //获取我的留言接口
      getMsg() {
        getMyGuestbookInfo({
          article_id: this.article_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('------------我的留言信息------------');
            console.log(res);
            this.guestbookinfo = res.data.guestbookinfo
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

<style>
  .el-message-box__title {
    font-size: 34px;
  }

  .el-message-box__headerbtn {
    font-size: 34px;
  }

  .el-message-box__content {
    font-size: 24px;
  }

  .el-button--mini, .el-button--small {
    font-size: 24px;
  }
</style>
<style scoped>
  /* 留言样式 */

  .background {
    padding-bottom: 450px;
    padding-top: 1px;
    background-color: #f5f5f5;
  }

  .msgspanareaCon {
    position: relative;
    width: 100%;
    /* margin-top: 30px; */
  }

  .msgspanarea {
    margin: 30px auto;
    width: 690px;
    height: 282px;
    border: none;
    background-color: #fff;
    padding: 36px 32px 50px 44px;
    box-sizing: border-box;
    border-radius: 10px;
    font-size: 24px;
    display: block;
  }

  .msgPlaceholder {
    font-size: 24px;
    color: #AFAFAF;
  }

  .currentNoteLen {
    position: absolute;
    padding-right: 32px;
    right: 32px;
    bottom: 32px;
    color: #AFAFAF;
    font-size: 20px;
  }

  .msgBtn {
    /* margin: 82px 44px 0 44px; */
    margin: 0 auto;
    background-color: #7EBBF4;
    color: #fff;
    font-size: 34px;
    width: 690px;
    height: 80px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 我的留言 */
  .myMsg {
    margin-top: 60px;
    /* padding: 0 30px; */

    /* width: 100%; */
  }

  .myMsgTitle {
    height: 88px;
    border-bottom: 1px solid #EAEAEA;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 0 30px;
  }

  .myMsgTitle span {
    font-size: 34px;
  }

  .myMsgList {
    padding: 30px 30px 0 30px;
    margin-bottom: 20px;
    background-color: #fff;

  }

  .magUserImg {
    width: 60px;
    height: 60px;
    float: left;
    padding-right: 20px;
    border-radius: 50%;
  }

  .myMsgContent {
    display: flex;
    flex-direction: column;
    font-size: 26px;
    /* border-bottom: 1px solid #EAEAEA; */
  }

  .myMsgCon {
    padding-top: 36px;
    padding-bottom: 28px;
    font-size: 22px;
    color: #666;
  }

  .userAvatarUrl {
    border-radius: 50%;
    overflow: hidden;
    display: block;
  }

  .userNickName {
    font-size: 26px;
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #EAEAEA;
  }

  .myMsgDelBox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 80px;
  }

  .myMsgDel {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 96px;
    height: 42px;
    border: 1px solid #EAE8E8;
    border-radius: 20px;
  }

  .myMsgDel span {
    font-size: 20px;
    color: #666;
    padding-left: 10px;
  }

  .myMsgDel img {
    width: 18px;
    height: 20px;
  }
</style>
