<template>

  <!-- 引入模板 -->
  <!--<import src="/wxParse/wxParse.wxml" />-->


  <div class='background'>


    <!-- 搜索框 -->
    <div class='search_inputGroup'>
      <div class='search'>
        <input type='text' class='search_input' placeholder='搜索讲师/课程' @keydown.enter.prevent='search(keyword)'
               v-model='keyword'/>
        <img class='search_img' src='../../static/img/search_img.png'>
        <div class='search_clear' @click='clearSearch'>
          <!--<icon type='clear' size='15'></icon>-->
          <img src="../../static/img/search_clear.png">
        </div>
      </div>
      <!-- <span class='search_cancel' @click='jumpBackIndex'>取消</span> -->
    </div>


    <!-- 历史记录 -->
    <div class='search_history' v-if='history'>
      <div v-for='item in searchhistory'>
        <div class='search_historyList'>
          <div class='searchKeyword' :data-search_keyword='item.search_keyword'
               @click='searchKeyword(item.search_keyword)'>
            <img src='../../static/img/search_history.png'>
            <span class='search_historyCon'>{{item.search_keyword}}</span>
          </div>
          <div class='search_historyCal' @click='delHistory(item.search_keyword)' :data-keyword='item.search_keyword'>
            <span>删除</span>
          </div>
        </div>
      </div>
      <div class='search_calAllHistory' v-if='isClearHistory' @click='delAllHistory'>
        <img src='../../static/img/search_calAllHistory.png'>
        <span>清空历史记录</span>
      </div>
    </div>


    <!-- 搜索展示列表 -->
    <div v-else>
      <div v-if='isHaveCourse' class='search_list_scrolldiv'>
        <div v-if='isCourseinfo == "c"'>
          <div v-for="item in courseinfo">
            <div class='S-list' @click='jumpToCourse(item.course_id)' :data-course_id='item.course_id'>
              <div class='s_listCon'>
                <div>
                  <div class='s_listCourseInfo'>
                    <!-- <span>{{item.course_name}}</span> -->
                    <!-- <span class='s_listCourseSynopsis'>{{item.course_desc}}</span> -->
                    <div v-html="item.course_name" class='s_listCourseName'>
                      <!--<template is="wxParse" data="{{wxParseData:item.course_name.nodes}}" />-->
                    </div>
                    <div v-html="item.course_desc" class='s_listCourseSynopsis'>
                      <!--<template is="wxParse" data="{{wxParseData:item.course_desc.nodes}}" />-->
                    </div>
                  </div>
                  <div class='s_listTeacherInfo'>
                    <div class='s_listTeacherImg'>
                      <img :src='item.author_pic'>
                    </div>
                    <div class='s_listTeacherCon'>
                      <div v-html="item.author_name" class='s_listTeacherName'>
                        <!--<template is="wxParse" data="{{wxParseData:item.author_name.nodes}}" />-->
                      </div>
                      <img src="../../static/img/allCourse_line.png"/>
                      <div v-html="item.author_desc" class='s_listTeacherPosition'>
                        <!--<template is="wxParse" data="{{wxParseData:item.author_desc.nodes}}" />-->
                      </div>
                      <!-- <span class='s_listTeacherName'>{{item.author_name}}</span>
                      <span class='s_listTeacherPosition'>{{item.author_name}}</span> -->
                    </div>
                  </div>


                </div>
                <div class='S-listImg'>
                  <img :src='item.coursepic_url'>
                </div>
              </div>
              <!-- <div class='s_listArticle'>
                <span class='s_listArticleId'>第{{item.article_id}}讲</span> -->
              <!-- <span class='s_listArticleName'>伟大的建筑</span> -->
              <!-- <template is="wxParse" data="{{wxParseData:item.article_name.nodes}}"/>
              </div> -->
              <div class='s_listPriceGroup'>
                <!-- <div class='boutique_priceBox'>
                  <span class='boutique_price'>￥{{item.course_money}}</span>
                  <span class='boutique_num'>/</span>
                  <span class='boutique_num'>{{item.coursenum}}讲</span>
                </div> -->
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
        <div v-if='isCourseinfo == "a"'>
          <div v-for="item in articleinfo">
            <div class='S-list' @click='jumpToArticle(item.article_id,item.course_id)' :data-article_id='item.article_id'>
              <div class='s_listCon'>
                <div>
                  <div class='s_listCourseInfo'>
                    <span class='s_listCourseName'>{{item.course_name}}</span>
                    <span class='s_listCourseSynopsis'>{{item.course_desc}}</span>
                    <!-- <template style='font-size:20px;' is="wxParse" data="{{wxParseData:item.course_name.nodes}}"/>
                    <template is="wxParse" data="{{wxParseData:item.course_desc.nodes}}"/> -->
                  </div>
                  <div class='s_listArticle'>
                    <span class='s_listArticleId'>第{{item.article_id}}讲</span>
                    <!-- <span class='s_listArticleName'>伟大的建筑</span> -->
                    <div v-html="item.article_title" class='s_listArticleName'>
                      <!--<template is="wxParse" data="{{wxParseData:item.article_title.nodes}}" />-->
                    </div>
                  </div>
                  <div class='s_listTeacherInfo'>
                    <div class='s_listTeacherImg'>
                      <img :src='item.author_pic'>
                    </div>
                    <div class='s_listTeacherCon'>
                      <!-- <template is="wxParse" data="{{wxParseData:item.author_name.nodes}}"/>
                      <template is="wxParse" data="{{wxParseData:item.author_desc.nodes}}"/> -->
                      <span class='s_listTeacherName'>{{item.author_name}}</span>
                      <img src="../../static/img/allCourse_line.png"/>
                      <span class='s_listTeacherPosition'>{{item.author_desc}}</span>
                    </div>
                  </div>


                </div>
                <div class='S-listImg'>
                  <img :src='item.coursepic_url'>
                </div>
              </div>

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
      </div>
      <div v-if='!isHaveCourse' class='search_none'>没有找到相关课程</div>
    </div>


  </div>
</template>

<script>
  import {selectHistory, searchkeywords, deleteHistory} from '../api/index'
  import { mapState } from 'vuex'


  export default {
    name: "search",
    data() {
      return {
        history: true,
        keyword: '',
        value: '',
        isClearHistory: '',
        searchhistory: '',
        isCourseinfo: '',
        isHaveCourse: null
      }
    },
    // computed: {
    //   wxuserinfo() {
    //     //由于vuex的状态存储是响应式的，所以从store实例中读取状态的最简单方法就是使用计算属性来返回某个状态：
    //     return this.$store.state.wxuserinfo
    //   },
    // },
    created() {
      //查询历史纪录
      this.selectHistoryPort();
    },
    methods: {
      // 将搜索记录的keyword放到输入框中
      searchKeyword(keyword) {
        this.keyword = keyword;
        //调用搜索
        this.search(keyword);
      },
      // 清空搜索输入框内容
      clearSearch() {
        this.keyword = '';
        this.history = true;
        //调用查询历史记录接口
        this.selectHistoryPort();
      },
      //搜索
      search(keyword) {
        this.searchRequest(keyword)
      },
      // 删除历史记录
      delHistory(keyword) {
        console.log(keyword);
        // this.keyword = keyword
        console.log(this.keyword);

        this.delHistoryPort();

        this.selectHistoryPort();

        if (this.searchhistory == '') {
          this.isClearHistory = false
        } else {
          this.isClearHistory = true
        }
      },
      // 清空历史记录
      delAllHistory() {
        this.keyword = '';
        console.log(this.keyword);

        this.delHistoryPort();

        this.selectHistoryPort();

        if (this.searchhistory == '') {
          this.isClearHistory = false
        } else {
          this.isClearHistory = true
        }
      },
      // 删除历史纪录接口
      delHistoryPort() {
        deleteHistory({
          keyword: this.keyword,
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('----------------删除历史纪录成功啦--------------');
            console.log(res)
          })
          .catch(res => {
            console.log('出错啦')
          })
      },
      //跳转到课程相关页面
      jumpToCourse(course_id) {
        console.log(course_id);
          this.$router.push(
            {
              path: '/list',
              name: 'list',
              params: {
                name: 'course_id',
                dataobj: course_id,
              }
            }
          )
      },
      //跳转到文章相关页面
      jumpToArticle(article_id,course_id) {
        console.log(article_id,course_id);
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
      //查询历史纪录
      selectHistoryPort() {
        selectHistory({
          openid: this.$store.state.wxuserinfo.openid,
          unionid: this.$store.state.wxuserinfo.unionid,
          source: 'fwh',
        })
          .then(res => {
            console.log('-------------获取到用户搜索历史记录-------------');
            console.log(res);
            this.searchhistory = res.data.searchhistory;
            if (res.data.searchhistory == '') {
              this.isClearHistory = false
            } else {
              this.isClearHistory = true
            }
          })
          .catch(res => {
            console.log('出错啦')
          })
      },
      //搜索接口
      searchRequest(keyword) {
        // console.log(keyword)
        // 做一步key为空的判断，比如 直接为null/空格/
        if (!this.$utils.isEmpty(keyword)) {
          console.log(keyword);
          //调用搜索接口
          searchkeywords({
            keyword: keyword,
            openid: this.$store.state.wxuserinfo.openid,
            unionid: this.$store.state.wxuserinfo.unionid,
            source: 'fwh',
          })
            .then(res => {
              console.log('-----------搜索出来了-----------');
              console.log(res);
              this.history = false;
              if (res.data.msg == '3') {
                console.log('--------------没有找到搜索数据---------------');
                this.isHaveCourse = false
              } else if (res.data.msg == '0') {
                this.courseinfo = res.data.courseinfo;
                this.isHaveCourse = true;
                this.isCourseinfo = 'c';
              } else if (res.data.msg == '1') {
                this.articleinfo = res.data.articleinfo;
                this.isHaveCourse = true;
                this.isCourseinfo = 'a'
              }

            })
            .catch(res => {
              console.log('出错了')
            })
        } else {
          this.$message.error('搜索内容不能为空')
        }

      },

    },

  }
</script>

<style scoped>
  /* pages/search/search.wxss */

  view {
    overflow: visible;
  }

  .background{
    background-color: #f5f5f5;
  }

  /* 搜索框 */


  .search_inputGroup {
    display: flex;
    height: 88px;
    border-bottom: 1px solid #EAEAEA;
    background-color: #fff;
    align-items: center;
    flex-direction: row;
  }

  .search {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    align-items: center;
  }

  .placeholder {
    font-size: 26px;
    padding-left: 44px;
    color: #424242;
  }

  .search_img {
    top: 50%;
    left: 8%;
    transform: translateY(-50%);
    position: absolute;
    width: 36px;
    height: 36px;
  }

  .search_clear {
    position: absolute;
    right: 3%;
    z-index: 10;
    height: 100%;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search_clear img {
    width: 34px;
    height: 33px;
  }

  .search_input {
    position: absolute;
    background-color: #f5f5f5;
    padding-left: 76px;
    border-radius: 28px;
    box-sizing: border-box;
    font-size: 24px;
    width: 690px;
    height: 68px;
    margin-left: 30px;
  }

  /* .search_cancel {
    flex: 1;
    text-align: center;
    line-height: 88px;
  } */

  /* 历史记录 */

  .search_history {
    background-color: #fff;
    margin-top: 30px;
  }

  .search_historyList {
    border-bottom: 1px solid #EAEAEA;
    height: 88px;
    display: flex;
    align-items: center;
  }

  .searchKeyword {
    width: 646px;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 42px;
  }

  .search_history img {
    width: 22px;
    height: 22px;
  }

  .search_historyCon {
    padding-left: 24px;
    font-size: 26px;
  }

  .search_historyCal {
    flex: 1;
    float: right;
    text-align: center;
    height: 100%;
    display: flex;
    align-items: center;
  }

  .search_historyCal span {
    font-size: 20px;
    color: #999999;
  }

  .search_calAllHistory {
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .search_calAllHistory img {
    padding-right: 10px;
  }

  .search_calAllHistory span {
    color: #AFAFAF;
    font-size: 24px;
  }

  /* 搜索展示列表 */

  .search_list {
    height: 1000px;
    /* overflow:hidden;white-space:nowrap; */
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
    /* width: 470rpx; */
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
    align-items: center;
    /*display: -webkit-box;*/
    /*line-height: 36px;*/
    /*word-break: break-all;*/
    /*-webkit-box-orient: vertical;*/
    /*-webkit-line-clamp: 2;*/
    /*overflow: hidden;*/
    /*text-overflow: ellipsis;*/
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

  .s_listArticle {
    padding-top: 28px;
    display: flex;
    flex-direction: row;
  }

  .s_listArticleId {
    font-size: 26px;
    color: #888;
  }

  .s_listArticleName {
    font-size: 26px;
    color: #888;
    padding-left: 10px;
  }

  .underline {
    background-color: #ddd;
    height: 2px;
    width: 22px;
    margin-top: 28px;
    margin-bottom: 18px;
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

  .search_none {
    color: #888;
    font-size: 30px;
    text-align: center;
    padding-top: 100px;
  }

  .boutique_priceBox {
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
</style>
