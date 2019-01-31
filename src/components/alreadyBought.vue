<template>
  <!--pages/alreadyBought/alreadyBought.wxml-->
  <div>


    <div scroll-x class='titleBar'>
      <!-- <div class='classify {{currentTab=="0"?"active":""}}' data-current='0' @click='swichNav'>全部</div> -->
      <!--<div :class="'classify'+(current=='0'?' active':current=='1'? ' active01':'')"  @click='current=0'>课程</div>-->
      <div :class='["classify",current=="0" ? "active" : ""]' @click='current=0'>课程</div>
      <div :class='["classify",current=="1" ? "active" : ""]' @click='current=1'>文章</div>
      <!-- <div class='underline'></div> -->
    </div>


    <!-- 选项卡内容 -->
    <!--<swiper :current='currentTab' class='swiper' @change='bindChange'>-->
    <!-- <swiper current='{{currentTab}}' class='swiper' bindchange='bindChange'> -->

    <!-- 全部选项卡 -->
    <!-- <swiper-item>
      <div class='courseList'>
        <div class='title'>全部</div>
        <div v-for='{{alreadyinfo}}' v-key='key'>
          <div class='courseItem' @click='jumpToList' data-course_id='{{item.course_id}}'>
            <div class='course'>
              <img src='{{item.pic_url}}'>
              <div class='courseInfo'>
                <span class='courseName'>{{item.course_name}}</span>
                <span class='courseDate'>课程描述</span>
                <span class='courseDate'>{{item.updatetime}}</span>
                <div class='courseNumber'>
                  <span class='courseAlreadyLearnspan'>已更新{{item.courseNumber}}讲</span>
                  <span class='courseAlreadyLearnspan'>|</span>
                  <span class='courseAlreadyLearnspan'>已学习</span>
                  <span class='courseAlreadyLearn'>{{item.courseAlreadyLearn}}</span>
                  <span class='courseAlreadyLearnspan'>讲</span>
                </div>
              </div>
              <div class='starToLearn'>
                <img src='../../static/img/alreadyBought_play.png'>
                <span>开始学习</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </swiper-item> -->


    <!-- 课程选项卡 -->
    <!--<swiper-item>-->
    <div v-show="current==0" class='courseListBox'>
      <div class='courseList'>
        <div class='title'>课程</div>
        <div v-for='item in coursebuyinfo'>
          <div class='courseItem' @click='jumpToList(item.course_id)' :data-course_id='item.course_id'>
            <div class='course'>
              <img :src='item.pic_url'>
              <div class='courseInfo'>
                <span class='courseName'>{{item.course_name}}</span>
                <span class='courseDate'>{{item.course_desc}}</span>
                <span class='courseDate'>{{item.updatetime}}</span>
                <!-- <div class='courseNumber'>
                  <span class='courseAlreadyLearnspan'>已更新{{item.courseNumber}}讲</span>
                  <span class='courseAlreadyLearnspan'>|</span>
                  <span class='courseAlreadyLearnspan'>已学习</span>
                  <span class='courseAlreadyLearn'>{{item.courseAlreadyLearn}}</span>
                  <span class='courseAlreadyLearnspan'>讲</span>
                </div> -->
              </div>
              <div class='starToLearn'>
                <img src='../../static/img/alreadyBought_play.png'>
                <span>开始学习</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--</swiper-item>-->


    <!-- 文章选项卡 -->
    <!--<swiper-item>-->
    <div v-show="current==1" class='courseListBox'>
      <div class='courseList'>
        <div class='title'>文章</div>
        <div v-for='item in articlebuyinfo'>
          <div class='courseItem' @click='jumpToArticle(item.article_id,item.course_id)' :data-article_id='item.article_id'
               :data-audio_id='item.audio_id'>
            <div class='course'>
              <img :src='item.article_pic'>
              <div class='courseInfo'>
                <span class='courseName'>{{item.article_title}}</span>
                <span class='courseDate'>{{item.desc}}</span>
                <!-- <span class='courseDate'>{{item.updatetime}}</span> -->
                <!-- <div class='courseNumber'>
                  <span class='courseAlreadyLearnspan'>已更新{{item.courseNumber}}讲</span>
                  <span class='courseAlreadyLearnspan'>|</span>
                  <span class='courseAlreadyLearnspan'>已学习</span>
                  <span class='courseAlreadyLearn'>{{item.courseAlreadyLearn}}</span>
                  <span class='courseAlreadyLearnspan'>讲</span>
                </div> -->
              </div>
              <div class='starToLearn'>
                <img src='../../static/img/alreadyBought_play.png'>
                <span>开始学习</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--</swiper-item>-->

    <!--</swiper>-->


  </div>
</template>

<script>
  import {getAlreadyBought} from '../api/index'

  export default {
    name: "alreadyBought",
    data() {
      return {
        current: 0,
        coursebuyinfo: null,
        articlebuyinfo: null,
        currentTab: '0',
        activeName: 'second'
      }
    },
    // computed: {
    //   wxuserinfo() {
    //     //由于vuex的状态存储是响应式的，所以从store实例中读取状态的最简单方法就是使用计算属性来返回某个状态：
    //     return this.$store.state.wxuserinfo
    //   },
    // },
    created() {
      //获取已购信息
      getAlreadyBought({
        openid: this.$store.state.wxuserinfo.openid,
        unionid: this.$store.state.wxuserinfo.unionid,
        source: 'fwh',
      })
        .then(res => {
          console.log('------------已购信息------------');
          console.log(res);
          this.articlebuyinfo = res.data.articlebuyinfo;
          this.coursebuyinfo = res.data.coursebuyinfo
        })
        .catch(res => {
          console.log('出错啦')
        })
    },
    methods: {
      //跳转到文章列表页
      jumpToList(id) {
        console.log(id);
        this.$router.push(
          {
            path: '/list',
            name: 'list',
            params: {
              name: 'course_id',
              dataobj: id
            }
          }
        )
      },
      //跳转到文章页
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
  /* pages/alreadyBought/alreadyBought.wxss */

  /* 全部 */

  .titleBar {
    height: 100px;
    border-bottom: 2px solid #f4f4f4;
    align-items: center;
    display: flex;
  }

  .classify {
    font-size: 30px;
    /* padding: 0 20px; */
    margin-left: 20px;
    /* width: 80px; */
    height: 60px;
    display: inline-block;
  }

  .active {
    border-bottom: 6px solid #fa8919;
  }

  .underline {
    /* position: absolute; */
    margin-top: 20px;
    margin-left: 20px;
    width: 48px;
    height: 6px;
    background-color: #fa8919;
    border-radius: 20%;
  }

  .courseListBox {
    white-space: nowrap;
  }

  .courseList {
    padding: 0 32px;
    border-bottom: 2px solid #f4f4f4;
  }

  .title {
    height: 110px;
    display: flex;
    align-items: center;
  }

  .courseItem {
    display: flex;
    height: 188px;
    align-items: center;
    margin: 40px 0;
  }

  .course {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
  }

  .courseItem img {
    width: 122px;
    height: 122px;
  }

  .courseInfo {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  .courseName {
    font-size: 32px;
    color: #4d4d4d;
    /* padding-top: 10px; */
  }

  .courseDate {
    color: #888;
    font-size: 24px;
    padding-top: 26px;
  }

  .courseNumber {
    display: flex;
    flex-direction: row;
  }

  /* .courseNumber view{
    display: inline;
  } */

  .courseAlreadyLearnspan {
    color: #888;
    font-size: 24px;
    letter-spacing: 5px;
  }

  .courseAlreadyLearn {
    color: #fa8919;
    font-size: 24px;
    letter-spacing: 5px;
  }

  .starToLearn {
    border: 2px solid #fa8919;
    height: 50px;
    width: 176px;
    border-radius: 20px;
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .starToLearn img {
    width: 26px;
    height: 26px;
  }

  .starToLearn span {
    color: #fa8919;
  }

  /* .swiper{
    height: ;
  } */
</style>
