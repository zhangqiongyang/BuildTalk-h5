<template>
  <!--pages/buy/buy.wxml-->
  <div class="background" :style="{height: windowHeight + 'px'}">


    <div class='userInfo'>
      <img class='userImg' :src='wxuserinfo.headimgurl'>
      <span class='userName'>{{wxuserinfo.nickname}}</span>
      <img class='userPhoneImg' src='../../static/img/buy_phone.png'>
      <span class='userPhone'>{{phoneNumber}}</span>
    </div>
    <div class='courseInfo'>
      <span class='courseName'>{{isArticle?articleinfo.article_title:courseinfo.course_name}}</span>
      <span class='coursePrice'>￥{{isArticle?articleinfo.article_price:courseinfo.course_money}}</span>
    </div>
    <div class='buyTips'>
      <img src='../../static/img/buy_tips.png'>
      <span>将以您登录的手机号作为支付账号，请确认无误后支付</span>
    </div>
    <!-- <div class='buyAccountBox'>
      <div class='buyAccount'>
        <img class='buyAccountImg' src='../../static/img/buy_account.png'>
        <span class='buyAccountspan'>优惠券</span>
        <span class='account'>暂无可用</span>
      </div>
      <img class='buyAccountMore' src='../../static/img/buy_more.png'>
    </div> -->
    <div class='payMode'>
      <div class='radioBox'>
        <div class='radio'></div>
      </div>
      <span>微信支付</span>
    </div>
    <div class='button' @click='pay'>确定</div>
    <div class='customer'>
      <span>如有疑问请</span>
      <span class='color' @click='jumpToFeedback'>联系客服</span>
    </div>


  </div>
</template>

<script>
  import {
    getArticleInfo, getCourseInfo, getAddress, checkOrder, creatOrder, changeOrderInfo
  } from '../api/index'
  import {mapState} from 'vuex'


  export default {
    name: "buy",
    data() {
      return {
        userInfo: {
          nickName: '小地瓜'
        },//用户信息
        isHaveAddress: true,//是否含有收货地址
        recevinginfo: '',//
        isArticle: null,//是否是精品单文
        courseinfo: {},//课程信息
        articleinfo: null,//文章信息,
        order_id:null
      }
    },
    computed: {
      // phoneNumber() {
      //   //由于vuex的状态存储是响应式的，所以从store实例中读取状态的最简单方法就是使用计算属性来返回某个状态：
      //   return this.$store.state.phoneNumber
      // },
      // wxuserinfo() {
      //   //由于vuex的状态存储是响应式的，所以从store实例中读取状态的最简单方法就是使用计算属性来返回某个状态：
      //   return this.$store.state.wxuserinfo
      // },
      ...mapState({
        wxuserinfo: 'wxuserinfo',
        windowHeight: 'windowHeight',
        phoneNumber: 'phoneNumber'
      })
    },
    created() {
      //获取路由带来得参数
      this.getParams();
      //获取收货地址信息
      // this.getAddress_buy();

    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      // '$route': 'getParams
      '$route'() {
        this.getParams()
      }
    },
    methods: {
      //获取路由带来得参数
      getParams() {
        // 取到路由带过来的参数
        // console.log(this.$route.params);
        let routerParams = this.$route.params.dataobj;
        // 将数据放在当前组件的数据内
        if (this.$route.params.name == 'course_id') {
          this.course_id = routerParams;
          this.isArticle = false;
          this.msg = '0';
          //获取课程列表数据
          this.getCourseInfo_buy();
        } else {
          this.article_id = routerParams;
          this.isArticle = true;
          this.msg = '1';
          // 获取文章数据
          this.getArticleInfo_buy();
        }
      },
      //获取课程数据
      getCourseInfo_buy() {
        getCourseInfo({
          course_id: this.course_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('----------课程数据-----------');
            console.log(res);
            this.courseinfo = res.data.courseinfo;
          })
          .catch(res => {
            console.log('出错了')
          })
      },
      // 获取文章数据
      getArticleInfo_buy() {
        getArticleInfo({
          article_id: this.article_id,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('----------文章数据-----------');
            console.log(res);
            this.articleinfo = res.data.articleinfo;
          })
          .catch(res => {
            console.log('出错了')
          })
      },
      //获取收获地址信息
      getAddress_buy() {
        getAddress({
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('--------------收货地址信息------------');
            console.log(res);
            if (res.data.msg == '0') {
              console.log('-----------已有收货地址---------------');
              this.recevinginfo = res.data.recevinginfo;
              this.isHaveAddress = true
            } else {
              console.log('-----------没有收货地址---------------');
              this.isHaveAddress = false
            }
          })
          .catch(res => {
            console.log('出错啦')
          })
      },
      //跳转到用户反馈
      jumpToFeedback() {

      },
      //支付
      pay() {
        console.log('-------支付-------');

//         this.$wx.chooseWXPay({
//           timestamp: 0, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//           nonceStr: '', // 支付签名随机串，不长于 32 位
//           package: '', // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
//           signType: '', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//           paySign: '', // 支付签名
//           success: function (res) {
// // 支付成功后的回调函数
//           }
//         });


        if (this.msg == '0') {
          //查询订单号
          checkOrder({
            msg: this.msg,
            course_id: this.courseinfo.course_id,
            openid: this.$store.state.wxuserinfo.openid,
            source: 'fwh',
            unionid: this.$store.state.wxuserinfo.unionid
          })
            .then(res => {
              console.log('-----------查询订单号成功了------------');
              console.log(res);
              this.order_id = res.data.order_id;

              // 生成订单接口
              creatOrder({
                msg: this.msg,
                order_id: this.order_id,
                openid: this.$store.state.wxuserinfo.openid,
                source: 'fwh',
                unionid: this.$store.state.wxuserinfo.unionid,
                order_price: this.courseinfo.course_money,
                order_name: this.courseinfo.course_name,
                course_id: this.courseinfo.course_id,
                is_discounts: 1,
                // discounts_id:'',
                original_price: this.courseinfo.course_money
              })
                .then(res => {
                  console.log('------------成功生成订单------------');
                  console.log(res);
                  // // 微信支付统一下单
                  // this.$wx.chooseWXPay({
                  //   timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  //   nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                  //   package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                  //   signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  //   paySign: res.data.paySign, // 支付签名
                  //   success: function (res) {
                  //     // 支付成功后的回调函数
                  //     console.log('-----------支付成功了-----------');
                  //     //修改订单状态接口
                  //     changeOrderInfo({
                  //       order_id: this.order_id,
                  //       pay_amount: this.courseinfo.course_money,
                  //     })
                  //       .then(res => {
                  //         console.log('----------修改订单状态成功了------------')
                  //       })
                  //       .catch(res => {
                  //         console.log('------------修改订单状态失败--------------')
                  //       })
                  //   },
                  //   fail() {
                  //     console.log('----------支付失败了----------')
                  //   }
                  // });

                  var onBridgeReady = ()=> {
                    WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                        "appId": "wx94063ed8ba6128d5",     //公众号名称，由商户传入
                        "timeStamp": res.data.timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr": res.data.nonceStr, //随机串
                        "package": res.data.package,
                        "signType": "MD5",         //微信签名方式：
                        "paySign": res.data.paySign //微信签名
                      }, (res)=> {

                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                          // 使用以上方式判断前端返回,微信团队郑重提示：
                          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                          console.log('-----------支付成功了-----------');
                          // alert('支付成功了');

                          // let that = this;
                          // alert(this.order_id);
                          // alert(this.courseinfo.course_money);
                          //修改订单状态接口
                          changeOrderInfo({
                            order_id: this.order_id,
                            pay_amount: this.courseinfo.course_money,
                          })
                            .then(res => {
                              console.log('----------修改订单状态成功了------------');
                              this.$router.history.go(-1)
                            })
                            .catch(res => {
                              console.log('------------修改订单状态失败--------------')
                            })
                        }
                      });
                  };
                  if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if (document.attachEvent){
                      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                  }else{
                    onBridgeReady();
                  }
                })
                .catch(res => {
                  console.log('------------生成订单出错了-------------')
                })
            })
            .catch(res => {
              console.log('--------查询订单号出错----------')
            })

        } else {

          //查询订单号
          checkOrder({
            msg: this.msg,
            article_id: this.articleinfo.article_id,
            openid: this.$store.state.wxuserinfo.openid,
            source: 'fwh',
            unionid: this.$store.state.wxuserinfo.unionid
          })
            .then(res => {
              console.log('-----------查询订单号成功了------------');
              console.log(res);
              this.order_id = res.data.order_id;

              // 生成订单接口
              creatOrder({
                msg: this.msg,
                order_id: this.order_id,
                openid: this.$store.state.wxuserinfo.openid,
                source: 'fwh',
                unionid: this.$store.state.wxuserinfo.unionid,
                order_price: this.articleinfo.article_price,
                order_name: this.articleinfo.article_title,
                article_id: this.articleinfo.article_id,
                is_discounts: 1,
                // discounts_id:'',
                original_price: this.articleinfo.article_price
              })
                .then(res => {
                  console.log('------------成功生成订单------------');
                  console.log(res);
                  // // 微信支付统一下单
                  // this.$wx.chooseWXPay({
                  //   timestamp: res.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                  //   nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                  //   package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                  //   signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                  //   paySign: res.data.paySign, // 支付签名
                  //   success: function (res) {
                  //     // 支付成功后的回调函数
                  //     console.log('-----------支付成功了-----------');
                  //     //修改订单状态接口
                  //     changeOrderInfo({
                  //       order_id: this.order_id,
                  //       pay_amount: this.articleinfo.article_price,
                  //       article_id: this.article_id
                  //     })
                  //       .then(res => {
                  //         console.log('----------修改订单状态成功了------------')
                  //       })
                  //       .catch(res => {
                  //         console.log('------------修改订单状态失败--------------')
                  //       })
                  //   },
                  //   fail() {
                  //     console.log('----------支付失败了----------')
                  //   }
                  // });

                  var onBridgeReady = () => {
                    WeixinJSBridge.invoke(
                      'getBrandWCPayRequest', {
                        "appId": "wx94063ed8ba6128d5",     //公众号名称，由商户传入
                        "timeStamp": res.data.timeStamp,         //时间戳，自1970年以来的秒数
                        "nonceStr": res.data.nonceStr, //随机串
                        "package": res.data.package,
                        "signType": "MD5",         //微信签名方式：
                        "paySign": res.data.paySign //微信签名
                      },
                      (res) => {
                        if (res.err_msg == "get_brand_wcpay_request:ok") {
                          // 使用以上方式判断前端返回,微信团队郑重提示：
                          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                          console.log('-----------支付成功了-----------');
                          // alert('支付成功了');
                          // let that = this;
                          // alert(this.order_id);
                          // alert(that.articleinfo.article_price);
                          // alert(that.article_id);
                          //修改订单状态接口
                          changeOrderInfo({
                            order_id: this.order_id,
                            pay_amount: this.articleinfo.article_price,
                            article_id: this.article_id
                          })
                            .then(res => {
                              console.log('----------修改订单状态成功了------------');
                              // alert('修改订单成功了');
                              this.$router.history.go(-1)
                            })
                            .catch(res => {
                              console.log('------------修改订单状态失败--------------');
                              alert(res)
                            })
                        }
                      });
                  }
                  if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                    }else if (document.attachEvent){
                      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                    }
                  }else{
                    onBridgeReady();
                  }
                })
                .catch(res => {
                  console.log('------------生成订单出错了-------------')
                })
            })
            .catch(res => {
              console.log('--------查询订单号出错----------')
            })


        }


        // function onBridgeReady(){
        //   WeixinJSBridge.invoke(
        //     'getBrandWCPayRequest', {
        //       "appId":"wx2421b1c4370ec43b",     //公众号名称，由商户传入
        //       "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数
        //       "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串
        //       "package":"prepay_id=u802345jgfjsdfgsdg888",
        //       "signType":"MD5",         //微信签名方式：
        //       "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名
        //     },
        //     function(res){
        //       if(res.err_msg == "get_brand_wcpay_request:ok" ){
        //         // 使用以上方式判断前端返回,微信团队郑重提示：
        //         //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        //       }
        //     });
        // }
        // if (typeof WeixinJSBridge == "undefined"){
        //   if( document.addEventListener ){
        //     document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
        //   }else if (document.attachEvent){
        //     document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        //     document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
        //   }
        // }else{
        //   onBridgeReady();
        // }
      }
    },

  }
</script>

<style scoped>
  /* pages/buy/buy.wxss */
  /* 用户信息 */

  .userInfo {
    display: flex;
    align-items: center;
    padding: 30px;
    border-bottom: 1px solid #eaeaea;
    border-top: 1px solid #eaeaea;
  }

  .userImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .userName {
    font-size: 28px;
    padding-left: 20px;
  }

  .userPhoneImg {
    width: 24px;
    height: 24px;
    padding-left: 30px;
  }

  .userPhone {
    color: #666;
    font-size: 24px;
    padding-left: 10px;
  }

  /* 课程信息 */

  .courseInfo {
    width: 100%;
    border-bottom: 1px solid #eaeaea;
    padding: 43px 43px 40px 30px;
    display: flex;
    flex-direction: column;
  }

  .courseName {
    font-size: 34px;
    line-height: 46px;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .coursePrice {
    padding-top: 30px;
    color: #f86161;
    font-size: 34px;
  }

  /* 小提示 */

  .buyTips {
    background-color: #fff6e4;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .buyTips img {
    width: 44px;
    height: 44px;
  }

  .buyTips span {
    color: #f90;
    font-size: 20px;
  }

  /* 优惠券 */

  .buyAccountBox {
    padding: 30px 30px 0 30px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .buyAccount {
    display: flex;
    align-items: center;
    height: 100%;
  }

  .buyAccountImg {
    width: 44px;
    height: 44px;
  }

  .buyAccountspan {
    font-size: 28px;
  }

  .account {
    font-size: 24px;
    color: #999;
    padding-left: 30px;
  }

  .buyAccountMore {
    width: 15px;
    height: 28px;
  }

  /* 支付方式 */

  .payMode {
    padding-top: 45px;
    padding-left: 38px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .radioBox {
    width: 24px;
    height: 24px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(129, 244, 126, 1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .radio {
    width: 16px;
    height: 16px;
    background: rgba(129, 244, 126, 1);
    border-radius: 50%;
  }

  .payMode span {
    padding-left: 20px;
    font-size: 28px;
  }

  /* 支付按钮 */

  .button {
    width: 690px;
    height: 88px;
    background-color: #7ebbf4;
    border-radius: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 80px auto 40px auto;
    font-size: 34px;
  }

  /* 联系客服 */

  .customer {
    width: 100%;
    text-align: center;
  }

  .customer span {
    font-size: 24px;
  }

  .color {
    color: #3795ed;
    padding-left: 6px;
  }


</style>
