<template>
  <!--pages/author/author.wxml-->
  <div class="background">

    <div class='authorInfo' @click='jumpToAuthorDesc(authorinfo.author_id)' data-author_id='authorinfo.author_id'>

      <div class='author'>
        <div class="authorImg">
          <img :src='authorinfo.author_pic'>
        </div>
        <div class='authorspan'>
          <span class='authorName'>{{authorinfo.author_name}}</span>
          <span class='authorIntroduce'>{{authorinfo.author_desc}}</span>
        </div>
      </div>
      <img class='checkMore' src='../../static/img/list_more.png'>
    </div>


    <div>

      <div class='nav' v-if='isArticle'>
        <span class='active' @click='switchMode' data-id='article'>精品单文</span>
        <span class='navspan' @click='switchMode' data-id='course'>系列课程</span>
      </div>
      <div class='nav' v-if='!isArticle'>
        <span class='navspan' @click='switchMode' data-id='article'>精品单文</span>
        <span class='active' @click='switchMode' data-id='course'>系列课程</span>
      </div>

      <!-- <div class='nav'>
        <span class='{{isArticle}}?"active":"navspan"' @click='switchMode' data-id='article'>精品单文</span>
        <span class='{{isArticle}}?"navspan":"active"' @click='switchMode' data-id='course'>系列课程</span>
      </div> -->
    </div>


    <div v-if='isArticle'>
      <div v-if='isHaveArticle' class='article'>
        <div v-for='item in articleinfo' :key='item.article_id'>
          <div class='articleItem' @click='jumpToArticle(item.article_id,item.course_id)' :article_id='item.article_id'
               :article_price='item.article_price'>
            <div class='articleItemCon'>
              <div class='articleimg'>
                <img class='articleimgBack' :src='item.article_pic'>
                <img class='articleimgBoutique' src='../../static/img/author_boutique.png'>
                <div class='articlePriceBox'>
                  <span v-if="item.isFree" class='articlePrice'>免费</span>
                  <div v-else>
                    <span class='originalPrice'> ￥{{item.original_price}}</span>
                    <span class='articlePrice'>￥{{item.article_price}}</span>
                  </div>
                </div>
              </div>

              <span class='articleName'>{{item.article_title}}</span>
              <span class='articleCon'>{{item.article_desc}}</span>
            </div>


          </div>

        </div>


        <!-- <div class='author_clickBox'>
          <div class='author_clickBoximg'>
            <img src='../../static/img/article_down.png'>
          </div>
          <div class='author_click'>
            <img src='../../static/img/article_click.png'>
            <span>访问AWS定制专区,阅读更多私房书单与文章</span>
          </div>
        </div> -->


        <div class='tips'>
          <div class='tipsTitle'>
            <div class='author_line'></div>
            <div class='tipsTitlespan'>阅读须知</div>
            <div class='author_line'></div>
          </div>

          <span>1.本系列共{{articleinfo.length}}篇文章，剩余内容将逐步上线;</span>
          <div>
            <span>2.在阅读过程中，如有任何问题，请</span>
            <span id='jumpToFeedback' @click='jumpToFeedback'>联系客服</span>
          </div>

        </div>
      </div>
      <div v-if='!isHaveArticle' class='none'>
        暂无文章
      </div>


    </div>


    <div v-if='!isArticle'>
      <div class='course' v-if='isHaveCoruse'>
        <div v-for='item in courseinfo' :key='item.course_id'>
          <div class='S-list' @click='jumpToCourse(item.course_id)' :data-course_id='item.course_id'>
            <div class='s_listCon'>
              <div>

                <div class='s_listCourseInfo'>
                  <span>{{item.course_name}}</span>
                  <span class='s_listCourseSynopsis'>{{item.course_desc}}</span>
                  <!-- <div class='s_listCourseName'>
              <template is="wxParse" data="{{wxParseData:item.course_name.nodes}}" />
            </div>
            <div class='s_listCourseSynopsis'>
              <template is="wxParse" data="{{wxParseData:item.course_desc.nodes}}" />
            </div> -->
                </div>

              </div>
              <div class='S-listImg'>
                <img :src='item.course_pic'>
              </div>
            </div>
            <!-- <div class='s_listArticle'>
                <span class='s_listArticleId'>第{{item.article_id}}讲</span> -->
            <!-- <span class='s_listArticleName'>伟大的建筑</span> -->
            <!-- <template is="wxParse" data="{{wxParseData:item.article_name.nodes}}"/>
              </div> -->
            <div class='s_listPriceGroup'>
              <div class='boutique_priceItem'>
                <div class='boutique_priceItem'>
                  <span class='s_listPrice'>￥{{item.course_money}}</span>
                  <span class='s_listPrice'>/</span>
                </div>
                <span class='s_listPrice'>{{item.coursenum}}讲</span>
                <span class='s_listPriceGroupspan paddingLeft'>{{item.updatetime}}</span>
              </div>
              <span class='s_listPriceGroupspan color'>{{item.coursebuynum}}人购买</span>
            </div>
          </div>
        </div>
      </div>


      <div v-if='!isHaveCoruse' class='none'>
        暂无课程
      </div>
    </div>


  </div>
</template>

<script>
  import {getAuthorInfo} from '../api/index'

  export default {
    name: "author",
    data() {
      return {
        isArticle: true,//是否优先显示精品单文
        authorinfo: '',//作者信息
        articleinfo: [],//文章信息
        courseinfo: '',//课程信息
        isHaveArticle: null,//是否含有精品单文
        isHaveCoruse: null,//是否含有系列课程
      }
    },
    created() {
      //获取上层路由传递的数据（author_id）
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
        this.author_id = routerParams;
        console.log(this.author_id);
        //根据作者id查询作者信息
        this.getAuthorInfoRequest();
      },
      //切换精品单文与系列课程
      switchMode(event) {
        console.log(event);
        let productionMode = event.target.dataset.id;
        if (productionMode === 'article') {
          this.isArticle = true
        } else {
          this.isArticle = false
        }
        // console.log(this.data.isArticle)
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
      // 跳转到课程相应列表页面
      jumpToCourse(id) {
        console.log(id);
        this.$router.push(
          {
            path: '/list',
            name: 'list',
            params: {
              name: 'course_id',
              dataobj: id,
            }
          }
        )
      },
      //跳转到用户反馈页面
      jumpToFeedback() {

      },
      // 跳转到作者详情页面
      jumpToAuthorDesc(id) {
        console.log(id);
        this.$router.push({
          path: '/authorDesc',
          name: 'authorDesc',
          params: {
            author_id: id,
            author_name: this.authorinfo.author_name,
            author_desc: this.authorinfo.author_desc,
            author_intro: this.authorinfo.author_intro,
            author_pic: this.authorinfo.author_pic,
            remark:this.authorinfo.remark
          }
        })
      },
      //根据作者id查询作者信息接口
      getAuthorInfoRequest() {
        getAuthorInfo({author_id: this.author_id})
          .then(res => {
            console.log('---------作者信息-----------');
            console.log(res)
            if (res.status === 200 && res.data) {
              if (res.data.articleinfo.length == '0' && res.data.courseinfo.length == '0') {
                this.isHaveArticle = false;
                this.isHaveCoruse = false;
                this.authorinfo = res.data.authorinfo;
                console.log('-----------全部都没有----------')
              } else if (res.data.articleinfo.length == '0') {

                this.isArticle = false;
                this.isHaveArticle = false;
                this.isHaveCoruse = true;
                this.courseinfo = res.data.courseinfo;
                this.authorinfo = res.data.authorinfo;

                console.log('-----------没有单文----------')
              } else if (res.data.courseinfo.length == '0') {

                this.isHaveArticle = true;
                this.isHaveCoruse = false;
                this.articleinfo = res.data.articleinfo;
                this.authorinfo = res.data.authorinfo;


                for (let i = 0; i < res.data.articleinfo.length; i++) {

                  if (res.data.articleinfo[i].article_price == '0.00') {

                    this.articleinfo[i].isFree = true

                  } else {

                    this.articleinfo[i].isFree = false

                  }
                }

                // console.log(that.data.articleinfo)
                console.log('-----------没有课程----------')
              } else {

                this.isHaveArticle = true;
                this.isHaveCoruse = true;
                this.articleinfo = res.data.articleinfo;
                this.courseinfo = res.data.courseinfo;
                this.authorinfo = res.data.authorinfo;

                // var i = 0
                // var isFree = 'articleinfo[' + i + '].isFree';
                for (let i = 0; i < res.data.articleinfo.length; i++) {

                  if (res.data.articleinfo[i].article_price == '0.00') {

                    this.articleinfo[i].isFree = true

                  } else {
                    this.articleinfo[i].isFree = false


                  }
                }

                // console.log(that.data.articleinfo)
                console.log('-----------全部都有----------')
              }
            }
          })
          .catch(res => {
            console.log('出错啦')
          })

      }
    },

  }
</script>

<style scoped>
  /* pages/author/author.wxss */

  /* 作者信息 */

  .background {
    background-color: #fff;
  }

  .authorInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0 60px 30px;
  }

  .author {
    display: flex;
    flex-direction: row;
  }

  .authorImg {
    width: 140px;
    height: 140px;
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }

  .authorImg img {
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .authorspan {
    display: flex;
    flex-direction: column;
    padding-left: 30px;
  }

  .authorName {
    font-size: 36px;
    padding-bottom: 20px;
  }

  .authorIntroduce {
    font-size: 24px;
    color: #afafaf;
  }

  .checkMore {
    width: 15px;
    height: 28px;
    padding-right: 40px;
  }

  /* 导航栏 */

  .nav {
    padding: 0 30px;
    display: flex;
    flex-direction: row;
  }

  .navspan {
    display: flex;
    border: 1px solid #d2d2d2;
    width: 345px;
    height: 84px;
    font-size: 34px;
    align-items: center;
    justify-content: center;
  }

  .active {
    display: flex;
    border: 1px solid #7ebbf4;
    width: 345px;
    height: 84px;
    font-size: 34px;
    align-items: center;
    justify-content: center;
    background-color: #7ebbf4;
    color: #fff;
    /* border: none; */
  }

  /* 精品单文 */
  .article {
    background-color: #f5f5f5;
    padding-top: 56px;
    padding-bottom: 66px;
  }

  .articleItem {
    position: relative;
    /* width: 100%; */
    margin: 0 auto 78px auto;
    width: 690px;
  }

  .articleItemCon {
    background-color: #fff;
    padding-top: 1px;
    border-radius: 10px;
  }

  .articleOrder {
    width: 270px;
    height: 64px;
    margin: -13px auto 0 auto;
  }

  .articleOrder img {
    width: 270px;
    height: 64px;
    position: absolute;
    /* position: absolute; */
  }

  .articleOrder span {
    display: inline-block;
    text-align: center;
    width: 100%;
    height: 64px;
    color: #fff;
    font-size: 42px;
    position: relative;
    z-index: 2;
  }

  .articleName {
    font-size: 34px;
    padding: 30px;
    font-weight: bold;
    line-height: 36px;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .articleimg {
    /* margin: 0 auto; */
    width: 100%;
    height: 278px;
    position: relative;
  }

  .articleimgBack {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    width: 100%;
    height: 100%;
  }

  .articleimgBoutique {
    width: 29px;
    height: 50px;
    position: absolute;
    padding-left: 20px;
    top: 0;
    left: 0;
  }

  .articlePriceBox {
    position: absolute;
    bottom: 0;
    right: 0;
    /* width: 232px; */
    height: 88px;
    background: rgba(0, 0, 0, 1);
    opacity: 0.5;
    padding-left: 24 prx;
    padding-right: 24px;
    display: flex;
    align-items: center;
  }

  .articlePrice {
    color: #f86161;
    font-size: 48px;
  }

  .originalPrice {
    float: right;
    font-size: 24px;
    color: #fff;
    text-decoration: line-through;
    padding-top: 22px;
    padding-left: 14px;
  }

  .articleCon {
    padding: 0 40px 30px 28px;
    display: -webkit-box;
    font-size: 24px;
    color: #666;
    line-height: 36px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .read {
    width: 260px;
    height: 74px;
    border: 1px solid #e9a130;
    background-color: #fff;
    color: #fd9606;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto 0 auto;
  }

  .author_clickBox {
    /* padding: 20px; */
    width: 100%;
  }

  .author_clickBoximg {
    width: 34px;
    height: 30px;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }

  .author_clickBoximg img {
    width: 34px;
    height: 30px;
  }

  .author_click {
    background-color: #ff9801;
    width: 688px;
    height: 74px;
    border: 1px solid #ed9b21;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px auto 76px auto;
  }

  .author_click img {
    width: 46px;
    height: 53px;
  }

  .author_click span {
    color: #fff;
    padding-left: 20px;
  }

  .tips {
    width: 690px;
    /* height: 286px; */
    background-color: #fff6e4;
    margin: 0 auto;
    padding: 40px;
    box-sizing: border-box;
  }

  .tipsTitle {
    display: flex;
    flex-direction: row;
    height: 48px;
    justify-content: space-between;
    align-items: center;
    line-height: 48px;
  }

  .author_line {
    width: 188px;
    height: 2px;
    background: rgba(255, 216, 154, 1);
  }

  .tipsTitlespan {
    background-color: #FF9900;
    color: #FFF6E4;
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    width: 172px;
    height: 48px;
  }

  .tips span {
    line-height: 36px;
    font-size: 24px;
    color: #666;
    /* display: block; */
  }

  .none {
    font-size: 28px;
    color: #888;
    text-align: center;
    height: 400px;
    line-height: 400px;
  }

  /* 系列课程 */

  .course {
    background-color: #f5f5f5;
  }

  .S-list {
    background-color: #fff;
    margin-bottom: 20px;
    /*padding: 38px 36px 20px 24px;*/
  }

  .s_listCon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 35px 30px 30px 30px;
    border-bottom: 1px solid #EAEAEA;
  }

  .s_listTeacherInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    /* width: 470px; */
    padding: 66px 0 30px 0;
    /* border-bottom: 1px solid #e8e8e8; */
  }

  .s_listTeacherImg {
    width: 56px;
    height: 56px;
    /* border: 1px solid #ff5d0a; */
    border-radius: 50%;
  }

  .s_listTeacherImg img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  .s_listTeacherCon {
    display: flex;
    flex-direction: row;
    padding-left: 20px;
    display: -webkit-box;
    line-height: 36px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .s_listTeacherCon img {
    width: 1px;
    height: 20px;
    padding: 0 20px;
  }

  .s_listTeacherName {
    font-size: 26px;
  }

  .s_listTeacherPosition {
    font-size: 22px;
    color: #AFAFAF;
  }

  .s_listCourseInfo {
    display: flex;
    flex-direction: column;
    padding-top: 26px;
  }

  .s_listCourseName {
    font-size: 30px;
    color: #333;
  }

  .s_listCourseSynopsis {
    font-size: 24px;
    color: #777;
    padding-top: 27px;
    display: -webkit-box;
    line-height: 36px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .S-listImg {
    padding-top: 90px;
    width: 146px;
    height: 146px;
  }

  .S-listImg img {
    width: 146px;
    height: 146px;
  }

  .s_listPriceGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 30px;
  }

  .s_listPriceGroupspan {
    color: #AFAFAF;
    font-size: 20px;
  }

  .paddingLeft {
    padding-left: 30px;
  }

  .color {
    color: #F86161;
  }

  .boutique_priceItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 30px;
  }

  .s_listPrice {
    color: #F86161;
    font-size: 26px;
  }

  .s_listPriceGroup {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 30px;
  }

  .s_listPriceGroupspan {
    color: #AFAFAF;
    font-size: 20px;
  }

  .color {
    color: #F86161;
  }

  .boutique_priceItem {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 30px;
  }

  .s_listPrice {
    color: #F86161;
    font-size: 26px;
  }

  .search_none {
    color: #888;
    font-size: 30px;
    text-align: center;
    padding-top: 100px;
  }

  #jumpToFeedback {
    font-weight: bold;
    color: #7EBBF4;
  }
</style>
