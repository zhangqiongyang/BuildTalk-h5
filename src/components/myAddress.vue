<template>
  <!--pages/address/address.wxml-->
  <div class='background'>


    <div class='form'>
      <div class='formList'>
        <img src="../../static/img/address_name.png">
        <input v-model="recevinginfo.consignee" :placeholder='placeholder_name' autofocus
               :class='isNotName?"placeholder_active":"placeholder"'
               @blur='writeNameFinish'>
        <!--<span v-if='isNotName' class='verifyInfo'>请输入用户名</span>-->
      </div>
      <div class='formList'>
        <img src="../../static/img/address_phone.png">
        <input v-model="recevinginfo.telephone" type='number' :placeholder='placeholder_phone'
               :class='isNotPhone?"placeholder_active":"placeholder"'
               @blur='writePhoneFinish'>
        <!--<span v-if='isNotPhone' class='verifyInfo'>请输入手机号码</span>-->
      </div>
      <div class='formList'>
        <img src="../../static/img/address_address.png">
        <textarea v-model="recevinginfo.address" :placeholder='placeholder_address'
                  :class='isNotAddress?"placeholder_active":"placeholder"'
                  @blur='writeAddressFinish'></textarea>
        <!--<span v-if='isNotAddress' class='verifyInfo'>请输入详细地址</span>-->
      </div>
    </div>
    <div class='submitBtn' @click='submit'>保存</div>


  </div>
</template>

<script>
  import {getAddress, uploadAddress} from '../api/index'
  import { mapState } from 'vuex'


  export default {
    name: "myAddress",
    data() {
      return {
        placeholder_name: '收货人',
        placeholder_phone: '手机号码',
        placeholder_address: '详细地址',
        recevinginfo: null,
        isNotName: false,
        isNotPhone: false,
        isNotAddress: false,
      }
    },
    computed: {
      // recevinginfo() {
      //   //由于vuex的状态存储是响应式的，所以从store实例中读取状态的最简单方法就是使用计算属性来返回某个状态：
      //   return this.$store.state.recevinginfo
      // },
      ...mapState({
        recevinginfo: 'recevinginfo',

      })
    },
    created() {
      //获取收货地址信息
      getAddress({
        openid: this.$store.state.wxuserinfo.openid,
        unionid: this.$store.state.wxuserinfo.unionid,
        source: 'fwh',
      })
        .then(res => {
          console.log('------------收货地址信息------------');
          console.log(res);
          if (res.data.msg == '0') {
            console.log('------------获取到收货信息了------------');
            this.recevinginfo = res.data.recevinginfo
          } else {
            console.log('-----------没有收货地址---------------')
          }

        })
        .catch(res => {
          console.log('出错啦')
        })
    },
    methods: {
      writeNameFinish() {
        if (this.recevinginfo.consignee == '') {
          this.isNotName = true;
          this.placeholder_name = '请输入收货人姓名'
        } else {
          this.isNotName = false
        }
      },
      writePhoneFinish() {
        if (this.recevinginfo.telephone == '') {
          this.isNotPhone = true;
          this.placeholder_phone = '请输入收货人手机号码'
        } else {
          this.isNotPhone = false
        }
      },
      writeAddressFinish() {
        if (this.recevinginfo.address == '') {
          this.isNotAddress = true;
          this.placeholder_address = '请输入收货人详细地址'
        } else {
          this.isNotAddress = false
        }
      },
      submit() {
        if (!this.$utils.isEmpty(this.recevinginfo.address) && !this.$utils.isEmpty(this.recevinginfo.telephone) && !this.$utils.isEmpty(this.recevinginfo.consignee)) {
          console.log('----------收货地址信息完整----------');
          uploadAddress({
            openid: this.$store.state.wxuserinfo.openid,
            unionid: this.$store.state.wxuserinfo.unionid,
            source: 'fwh',
            consignee: this.recevinginfo.consignee,
            telephone: this.recevinginfo.telephone,
            address: this.recevinginfo.address
          })
            .then(res => {
              console.log('---------收货地址上传成功----------');
              alert('收货地址上传成功');
              this.$store.commit('changeAddress', this.recevinginfo)
            })
            .catch(res => {
              console.log('---------收货地址上传失败----------');
              alert('收货地址上传失败')
            })
        } else if (this.$utils.isEmpty(this.recevinginfo.address)) {
          console.log('---------没有填写收货详细地址-----------');
          this.isNotAddress = true
        } else if (this.$utils.isEmpty(this.recevinginfo.telephone)) {
          console.log('---------没有填写手机号-----------');
          this.isNotPhone = true
        } else if (this.$utils.isEmpty(this.recevinginfo.consignee)) {
          console.log('---------没有填写收货人-----------');
          this.isNotName = true
        }
      }
    },

  }
</script>

<style scoped>
  /* pages/address/address.wxss */

  .placeholder::-webkit-input-placeholder { /*Webkit browsers*/
    color: #333;
    font-size: 26px;
  }

  .placeholder_active::-webkit-input-placeholder { /*Webkit browsers*/
    color: #FB670E;
    font-size: 26px;
  }

  .placeholder:-moz-placeholder { /*Mozilla Firefox 4 to 8*/
    color: #333;
    font-size: 26px;
  }

  .placeholder_active:-moz-placeholder { /*Mozilla Firefox 4 to 8*/
    color: #FB670E;
    font-size: 26px;
  }

  .placeholder::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #333;
    font-size: 26px;
  }

  .placeholder_active::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #FB670E;
    font-size: 26px;
  }

  .placeholder:-ms-input-placeholder { /*Internet Explorer 10+*/
    color: #333;
    font-size: 26px;
  }

  .placeholder_active:-ms-input-placeholder { /*Internet Explorer 10+*/
    color: #FB670E;
    font-size: 26px;
  }

  .background {
    background-color: #f5f5f5;
    padding-top: 1px;
  }

  .form {
    background-color: #fff;
    /*padding: 0 22px;*/
    margin-top: 30px;
  }

  .form input {
    height: 100px;
    width: 100%;
    font-size: 26px;
    color: #666;
  }

  .form textarea {
    width: 100%;
    height: 148px;
    padding: 22px 0;
    box-sizing: border-box;
    font-size: 26px;
    color: #666;
  }

  .placeholder {
    font-size: 26px;
    color: #999;
  }

  .formList {
    border-bottom: 1px solid #EAEAEA;
    /* height: 88rpx; */
    display: flex;
    /*flex-direction: row;*/
    /*align-items: center;*/
  }

  .formList img {
    width: 44px;
    height: 44px;
    padding: 22px 20px 22px 30px;
  }

  .formList input, .formList textarea {
    border: none;
  }

  .verifyInfo {
    font-size: 24px;
    color: #ff5a05;
    padding-bottom: 22px;
    display: block;
  }

  .submitBtn {
    margin: 82px 44px 0 44px;
    background-color: #7EBBF4;
    color: #fff;
    font-size: 30px;
    height: 78px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
