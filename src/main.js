// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import 'lib-flexible'
import utils from './utils/utils'
import wx from 'weixin-js-sdk'

Vue.use(Element, {size: 'small', zIndex: 3000});

Vue.prototype.$axios = axios;
Vue.prototype.$wx = wx;
Vue.prototype.$utils = utils;

Vue.config.productionTip = false;

import {getWX} from './api/index'

getWX()
  .then(res=>{
    console.log(res);
    wx.config({
    debug: false, // 开启调试模式,
    appId: res.data.signPackage.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    timestamp: res.data.signPackage.timestamp, // 必填，生成签名的时间戳
    nonceStr: res.data.signPackage.nonceStr, // 必填，生成签名的随机串
    signature: res.data.signPackage.signature,// 必填，签名，见附录1
    jsApiList: ['scanQRCode','updateAppMessageShareData','chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  });
  });
// this.$axios({
//   method: 'post',
//   url: 'https://www.51jiantan.com/getSignPackage',
//   data: {} //向服务端提供授权url参数，并且不需要#后面的部分
// }).then((res) => {
//   console.log(res)
//   // wx.config({
//   //   debug: true, // 开启调试模式,
//   //   appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
//   //   timestamp: res.timestamp, // 必填，生成签名的时间戳
//   //   nonceStr: res.nonceStr, // 必填，生成签名的随机串
//   //   signature: res.signature,// 必填，签名，见附录1
//   //   jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//   // });
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

// router.afterEach((to, from) => {
//   let _url = window.location.origin + to.fullPath
//   // 非ios设备，切换路由时候进行重新签名
//   if (window.__wxjs_is_wkwebview !== true) {
//     request.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function (_lists) {
//       // 注入配置
//       wx.config({
//         ...
//       })
//     })
//   }
//   // 微信分享配置
//   wx.ready(function () {
//     wx.onMenuShareTimeline({
//       ...
//     });
//     wx.onMenuShareAppMessage({
//       ...
//     })
//   })
// })
//
// ...
// // ios 设备进入页面则进行js-sdk签名
// if (window.__wxjs_is_wkwebview === true) {
//   let _url = window.location.href.split('#')[0]
//   axios.get('/api/jssdk?url=' + encodeURIComponent(_url)).then(function (res) {
//     let _lists = res
//     wx.config({
//       debug: false,
//       appId: _lists.appId,
//       timestamp: _lists.timestamp,
//       nonceStr: _lists.nonceStr,
//       signature: _lists.signature,
//       jsApiList: ['chooseImage', 'uploadImage', 'previewImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareTimeline', 'chooseWXPay']
//     })
//   })
// }

