<template>
  <div class='background' :style="{height: windowHeight + 'px'}" >


    <!-- 登录及个人信息 -->
    <div class='personalInformation'>
      <!--<button style='margin:100px;' v-if="!hasUserInfo && canIUse"  bindgetuserinfo="getUserInfo"> 微信登录 </button>-->
      <!--<button style='margin:100px;' v-if="!hasUserInfo && canIUse" @click="getUserInfo"> 微信登录</button>-->
      <div >
        <img class='userBg' src='../../static/img/mine_background.png'>
        <div class='userContent'>
          <div class='headPortrait'>
            <img :src="wxuserinfo.headimgurl">
          </div>
          <div class='userInformation'>
            <span class="userinfo_nickname">{{wxuserinfo.nickname}}</span>
            <span class='userinfo_phone'>{{phoneNumber}}</span>
          </div>
        </div>
      </div>
    </div>


    <!-- 账户 -->

    <!-- <div class='accountItem account'>
      <div class='accountContent'>
        <div class='accountImg'>
          <img src='../../static/img/mine_account.png'>
        </div>
        <span class='accountName'>谈资</span>
      </div>
      <div class='accountInfo'>
        <span class='accountNumber accountNumberColor'>0.00</span>
        <img src='../../static/img/more.png'>
      </div>
    </div> -->


    <div class='mineAccount'>


      <!--<router-link to="/myAddress" class='accountItem'>-->
        <!--<div class='accountContent'>-->
          <!--<div class='accountImg'>-->
            <!--<img src='../../static/img/mine_adress.png'>-->
          <!--</div>-->
          <!--<span class='accountName'>收货地址</span>-->
        <!--</div>-->
        <!--<div class='accountInfo'>-->
          <!--<span class='accountNumber accountNumberColor'></span>-->
          <!--<img src='../../static/img/more.png'>-->
        <!--</div>-->
      <!--</router-link>-->


      <div @click="jumpToAlreadyBought" class='accountItem'>
        <div class='accountContent'>
          <div class='accountImg'>
            <img src='../../static/img/mine_bought.png'>
          </div>
          <span class='accountName'>已购</span>
        </div>
        <div class='accountInfo'>
          <span class='accountNumber accountNumberColor'></span>
          <img src='../../static/img/more.png'>
        </div>
      </div>


      <!-- <div class='accountItem' @click='jumpTogiftCertificate'>
        <div class='accountContent'>
          <div class='accountImg'>
            <img src='../../static/img/mine_giftCertificate.png'>
          </div>
          <span class='accountName'>礼券</span>
        </div>
        <div class='accountInfo'>
          <span class='accountNumber accountNumberColor'>1</span>
          <img src='../../static/img/more.png'>
        </div>
      </div> -->


      <!-- <div class='accountItem'>
        <div class='accountContent'>
          <div class='accountImg'>
            <img src='../../static/img/mine_redPacket.png'>
          </div>
          <span class='accountName'>分享有赏</span>
        </div>
        <div class='accountInfo'>
          <span class='accountNumber accountNumberColor'></span>
          <img src='../../static/img/more.png'>
        </div>
      </div> -->


      <!--
      <div class='accountItem' @click='jumpToInviteFriends'>
        <div class='accountContent'>
          <div class='accountImg'>
            <img src='../../static/img/mine_friend.png'>
          </div>
          <span class='accountName'>邀请好友</span>
        </div>
        <div class='accountInfo'>
          <span class='accountNumber'>各得</span>
          <span class='accountNumber accountNumberColor'>30</span>
          <span class='accountNumber'>元</span>
          <img src='../../static/img/more.png'>
        </div>
      </div> -->


    </div>


    <!-- 我的 -->
    <div class='mineAccount'>
      <div v-for='(item,index) in mineList' :key='index'>
        <div @click="jumpToMyMsg" class='accountItem'>
          <div class='accountContent'>
            <div class='accountImg'>
              <img :src='item.mineImg'>
            </div>
            <span class='accountName'>{{item.mineName}}</span>
          </div>
          <div class='accountInfo'>
            <img src='../../static/img/more.png'>
          </div>
        </div>
      </div>
      <!-- <div class='accountItem'> -->


      <!--<div class='accountItem' @click='jumpToFeedback'>-->

        <!--<div class='accountContent'>-->
          <!--<div class='accountImg'>-->
            <!--<img src='../../static/img/mine_note.png'>-->
          <!--</div>-->
          <!--<span class='accountName'>用户反馈</span>-->
        <!--</div>-->
        <!--<div class='accountInfo'>-->
          <!--<img src='../../static/img/more.png'>-->
        <!--</div>-->



        <!-- <button open-type='contact' class='index_service_button accountItem'></button> -->
      <!--</div>-->
    </div>


    <!-- 设置 -->
    <!-- <div class='mineAccount'>
      <div>
        <div class='accountItem' @click='call'>
          <div class='accountContent'>
            <div class='accountImg'>
              <img src='../../static/img/mine_set.png'>
            </div>
            <span class='accountName'>电话12345678</span>
          </div>
          <div class='accountInfo'>
            <img src='../../static/img/more.png'>
          </div>
        </div>



      </div>
    </div> -->


    <!--tabbar-->
    <div class="tabbar">
      <router-link to="/index" class="tabbarItem">
        <img src="../../static/img/index.png">
        <p>首页</p>
      </router-link>
      <router-link to="/allAuthor" class="tabbarItem">
        <img src="../../static/img/course.png">
        <p>作者</p>
      </router-link>
      <router-link to="/mine" class="tabbarItem is-active">
        <img src="../../static/img/mineHover.png">
        <p>我的</p>
      </router-link>
    </div>


  </div>
</template>

<script>
  import {checkBindMobile} from '../api/index'
  import { mapState } from 'vuex'

  export default {
    name: "mine",
    data() {
      return {
        userInfo: {},//用户信息
        hasUserInfo: false,//是否含有用户信息
        // canIUse: wx.canIUse('button.open-type.getUserInfo'),//是否可以使用
        accountList: [{
          accountImg: '/image/mine_account.png',
          accountName: '账户',
          accountNumber: '0.00'
        },
          {
            accountImg: '/image/mine_account.png',
            accountName: '收货地址',
            accountNumber: ''

          },
          {
            accountImg: '/image/mine_bought.png',
            accountName: '已购',
            accountNumber: ''
          },
          {
            accountImg: '/image/mine_giftCertificate.png',
            accountName: '礼券',
            accountNumber: '1'
          },
          // {
          //   accountImg: '/image/mine_redPacket.png',
          //   accountName: '分享有赏',
          //   accountNumber: ''
          // },
          {
            accountImg: '/image/mine_friend.png',
            accountName: '邀请好友',
            accountNumber: '各得30元'
          }
        ],
        mineList: [
          // {
          //     mineImg: '/image/mine_note.png',
          //     mineName: '我的笔记'
          //   },
          {
            mineImg: '../../static/img/mine_message.png',
            mineName: '我的留言'
          },
          // {
          //   mineImg: '/image/mine_collect.png',
          //   mineName: '我的收藏'
          // },
          // {
          //   mineImg: '/image/mine_download.png',
          //   mineName: '我的下载'
          // }
        ],
        thisPhoneNumber:null
      }
    },
    computed: {
      ...mapState({
        wxuserinfo: 'wxuserinfo',
        windowHeight:'windowHeight',
        phoneNumber: 'phoneNumber'
      })
    },
    methods: {
      //获取用户信息
      getUserInfo(res) {
        console.log(res);
        this.checkPhone()
      },
      //检查是否绑定手机号接口
      checkPhone() {
        checkBindMobile({
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
        })
          .then(res => {
            console.log('-------------检查是否绑定手机号接口--------------');
            console.log(res);
            if (res.data.msg == "1") {
              console.log("---------------已经绑定手机号---------------------");
              this.isBindingPhone = true;
              this.$store.commit('changePhoneState', this.isBindingPhone);
              this.$store.commit('changePhone', res.data.mobile);
              this.thisPhoneNumber = res.data.mobile
            } else {
              console.log("---------------未绑定手机号---------------------");
              this.isBindingPhone = false;
              this.$store.commit('changePhoneState', this.isBindingPhone);
            }
          })
          .catch(res => {
            console.log('出错了')
          })
      },
      // 跳转到已购页面
      jumpToAlreadyBought() {
        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');
          this.$router.push(
            {
              path:'/alreadyBought',
              name:'alreadyBought',
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
      //跳转到我的留言界面
      jumpToMyMsg(){
        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');
          this.$router.push(
            {
              path:'/myMsg',
              name:'myMsg',
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
      }
    },
    created() {
      this.checkPhone();
      // console.log('wx****',this.$wx);

    }
  }
</script>

<style scoped>


  /* 登录及个人信息样式 */

  .background {
    padding-bottom: 98px;
    background-color: #f5f5f5;
  }

  .personalInformation {
    width: 100%;
    height: 208px;
    background-color: #fff;
  }

  .userBg {
    width: 100%;
    height: 208px;
    float: left;
  }

  .userContent {
    position: absolute;
    z-index: 1;
  }

  .headPortrait {
    height: 100px;
    width: 100px;
    margin: 48px 28px 0 28px;
    float: left;
    border: 3px solid #fff;
    border-radius: 50%;
  }

  .headPortrait img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
  }

  .userInformation {
    float: left;
    margin-top: 54px;
    display: flex;
    flex-direction: column;
  }

  .userinfo_nickname {
    font-size: 44px;
    color: #fff;
  }

  .userinfo_phone {
    font-size: 22px;
    color: #fff;
    padding-top: 16px;
  }

  /* 账户样式 */
  .account {
    margin-top: 30px;
    margin-bottom: 20px;
    background-color: #fff;
  }

  .mineAccount {
    margin-top: 20px;
    background-color: #fff;
  }

  .accountItem {
    height: 88px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    /* align-items: center; */
    justify-content: space-between;
    position: relative;
    text-decoration: none;
  }

  .accountContent {
    width: 50%;
    display: flex;
    align-items: center;
  }

  .accountImg {
    width: 44px;
    height: 44px;
    display: inline-block;
    padding-left: 34px;
  }

  .accountImg img {
    width: 44px;
    height: 44px;
  }

  .accountName {
    padding-left: 24px;
    color: #333;
    font-size: 26px;
    line-height: 26px;
  }

  .accountInfo {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .accountInfo img {
    width: 15px;
    height: 28px;
    padding-left: 22px;
    padding-right: 32px;
  }

  .accountNumber {
    font-size: 26px;
  }

  .accountNumberColor {
    color: #F86161;
  }

  .index_service_button {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 88px;
  }

  /*tabbar*/
  .tabbar {
    border-top: 1px solid #EAEAEA;
    position: fixed;
    max-width: 750px;
    width: 100%;
    bottom: 0;
    height: 98px;
    background-color: #fff;
  }

  .tabbarItem {
    width: 32%;
    text-align: center;
    display: inline-block;
    text-decoration: none;

  }

  .tabbarItem img {
    width: 50px;
    height: 50px;
    padding-top: 13px;
    /*padding-bottom: 7px;*/
  }

  .tabbarItem p {
    color: #333333;
    font-size: 20px;

  }

  .is-active p {
    color: #10AEFF;

  }

</style>
