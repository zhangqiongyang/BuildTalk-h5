<template>
  <!--pages/phone/phone.wxml-->
  <div class='background' :style="{height: windowHeight + 'px'}">

    <span class='title'>验证手机号</span>

    <form @submit.prevent>
      <div class='formItem'>
        <label>手机号</label>

        <input name='phone' placeholder='请输入手机号' v-model="formData.phone">

      </div>

      <div class='formItem'>
        <label>验证码</label>

        <input name='code' placeholder='请输入验证码' v-model="formData.code">


        <div v-if='!isGetCode' class='codeBtn' @click='getPhoneCode'>{{btnText}}</div>
        <span v-else class='code_toast'>{{countDown}}s</span>
      </div>


      <button class='formSubmit' type="submit" @click='formSubmit'>确定</button>

    </form>



  </div>
</template>

<script>
  import {sendCode, getCode} from '../api/index'
  import { mapState } from 'vuex'

  export default {
    name: "phone",
    data() {
      return {
        isGetCode: null,
        countDown: '300',
        btnText: '获取验证码',
        formData: {
          phone: '',
          code: ''
        }
      }
    },
    computed: {
      ...mapState({
        wxuserinfo: 'wxuserinfo',
        windowHeight:'windowHeight',
      })
    },
    created() {

    },
    methods: {
      //获取手机验证码
      getPhoneCode() {
        const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

        let formdata = this.formData,
          errMsg = '';
        errMsg = !formdata.phone ? '手机号不能为空' : formdata.phone && !phoneRexp.test(formdata.phone) ? '手机号格式错误！' : '';
        if (errMsg) {
          this.$message.error(errMsg);
          return false
        }
        this.timer();

        //调用发送短信接口
        this.sendSms();

        this.isGetCode = true
      },

      //提交
      formSubmit() {
        const phoneRexp = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;

        let formData = this.formData,
          errMsg = '';
        if (!formData.phone) {
          errMsg = '手机号不能为空'
        } else if (!formData.code) {
          errMsg = '验证码不能为空'
        } else if (formData.phone) {
          if (!phoneRexp.test(formData.phone)) {
            errMsg = '手机号格式错误！'
          }
        }
        if (errMsg) {
          this.$message.error(errMsg);
          return false;
        }

        // 验证手机号验证码
        this.checkCode()
      },
      //倒计时
      timer() {
        let countDown = this.countDown;
        let clock = setInterval(() => {
          countDown--;
          if (countDown >= 0) {
            this.countDown = countDown
          } else {
            clearInterval(clock);
            this.isGetCode = false;
            this.btnText = '重新获取';
            this.countDown = '300'
          }
        }, 1000)
      },
      //发送短信接口
      sendSms() {
        sendCode({mobile: this.formData.phone})
          .then(res => {
            console.log(res);
            if (res.data.msg == '0') {
              console.log("--------------短信发送成功-----------------");
              this.$message({
                type: 'success',
                message: '短信发送成功!'
              });
            } else {
              console.log("--------------短信发送失败-----------------");
              this.$message.error("短信发送失败");
            }
          })
          .catch(res => {
            console.log('失败啦')
          })
      },
      //获取验证码接口
      checkCode() {
        getCode({
          mobile: this.formData.phone,
          code: this.formData.code,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log(res);
            if (res.data.msg == "0") {
              console.log("---------------验证码正确---------------");
              this.$message({
                type: 'success',
                message: '成功绑定手机号!'
              });
              this.isBindingPhone=true;
              this.$store.commit('changePhone',this.phoneNumber);
              this.$store.commit('changePhoneState',this.isBindingPhone);
              // app.globalData.isBindingPhone = true;
              // app.globalData.phoneNumber = this.formData.phone;
              //返回上一层
              this.$router.history.go(-1)
            } else if (res.data.msg == "1") {
              console.log("---------------超时---------------");
              this.$message.error("超时");
            } else if (res.data.msg == "2") {
              console.log("---------------验证码错误---------------");
              this.$message.error("验证码错误");
            } else if(res.da.msg == '3'){
              console.log("---------------其他错误---------------");
              this.$message.error("其他错误");
            } else{
              console.log("---------------手机号已被绑定---------------");
              this.$message.error("手机号已被绑定");
            }
          })
          .catch(res => {
            console.log('失败啦')
          })
      }
    },

  }
</script>

<style>
  .el-message__content {
    font-size: 34px;
  }

  .el-message__icon {
    font-size: 34px;
  }
</style>

<style scoped>
  /* pages/phone/phone.wxss */

  .background {
    background-color: #f5f5f5;
  }

  .title {
    font-size: 44px;
    padding: 80px 30px;
    display: block;
  }

  .formItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 80px;
    padding: 0 30px;
    border-bottom: 1px solid #EAEAEA;
  }

  .formItem label {
    width: 100px;
    font-size: 26px;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .formItem input {
    font-size: 26px;
    height: 100%;
    width: 460px;
    border: none;
    background-color: #f5f5f5;
  }

  .placeholder {
    font-size: 26px;
  }

  .codeBtn {
    flex: 1;
    font-size: 26px;
    width: 130px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #7EBBF4;
  }

  .code_toast {
    color: #999;
    font-size: 26px;
    flex: 1;
    text-align: center;
  }

  .formSubmit {
    margin-top: 100px;
    background-color: #7EBBF4;
    width: 690px;
    height: 80px;
    border: none;
    color: #fff;
    font-size: 30px;
    margin-left: 30px;
    border-radius: 20px;
  }
</style>
