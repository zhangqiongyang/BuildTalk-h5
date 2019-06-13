<template>
  <div class="background">


    <!-- 搜索 -->
    <div class='index_search'>
      <!--<div class='index_service'>-->
        <!--&lt;!&ndash;<button open-type='contact' class='index_service_button'></button>&ndash;&gt;-->
        <!--<img class='index_service_img' src='../../static/img/index_service.png'/>-->
        <!--<span>客服</span>-->
      <!--</div>-->
      <router-link to="/search" class='index_search_input'>搜索讲师/课程</router-link>
      <!--<div class='index_service'>-->
        <!--<img class='index_service_img' src='../../static/img/index_history.png'/>-->
        <!--<span>历史</span>-->
      <!--</div>-->
    </div>


    <!-- 轮播图 -->
    <div class='index_slideshow'>
      <!--<swiper style='height:330px;' indicator-dots="{{indicatorDots}}" indicator-color='#33333399' indicator-active-color='#fff' autoplay="{{autoplay}}" interval="{{interval}}" duration="{{duration}}">-->
      <!--<div wx:for="{{indexpicinfo}}" wx:key='key'>-->
      <!--<swiper-item class='indexImgItem'>-->
      <!--<img src="{{item.pic_url}}" style='width: 100%;height:330px;' mode='aspectFill' @click='jumpToActivityBanner' data-id='{{item.pic_id}}' />-->
      <!--</swiper-item>-->
      <!--</div>-->
      <!--</swiper>-->
      <div class="block">
        <el-carousel height='4.4rem'>
          <el-carousel-item v-for="item in indexpicinfo" :key="item.pic_id" >
            <div class="slideshowImg" @click="jumpToActivity(item.data_id,item.type_id)">
              <img :src="item.pic_url">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>


    <!-- 建谈新闻 -->
    <div class='index_news'>
      <div class='newsNav'>
        <img class='navImg' src='../../static/img/index_headpadding.png'>
        <span class='newsTitle'>每日一谈</span>
        <img class='navImg' src='../../static/img/index_headpadding.png'>
        <router-link to="/allNews" class='newsAll'>
          <img src='../../static/img/index_more.png'>
        </router-link>
      </div>
      <div class='newsList'>
        <div v-for='item in newsinfo'>
          <div class='newsCon' @click='jumpToNews(item.article_id,item.course_id)' data-article_id='item.article_id'>
            <img class='newsListImg' src='../../static/img/index_play.png'>
            <span class="newsListspan">{{item.article_title}}</span>
          </div>
        </div>
      </div>
    </div>


    <!-- 精品专栏 -->
    <div class='index_boutique'>
      <div class='newsNav'>
        <img class='navImg' src='../../static/img/index_headpadding.png'/>
        <span class='newsTitle'>精品专栏</span>
        <img class='navImg' src='../../static/img/index_headpadding.png'/>
        <router-link to="/allCourse" class='newsAll'>
          <img src='../../static/img/index_more.png'/>
        </router-link>
      </div>
      <div class='swiperbackground'>
        <!--<scroll-div scroll-x style='white-space: nowrap;'>-->
        <el-container>
          <el-main>

            <div class='boutique_swiper' v-for="item in courseinfo" :key='item.course_id'>
              <div class='boutique_img' @click='jumpToList(item.course_id)' :data-course_id='item.course_id'>
                <img :src='item.course_picurl'/>
              </div>
              <div class='boutique_course' @click='jumpToList(item.course_id)' :data-course_id='item.course_id'>
                <div class='boutique_NameBox'>
                  <span class='boutique_name'>{{item.course_name}}</span>
                  <!-- <span class='boutique_price'>{{item.coursePrice}}</span>
                  <span>/</span>
                  <span class='boutique_price'>{{item.coursePrice}}</span> -->
                  <div class='boutique_priceBox'>
                    <div class='boutique_priceItem'>

                      <!--<div v-if="platform !=='ios'" class='boutique_priceItem'>-->
                      <span class='boutique_price'>￥{{item.course_money}}</span>
                      <span class='boutique_num'>/</span>
                    </div>
                    <span class='boutique_num'>{{item.coursenum}}讲</span>
                  </div>
                </div>
                <span class='boutique_introduce'>{{item.course_desc}}</span>
              </div>
              <div class='boutique_author' @click='jumpToAuthor(item.author_id)' :data-author_id='item.author_id'>
                <div class='boutique_authorImg'>
                  <img :src='item.author_pic'>
                </div>
                <span class='boutique_authorName'>{{item.author_name}}</span>
                <img class='index_line' src='../../static/img/index_line.png'>
                <span class='boutique_authorPosition'>{{item.author_desc}}</span>
              </div>
            </div>

          </el-main>
        </el-container>

        <!--</scroll-div>-->
      </div>
    </div>


    <!-- 作者专栏 -->
    <div class='videoCourse'>
      <div class='newsNav'>
        <img class='navImg' src='../../static/img/index_headpadding.png'/>
        <span class='newsTitle'>推荐作者</span>
        <img class='navImg' src='../../static/img/index_headpadding.png'/>
        <router-link to="/allAuthor" class='newsAll'>
          <img src='../../static/img/index_more.png'/>
        </router-link>
      </div>
      <div v-for="item in authorinfo" :key='item.author_id'>
        <div class='courseItem' @click='jumpToAuthor(item.author_id)' :data-author_id='item.author_id'>
          <div class='teacherImg'>
            <img :src='item.author_pic'/>
          </div>
          <div class='courseContent'>

            <div class='teacherInformation'>
              <span class='teacherName'>{{item.author_name}}</span>
              <img src="../../static/img/allAuthor_line.png">
              <!-- <span class='teacherPosition'>|</span> -->
              <span class='teacherPosition'>{{item.author_desc}}</span>
            </div>
            <div class='s_authorInfo'>{{item.author_intro}}</div>

            <div class='labelBox'>
              <div v-for='itm in item.sign'>
                <span class='label' :label='itm'>{{itm}}</span>
                <!-- <span class='label' catchtap='jumpToSearchLabel' data-label='{{item}}'>{{item}}</span> -->
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>


    <!-- 建谈商城 -->
    <!-- <div class='index_shop'>
      <div class='newsNav'>
        <img class='navImg' src='../../static/img/index_headpadding.png'><../../static/img>
        <span class='newsTitle'>建谈商城</span>
        <img class='navImg' src='../../static/img/index_headpadding.png'><../../static/img>
        <div class='newsAll'>
          <img src='../../static/img/index_more.png'><../../static/img>
        </div>
      </div>
      <div class='shop'>
        <scroll-div scroll-x style='white-space: nowrap;'>
          <div wx:for="{{bookList}}" wx:key='key'>
            <div class='bookItem'>
              <div class='bookImg'>
                <img src='{{item.bookImg}}'><../../static/img>
              </div>
              <div class='bookInformation'>
                <span class='bookName'>{{item.bookName}}</span>
                <span class='bookPrice'>￥{{item.bookPrice}}</span>
              </div>
            </div>
          </div>
        </scroll-div>
      </div>
    </div> -->


    <!-- 热点专题 -->
    <div class='hotTopic'>
      <div class='newsNav'>
        <img class='navImg' src='../../static/img/index_headpadding.png'/>
        <span class='newsTitle'>热点专题</span>
        <img class='navImg' src='../../static/img/index_headpadding.png'/>
        <div class='newsAll'>
          <img src='../../static/img/index_more.png'/>
        </div>
      </div>
      <div class='hotItem'>
        <el-container>
          <el-main>
            <router-link to="/activity" class='hotImg' v-for="(item,index) in hotItem" :key='item.index'
                         :hot_label="item.hot_label">
              <img :src='item.hot_img'/>
            </router-link>
          </el-main>
        </el-container>
      </div>
    </div>


    <!-- 建谈视频 -->
    <!-- <div class='index_video'>
      <div class='newsNav'>
        <img class='navImg' src='../../static/img/index_headpadding.png'><../../static/img>
        <span class='newsTitle'>建谈视频</span>
        <img class='navImg' src='../../static/img/index_headpadding.png'><../../static/img>
        <div class='newsAll'>
          <img src='../../static/img/index_more.png'><../../static/img>
        </div>
      </div>
      <div class='video'>
        <scroll-div scroll-x style='white-space: nowrap;'>
          <div wx:for="{{videoItem}}" wx:key='key'>
            <div class='videoItem'>
              <div class='videoImg'>
                <img class='videoImg' src='{{item.videoImg}}'><../../static/img> -->
    <!-- <img class='videoPlayImg' src='../../static/img/index_video_play.png'><../../static/img> -->
    <!-- </div>
              <div class='videoInformation'>
                <span class='videoName'>{{item.videoName}}</span>
                <span class='videoAuthor'>{{item.videoAuthor}}</span>
              </div>
            </div>
          </div>
        </scroll-div>
      </div>
    </div> -->

    <!--tabbar-->
    <div class="tabbar">
      <router-link to="/index" class="tabbarItem is-active">
        <img src="../../static/img/indexHover.png">
        <p>首页</p>
      </router-link>
      <router-link to="/allAuthor" class="tabbarItem">
        <img src="../../static/img/course.png">
        <p>作者</p>
      </router-link>
      <router-link to="/mine" class="tabbarItem">
        <img src="../../static/img/mine.png">
        <p>我的</p>
      </router-link>
    </div>


  </div>

</template>

<script>
  import {getUserInfo, getIndexNewsInfo, getslideshowInfo, getIndexCourseInfo, getIndexAuthorInfo} from '../api/index'

  export default {
    name: "index",
    data() {
      return {
        indexpicinfo: [],//首页轮播图
        courseinfo: [],//首页推荐课程信息
        authorinfo: [],//首页推荐作者信息
        newsinfo: [],//首页新闻信息
        hotItem: [{
          hot_img: "https://www.51jiantan.com/static/image/banner2.png",
          hot_label: '建筑互联网大会'
        },]//首页热点信息
      }
    },
    created() {

      //获取屏幕宽度与高度

      let gWinHeight = document.documentElement.clientHeight;

      let gWinWidth = document.documentElement.clientWidth;

      console.log(gWinWidth + "," + gWinHeight);

      this.$store.commit('changeWindowsHeight', gWinHeight);

      //获取用户信息
      getUserInfo()
        .then(res => {
          console.log(res);

          //测试数据
          let wxuserinfo = {
            city: "",
            country: "中国",
            groupid: 0,
            headimgurl: "http://thirdwx.qlogo.cn/mmopen/POrowfjjr3eia3LA76aVZNV4heLxk3d0WFXFaxTOVVwnSe75xx2ibpfspgTbsYXOZ7DNAvoRk7EP6oGicSJ8TT399CUVHE4nagib/132",
            language: "zh_CN",
            nickname: "小地瓜",
            openid: "ozW8152q6v8cOZBAHUGSOO2RBOEg",
            province: "河北",
            qr_scene: 0,
            qr_scene_str: "",
            remark: "",
            sex: 2,
            subscribe: 1,
            subscribe_scene: "ADD_SCENE_SEARCH",
            subscribe_time: 1543585172,
            tagid_list: Array(0),
            unionid: "o2mp91ZOr14sDiPgmQOsB2PSffTI"
          };

          //测试方法
          // this.$store.commit('changeUserInfo', wxuserinfo);

          //线上方法
          this.$store.commit('changeUserInfo', res.data.wxuserinfo);


          //测试方法
          // if (mobile) {
          //线上方法
          if (res.data.mobile) {
            console.log('----------已经绑定了手机号-----------');
            this.$store.commit('changePhone', res.data.mobile);
          } else {
            console.log('----------未绑定手机号-----------');
            this.$router.push(
              {
                path: '/phone',
                name: 'phone',
              }
            )
          }
        })
        .catch(res => {
          console.log('出错了')
        });


      //获取首页新闻信息
      getIndexNewsInfo()
        .then(res => {
          console.log('-----------首页新闻信息------------');
          console.log(res);
          if (res.status === 200 && res.data && res.data.newsinfo) {
            this.newsinfo = res.data.newsinfo
          }
        })
        .catch(res => {
          console.log('出错了')
        });
      // 获取首页轮播图信息
      getslideshowInfo()
        .then(res => {
          console.log('-----------首页轮播图信息------------');
          console.log(res);
          if (res.status === 200 && res.data && res.data.data) {
            this.indexpicinfo = res.data.data
          }
        })
        .catch(res => {
          console.log('出错了')
        });
      //获取首页课程推荐信息
      getIndexCourseInfo()
        .then(res => {
          console.log('-----------首页课程推荐信息------------');
          console.log(res);
          if (res.status === 200 && res.data && res.data.courseinfo) {
            this.courseinfo = res.data.courseinfo
          }
        })
        .catch(res => {
          console.log('出错了')
        });

      //获取首页作者推荐信息
      getIndexAuthorInfo()
        .then(res => {
          console.log('-----------获取首页作者推荐信息------------');
          console.log(res);
          if (res.status === 200 && res.data && res.data.authorinfo) {
            this.authorinfo = res.data.authorinfo
          }
        })
        .catch(res => {
          console.log('出错了')
        })


    },

    mounted() {

    },
    methods: {
      jumpToActivity(id,type) {
        console.log(id + type);
        // type_id 类型id. 1课程 2精品单文 3 作者 4活动
        if(type == '1'){
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
        } else if (type == '2'){
          this.$router.push(
            {
              path: '/article_video',
              name: 'article_video',
              params: {
                name: 'article_id',
                dataobj: id,
              }
            }
          )
        } else if (type == '3') {
          this.$router.push(
            {
              path: '/author',
              name: 'author',
              params: {
                name: 'author_id',
                dataobj: id
              }
            }
          )
        } else if (type == '4') {
          this.$router.push({
            path: '/activity',
            name: 'activity',
          })
        }

      },
      jumpToNews(article_id,course_id) {
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
      //跳转到课程相应列表页面
      jumpToList(id) {
        console.log(id);
        //判断是否绑定手机号
        if(this.$store.state.phoneNumber){
          console.log('---------已经绑定了手机号---------');

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
      //跳转到作者相应页面
      jumpToAuthor(id) {
        console.log(id);
        this.$router.push(
          {
            path: '/author',
            name: 'author',
            params: {
              name: 'author_id',
              dataobj: id
            }
          }
        )
      },

    },


  }
</script>

<style scoped>
  /* pages/index/index.wxss */

  .background {
    padding-top: 1px;
    padding-bottom: 98px;
    background-color: #f5f5f5;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .indexImgItem {
    text-align: center;
  }

  /* 搜索框 */

  .index_search {
    position: fixed;
    z-index: 99;
    width: 100%;
    max-width: 750px;
    height: 88px;
    line-height: 56px;
    border-bottom: 1px solid #9a9693;
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
  }

  .index_service_button {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 148px;
    height: 100%;
  }

  .index_service {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 148px;
    height: 100%;
    justify-content: center;
  }

  .index_service span {
    font-size: 20px;
    line-height: 20px;
    color: #000;
  }

  .index_service_img {
    width: 44px;
    height: 44px;
  }

  .index_search_input {
    background-color: #f5f5f5;
    border-radius: 50px;
    /*width: 454px;*/
    width: 680px;
    margin: 0 auto;

    height: 68px;
    font-size: 26px;
    color: #424242;
    text-align: center;
    text-decoration: none;
    /* margin-top: 18px;
    margin-bottom: 16px; */
  }

  /* 轮播图 */

  /*.el-carousel {*/
  /*height: 330px;!*px*!*/
  /*}*/
  /*.el-carousel__container{*/
  /*height: 330px;!*px*!*/
  /*}*/

  .index_slideshow {
    margin-top: 88px;
    width: 100%;
    height: 330px; /*px*/
  }

  .slideshowImg {
    width: 100%;
    height: 330px; /*px*/
  }

  .slideshowImg img {
    width: 100%;
    height: 100%;
    /*height: 0;*/
    /*padding-bottom: 75%;*/
  }

  /* 新闻样式 */

  .index_news {
    background-color: #fff;
  }

  .newsNav {
    height: 88px;
    line-height: 88px;
    border-bottom: 1px solid #f1f1f1;
    background-color: #fff;
    text-align: center;
  }

  .navImg {
    width: 12px;
    height: 16px;
  }

  .newsTitle {
    font-size: 34px;
    padding-left: 30px;
    padding-right: 30px;
  }

  .newsAll {
    height: 88px;
    width: 150px;
    display: inline-block;
    position: absolute;
    right: 0;
    text-align: right;
    padding-right: 34px;
  }

  .newsAll img {
    width: 44px;
    height: 44px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 18%;
  }

  .newsList {
    padding: 30px;
  }

  .newsCon {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .newsListImg {
    width: 30px;
    height: 30px;
  }

  .newsListspan {
    display: inline-block;
    line-height: 62px;
    padding-left: 20px;
    font-size: 30px;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* width: 90rpx; */
  }

  /* 精品专栏样式 */

  .el-main {
    white-space: nowrap;
    padding: 0;
  }

  .index_boutique {
    background-color: #fff;
    /* margin-top: 18px; */
  }

  .swiperbackground {
    background-color: #fff;

    height: 438px;
  }

  .boutique_swiper {
    margin: 30px 0 30px 30px;
    width: 566px;
    height: 386px;
    background-color: #fff;
    border-radius: 20px;
    display: inline-block;
    border: 1px solid #EAEAEA;
  }

  .boutique_img {
    width: 566px;
    height: 142px;
    overflow: hidden;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  .boutique_course span {
    display: block;
  }

  .boutique_course {
    padding: 26px 20px 34px 22px;
    overflow: hidden;
    border-bottom: 1px solid #eaeaea;
    width: 566px;
    box-sizing: border-box;
  }

  .boutique_NameBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .boutique_name {
    font-size: 30px;
  }

  .boutique_priceBox {
    display: flex;
    flex-direction: row;
  }

  .boutique_priceItem {
    display: flex;
    flex-direction: row;
  }

  .boutique_price {
    font-size: 26px;
    color: #f86161;
  }

  .boutique_num {
    font-size: 20px;
    color: #afafaf;
    line-height: 40px;
  }

  .boutique_introduce {
    float: left;
    font-size: 24px;
    color: #777;
    padding-top: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .boutique_author {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 20px 22px 22px 22px;
  }

  .boutique_authorImg {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    overflow: hidden;
  }

  .boutique_authorImg img {
    border-radius: 50%;
  }

  .index_line {
    width: 2px;
    height: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .boutique_authorName {
    margin-left: 20px;
    font-size: 26px;
  }

  .boutique_authorPosition {
    color: #afafaf;
    font-size: 22px;
  }

  /* 视频课程 */

  .videoCourse {
    margin-top: 30px;
  }

  .courseItem {
    background-color: #fff;
    padding: 30px 30px 10px 30px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    flex-direction: row;
  }

  .teacherImg {
    width: 140px;
    height: 140px;
    float: left;
    margin-right: 30px;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
    position: relative;
    border-radius: 10px;
  }

  .teacherImg img {
    /*width: 184px;*/
    /*height: 218px;*/

    /*border-radius: 10px;*/
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .courseContent {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* .courseNameBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .courseName {
    font-size: 30px;
    line-height: 30px;
    padding-top: 6px;
    padding-bottom: 12px;
  }

  .CourseIntroduce {
    font-size: 24px;
    line-height: 24px;
    color: #777;
    padding-bottom: 28px;
  }


  .courseTimeAndPrice {
    padding-bottom: 60px;
    line-height: 22px;
  }

  .courseTime {
    font-size: 22px;
    color: #AFAFAF;
  }

  .coursePrice {
    font-size: 26px;
    color: #F86161;
  } */
  .teacherInformation {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .teacherName {
    font-size: 36px;
  }

  .teacherInformation img {
    width: 1px; /*px*/
    height: 20px; /*px*/
    padding: 0 20px;
  }

  .teacherPosition {
    font-size: 24px;
    line-height: 24px;
    color: #999;
  }

  .s_authorInfo {
    font-size: 24px;
    color: #333;
    padding-top: 28px;
    display: -webkit-box;
    line-height: 36px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .labelBox {
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    margin-left: -10px;
    flex-wrap: wrap;
  }

  .label {
    font-size: 24px;
    color: #333;
    background-color: #f8f8f8;
    padding: 20px 50px;
    margin: 0 10px;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  /* 建谈商城样式 */
  /* .index_shop{
    margin-top: 30px;
  }
  .shop {
    background-color: #fff;
    padding: 30px 0 26px 0;
  }

  .bookItem {
    padding-left: 30px;
    display: inline-block;
  }

  .bookImg {
    width: 242px;
    height: 260px;
    background-color: #F5F5F5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bookImg img {
    width: 139px;
    height: 193px;
  }

  .bookInformation {
    display: flex;
    flex-direction: column;
    margin-top: 26px;
  }

  .bookName {
    padding: 0 20px;
    display: inline-block;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    span-overflow:ellipsis;
    line-height: 30px;
  }

  .bookPrice {
    padding-top: 18px;
    padding-left: 20px;
    padding-right: 20px;
    color: #F86161;
    font-size: 26px;
    line-height: 26px;
  } */

  /* 热点专题 */

  .hotTopic {
    margin-top: 30px;
    background-color: #fff;
  }

  .hotItem {
    padding: 30px 0;
  }

  .hotImg {
    padding-left: 30px;
    display: inline-block;
    width: 302px;
    height: 134px; /*px*/
    /* border: 1px solid #e8e7e5; */
    border-radius: 10px;
  }

  .hotItem img {
    border-radius: 10px;
  }

  /* 建谈视频样式 */
  /* .index_video{
    margin-top: 30px;
  }
  .video {
    padding: 30px 0 66px 0;
    background-color: #fff;
  }

  .videoItem {
    display: inline-block;
    padding-left: 30px;
    width: 302px;
    border-radius: 10px;
  }

  .videoImg {
    width: 302px;
    height: 218px;
    position: relative;
    border-radius: 10px;
  }

  .videoPlayImg {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 37%;
    top: 27%;
  }

  .videoInformation {
    display: flex;
    flex-direction: column;
    width: 302px;
    padding-top: 16px;
  }

  .videoName {
    box-sizing: border-box;
    padding: 0 20px;
    display: inline-block;
    white-space: nowrap;
    width: 302px;
    overflow: hidden;
    span-overflow:ellipsis;
    font-size: 24px;
  }

  .videoAuthor {
    font-size: 26px;
    color: #AFAFAF;
    padding-top: 18px;
    padding-left: 20px;
  } */

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

  /* 2018-10-24前视频课程 */
  /* .videoCourse {
    margin-top: 30px;
  }

  .courseItem {
    background-color: #fff;
    padding: 30px;
    border-bottom: 1px solid #f1f1f1;
    display: flex;
    flex-direction: row;
  }

  .teacherImg {
    width: 184px;
    height: 218px;
    float: left;
    padding-right: 20px;
  }

  .teacherImg img {
    width: 184px;
    height: 218px;
    border-radius: 10px;
  }

  .courseContent {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .courseNameBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .courseName {
    font-size: 30px;
    line-height: 30px;
    padding-top: 6px;
    padding-bottom: 12px;
  }

  .CourseIntroduce {
    font-size: 24px;
    line-height: 24px;
    color: #777;
    padding-bottom: 28px;
  }


  .courseTimeAndPrice {
    padding-bottom: 60px;
    line-height: 22px;
  }

  .courseTime {
    font-size: 22px;
    color: #AFAFAF;
  }

  .coursePrice {
    font-size: 26px;
    color: #F86161;
  }
  .teacherInformation {
    line-height: 26px;
  }

  .teacherName {
    padding-right: 10px;
    color: #333;
    font-size: 26px;
    line-height: 26px;
  }

  .teacherPosition {
    padding-left: 10px;
    color: #AFAFAF;
    font-size: 22px;
  }
  */


</style>
