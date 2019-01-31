<template>
  <!--pages/AllCourse/AllCourse.wxml-->
  <div class='background'>


    <div v-for="item in courseinfo" :key='item.course_id'>
      <div class='S-list' @click='jumpToArticle(item.course_id)' :courseid='item.course_id'>
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
            <div class='s_listTeacherInfo'>
              <div class='s_listTeacherImg'>
                <img :src='item.author_pic'>
              </div>
              <div class='s_listTeacherCon'>
                <!-- <div class='s_listTeacherName'>
                <template is="wxParse" data="{{wxParseData:item.author_name.nodes}}" />
              </div>
              <div class='s_listTeacherPosition'>
                <template is="wxParse" data="{{wxParseData:item.author_desc.nodes}}" />
              </div> -->
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
        <!-- <div class='s_listArticle'>
                <span class='s_listArticleId'>第{{item.article_id}}讲</span> -->
        <!-- <span class='s_listArticleName'>伟大的建筑</span> -->
        <!-- <template is="wxParse" data="{{wxParseData:item.article_name.nodes}}"/>
              </div> -->
        <div class='s_listPriceGroup'>
          <div class='boutique_priceItem'>
            <div  class='boutique_priceItem'>
              <span class='s_listPrice'>￥{{item.course_money}}</span>
              <span class='s_listPrice'>/</span>
            </div>
            <span class='s_listPrice'>{{item.coursenum}}讲</span>
            <span class='s_listPriceGroupspan paddingLeft' >{{item.updatetime}}</span>
          </div>
          <span class='s_listPriceGroupspan color'>{{item.coursebuynum}}人购买</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import {getAllCourseInfo} from '../api/index'

  export default {
    name: "allCourse",
    data() {
      return {
        courseinfo: []//课程信息
      }
    },
    created() {
      //获取全部课程信息
      getAllCourseInfo()
        .then(res => {
          console.log('-----------全部课程信息-----------');
          console.log(res);
          if (res.status === 200 && res.data && res.data.courseinfo) {
            this.courseinfo = res.data.courseinfo
          }
        })
        .catch(res => {
          console.log('出错啦')
        });

    },
    methods: {
      //跳转到相应课程页面
      jumpToArticle(id){
        console.log(id);
        this.$router.push(
          {
            path:'/list',
            name:'list',
            params:{
              name:'course_id',
              dataobj: id
            }
          }
        )
      }
    },

  }
</script>

<style scoped>
  /* pages/AllCourse/AllCourse.wxss */

  .background{
    background-color: #f5f5f5;
  }

  .search_list {
    height: 1000px;
    /* overflow:hidden;white-space:nowrap; */
  }

  .S-list {
    background-color: #fff;
    margin-bottom: 20px;
    /*padding: 38px 36px 20px 24px;*/
  }

  .s_listCon{
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
    padding:66px 0 30px 0;
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

  .s_listTeacherCon{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
    display: -webkit-box;
    line-height: 36px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .s_listTeacherCon img{
    width: 1px; /*px*/
    height: 20px;/*px*/
    padding: 0 20px;
  }
  .s_listTeacherName{
    font-size: 26px;/*px*/
  }
  .s_listTeacherPosition{
    font-size: 22px;/*px*/
    color: #AFAFAF;
  }

  .s_listCourseInfo{
    display: flex;
    flex-direction: column;
    padding-top: 26px;
  }
  .s_listCourseName{
    font-size:30px;
    color:#333;
  }
  .s_listCourseSynopsis{
    font-size: 24px;
    color: #777;
    padding-top: 27px;
    display: -webkit-box;
    line-height: 36px;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp:2;
    overflow: hidden;
    text-overflow:ellipsis;
  }

  .S-listImg{
    padding-top: 90px;
    width: 146px;
    height: 146px;
  }
  .S-listImg img{
    width: 146px;
    height: 146px;
  }



  .s_listPriceGroup{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    padding: 0 30px;
  }
  .s_listPriceGroupspan{
    color: #AFAFAF;
    font-size: 20px;
  }
  .paddingLeft{
    padding-left: 30px;
  }
  .color{
    color: #F86161;
  }
  .boutique_priceItem{
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 30px;
  }
  .s_listPrice{
    color: #F86161;
    font-size: 26px;
  }

  .search_none {
    color: #888;
    font-size: 30px;
    text-align: center;
    padding-top: 100px;
  }
</style>
