<template>

  <div class='background'>


    <div v-for="item in authorinfo" :key='item.author_id'>
      <div class='S-list' @click='jumpToAuthor(item.author_id)' :author_id='item.author_id'>
        <div class='s_listCon'>
          <div>
            <div class='s_listTeacherInfo'>
              <div class='s_listTeacherImg'>
                <img :src='item.author_pic'>
              </div>
              <div>
                <div class='s_listTeacherCon'>
                  <span class='s_listTeacherName'>{{item.author_name}}</span>
                  <img src="../../static/img/allAuthor_line.png">
                  <span class='s_listTeacherPosition'>{{item.author_desc}}</span>

                </div>
                <div class='s_authorInfo'>{{item.author_intro}}</div>
                <div class='labelBox'>
                  <div v-for='itm in item.sign'>
                    <span class='label' :label='itm'>{{itm}}</span>
                    <!-- <span class='label' catchtap='jumpToSearchLabel' data-label='{{item}}'>{{item}}</span>               -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!--tabbar-->
    <div class="tabbar">
      <router-link to="/index" class="tabbarItem">
        <img src="../../static/img/index.png">
        <p>首页</p>
      </router-link>
      <router-link to="/allAuthor" class="tabbarItem is-active">
        <img src="../../static/img/courseHover.png">
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
  import {getAllAuthorInfo} from '../api/index'

  export default {
    name: "allAuthor",
    data() {
      return {
        authorinfo: [],//作者信息
      }
    },
    created() {
      //获取全部作者信息
      getAllAuthorInfo()
        .then(res => {
          console.log('----------全部作者信息-----------');
          console.log(res);
          if (res.status === 200 && res.data && res.data.authorinfo) {
            this.authorinfo = res.data.authorinfo
          }
        })
        .catch(res => {
          console.log('出错啦')
        })

    },
    methods: {
      //跳转到相应作者页面
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
      }
    },

  }
</script>

<style scoped>
  /* pages/allAuthor/allAuthor.wxss */

  .background {
    padding-bottom: 98px;
    background-color: #f5f5f5;

  }

  .search_list {
    height: 1000px;
    /* overflow:hidden;white-space:nowrap; */
  }

  .S-list {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 30px 30px 10px 30px;
  }

  .s_listCon {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .s_listTeacherInfo {
    display: flex;
    flex-direction: row;
  }

  .s_listTeacherImg {
    width: 140px;
    height: 140px;
    border-radius: 10px;
    float: left;
    margin-right: 30px;
    overflow: hidden;
    max-width: 100%;
    max-height: 100%;
    position: relative;
  }

  .s_listTeacherImg img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .s_listTeacherCon {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .s_listTeacherCon img{
    width: 1px;/*px*/
    height: 20px;/*px*/
    padding: 0 20px;
  }
  .s_listTeacherName {
    font-size: 36px;
  }

  .s_listTeacherPosition {
    font-size: 24px;
    color: #999;
  }

  .labelBox{
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    margin-left:-10px;
    /* white-space: nowrap; */
    /* word-break: break-all; */
    flex-wrap: wrap;
    /* margin-bottom: 10rpx; */
  }
  .label{
    font-size: 24px;
    color: #333;
    background-color: #F8F8F8;
    /* width: 100rpx; */
    padding: 20px 50px;
    margin:0 10px;
    /* height: 40rpx; */
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }


  /* .s_listCourseInfo{
    display: flex;
    flex-direction: column;
    padding-top: 26px;
  }
  .s_listCourseName{
    font-size:30px;
    color:#333;
  }
  .s_listCourseSynopsis{
    font-size: 22px;
    color: #888;
  } */

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

  .S-listImg {
    width: 182px;
    height: 174px;
  }

  .S-listImg img {
    width: 182px;
    height: 174px;
  }

  /* .s_listArticle{
    padding-top: 28px;
    display: flex;
    flex-direction: row;
  }
  .s_listArticleId{
    font-size: 26px;
    color: #888;
  }
  .s_listArticleName{
    font-size: 26px;
    color: #888;
    padding-left: 10px;
  } */

  .underline {
    background-color: #ddd;
    height: 2px;
    width: 22px;
    margin-top: 28px;
    margin-bottom: 18px;
  }

  /*
  .s_listPriceGroup{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .s_listPriceGroupText{
    color: #888;
    font-size: 22px;
  }
  .s_listPrice{
    color: #ff5a05;
  }


  .search_none{
    color: #888;
    font-size: 30px;
    text-align: center;
    padding-top: 100px;
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

</style>
