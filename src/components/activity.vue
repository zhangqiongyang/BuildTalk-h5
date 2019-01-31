<template>
  <!--pages/activity/activity.wxml-->
  <div class='back'>

    <div class='headimg'>
      <img src='../../static/img/activity.png'>
    </div>

    <div class='tipsBox'>
      <div class='tips'>
        <img src='../../static/img/activity_star.png'>
        <span>温馨提示</span>
        <img src='../../static/img/activity_star.png'>
      </div>
      <div class='tipsItem'>
        <span class='tipsBoxspan'>工业互联网上升为国家战略，引领建筑产业转型升级，加速全球建筑产业进入工业化、数字化的网络时代。</span>
        <!-- <span class='strong tipsBoxspan'>大会官网日程</span> -->
      </div>
      <div class='tipsItem'>
        <span class='tipsBoxspan'>工业互联网平台成为建筑产业竞争制高点驱动建筑产业 Made In Internet，重构绿色智能建筑产业新生态。</span>
        <!-- <span class='strong tipsBoxspan'>建谈小程序</span>
        <span class='tipsBoxspan'>发布，敬请期待！</span> -->
      </div>
      <span class='tipsBoxspan tipsItem'>产品整合产业链，数据整合工艺链，平台颠覆产业世界观，工业互联网平台必将颠覆整个产业的商业模式。</span>
    </div>


    <div v-for='item in authorList'>
      <div class='authorItem' @click='jumpToArticle(item.article_id,item.course_id)' :data-article_id='item.article_id'>
        <div class="authorItemImg"><img :src='item.authorImg'></div>
        <div class='articleInfo'>
          <span class='articleName'>{{item.articleName}}</span>
          <div class='authorInfo'>
            <span class='authorspan'>{{item.authorName}}</span>
            <span class='authorspan'>/</span>
            <span class='authorspan'>{{item.authorInfo}}</span>
          </div>
          <span class='authorspan time'>{{item.time}}</span>
        </div>
      </div>
    </div>


    <div class='copyright'>
      ©2018-版权归承办方所有
    </div>


    <!--<div class='share'>-->
    <!--<button class='activityShare' open-type='share'>-->
    <!--<img src='../../static/img/acticle_share.png'>-->
    <!--</button>-->
    <!--</div>-->


  </div>
</template>

<script>
  export default {
    name: "activity",
    data() {
      return {
        authorList: [
          {
            articleName: '建筑产业工业互联网',
            authorName: '张鸣',
            authorInfo: '北京建谊投资发展（集团）有限公司总裁',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhangming.jpg',
            time: '2018年11月03日',
            article_id: '87',
            course_id:'0'
          },
          {
            articleName: '建筑产品体系',
            authorName: '蒲小强',
            authorInfo: '北京建谊投资发展（集团）有限公司建筑产品总监',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/puxiaoqiang.jpg',
            time: '2018年11月03日',
            article_id: '88',
            course_id:'0'
          },
          {
            articleName: '数字建筑集成数字城市',
            authorName: '杨海潮',
            authorInfo: '北京建谊投资发展（集团）有限公司政府服务总监',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/yanghaichao.jpg',
            time: '2018年11月03日',
            article_id: '89',
            course_id:'0'
          },
          {
            articleName: '工业互联网与建筑产业跨界融合，创建建筑新生态',
            authorName: '苏磊',
            authorInfo: '北京建谊投资发展（集团）有限公司副总裁',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/sulei.jpg',
            time: '2018年11月03日',
            article_id: '90',
            course_id:'0'
          },
          {
            articleName: '体验·场景·社群，互联网重塑住宅服务',
            authorName: '龙睿',
            authorInfo: '北京建谊投资发展（集团）有限公司用户产品总监',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/longrui.jpg',
            time: '2018年11月03日',
            article_id: '91',
            course_id:'0'
          },
          {
            articleName: '成本控制模型体系',
            authorName: '张海玲',
            authorInfo: '北京建谊投资发展（集团）有限公司成本管理总监',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhanghailing.jpg',
            time: '2018年11月03日',
            article_id: '92',
            course_id:'0'
          },
          {
            articleName: '建筑产业资源地域经济互联网',
            authorName: '赵伟宏',
            authorInfo: '北京建谊投资发展（集团）有限公司资源管理总监',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhaoweihong.jpg',
            time: '2018年11月03日',
            article_id: '93',
            course_id:'0'
          },
          {
            articleName: '建筑产业工业互联网走向世界，使边穷地区享有建筑新科技',
            authorName: '朱晓斌',
            authorInfo: '北京建谊投资发展（集团）有限公司战略总监',
            authorImg: 'https://www.51jiantan.com/static/image/actionimage/zhuxiaobin.jpg',
            time: '2018年11月03日',
            article_id: '94',
            course_id:'0'
          },
        ]//活动作者信息
      }
    },
    // computed: {
    //   ...mapState({
    //     wxuserinfo: 'wxuserinfo',
    //     windowHeight:'windowHeight',
    //     phoneNumber: 'phoneNumber'
    //   })
    // },
    created() {

    },
    methods: {
      //跳转到文章相应页面
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
    },

  }
</script>

<style scoped>
  /* pages/activity/activity.wxss */
  .back {
    background-color: #f7f8f8;
  }

  .headimg {
    width: 100%;
    /* height: 556px; */
  }

  .headimg img {
    width: 100%;
    /* height: 100%; */
  }

  .tipsBox {
    display: flex;
    flex-direction: column;
    padding: 0 30px;
  }

  .tips {
    height: 94px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tips img {
    width: 32px;
    height: 32px;
    padding: 0 26px;
  }

  .tipsItem {
    padding-bottom: 24px;
    max-height: 99999px;
  }

  .tips span {
    font-size: 32px;
    color: #1f63af;
  }

  .tipsBoxspan {
    font-size: 26px;
    color: #888;
    line-height: 40px;
  }

  .strong {
    font-size: 28px;
    color: #1f63af;
    padding: 0 6px;
  }

  .authorItem {
    width: 690px;
    /* height: 218px; */
    border: 2px solid #e5e9f2;
    display: flex;
    flex-direction: row;
    padding: 22px 30px 26px 16px;
    box-sizing: border-box;
    background-color: #fff;
    align-items: center;
    margin: 0 auto 48px auto;
  }

  .authorItemImg {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    margin-right: 40px;
    position: relative;
    overflow: hidden;
  }

  .authorItemImg img{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 100%;
    width: auto;
  }

  .articleInfo {
    width: 480px;
  }

  .authorInfo {
    width: 480px;
  }

  .authorspan {
    font-size: 24px;
    color: #888;
    line-height: 38px;
  }

  .articleName {
    font-size: 28px;
    color: #1f63af;
  }

  .time {
    display: block;
    padding-top: 40px;
  }

  .copyright {
    background-color: black;
    color: #fff;
    font-size: 26px;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .share {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }

  .share img {
    width: 50px;
    height: 50px;
  }

  /* .activityShare{
    margin: 0;
    padding: 10px;
    line-height: normal;
    border-radius: 50%;
  } */
  button::after {
    border: none;
  }

  button {
    background-color: #e8e9e9;
    height: 86px;
    width: 86px;
    line-height: 86px;
    position: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }

  .button-hover {
    color: rgb(0, 0, 0);
    background-color: #fff;
  }
</style>
