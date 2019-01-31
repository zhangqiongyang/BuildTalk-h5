<template>
  <div class="background">
    <!-- 作者信息 -->
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


    <!-- 新闻列表 -->
    <div class='news'>
      <div class='listNav'>
        <div class='navContent'>
          <div class='navListOrder' @click='changeOrder'>
            <!-- <div class='navListOrderImgBox'>
              <div class='navListOrderImg'>
              </div>
            </div> -->
            <img class='navListOrderImg' src='../../static/img/list_order.png'>

            <span class='navListOrderspan' v-if='order==0' data-order="1">倒序</span>
            <span class='navListOrderspan' v-if='order==1' data-order="0">正序</span>
          </div>
          <span class='navContentspan'>已更新{{authorinfo.countupdate}}讲</span>
        </div>
      </div>
      <div class='newsList'>
        <div v-for='item in newsinfo'>
          <div class='newsItem' :data-article_id='item.article_id' @click='jumpToArticle(item.article_id,item.course_id)'>
            <!-- <div class='newsTitle'> -->
            <span class='newsTitle'>{{item.article_title}}</span>
            <!-- </div> -->
            <div class='newsInfo'>
              <div class='newsDesc'>
                <div class='newsImageBox'>
                  <img src='../../static/img/allNewsTime.png'>
                  <span>{{item.publish_time}}</span>
                </div>
                <div class='newsImageBox'>
                  <img src='../../static/img/allNewsEye.png'>
                  <span>{{item.browsecount}}人学过</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>


  </div>
</template>

<script>
  import {getAllNewsInfo} from '../api/index'

  export default {
    name: "allNews",
    data() {
      return {
        order: 0,
        authorinfo: {
          author_pic: "https://www.51jiantan.com/static/image/zhangming.png",
          author_name: "谈小建",
          author_desc: "建谈负责人",
          author_id: 88
        },
        newsinfo:[]
      }
    },
    created() {
      this.changeOrderRequest()
    },
    methods: {
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

      // 跳转到文章页面
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

      changeOrder(event){
        // console.log(event);
        let order = event.target.dataset.order;
        this.order=order;
        this.changeOrderRequest()
      },
      //获取全部新闻信息接口
      changeOrderRequest(){
        console.log(this.order);
        getAllNewsInfo({order_sort:this.order})
          .then(res => {
            console.log('-----------全部新闻信息------------');
            console.log(res);
            if (res.status === 200 && res.data && res.data.newsinfo) {
              this.newsinfo = res.data.newsinfo;
              this.authorinfo = res.data.authorinfo
            }
          })
          .catch(res => {
            console.log('出错了')
          });
      }
    },

  }
</script>

<style scoped>
  /* pages/sub_browse/pages/allNews/allNews.wxss */

  .background {
    background-color: #F5F5F5;
  }

  /* 作者信息 */

  .authorInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 40px 0 60px 30px;
    border-bottom: 1px solid #CCCCCC;
    background-color: #fff;
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

  /* 新闻列表 */

  .news {
    /*background-color: #f7f7f7;*/
  }

  .listNav {
    /* padding: 20px 34px 20px 22px; */
    display: flex;
    /* flex-direction: row; */
    justify-content: space-between;
    align-items: center;
    /* overflow: hidden; */
    line-height: 26px;
    height: 80px;
    background-color: #fff;
  }

  .listNav span {
    font-size: 24px;
  }

  .navContent {
    display: flex;
    flex-direction: row;
    height: 100%;
    align-items: center;
  }

  .navListOrder {
    display: flex;
    flex-direction: row;
    justify-content: center;
    /* position: relative; */
    width: 144px;
    height: 100%;
    align-items: center;
  }

  /* .navListOrderImgBox{
    height: 100%;
    display: flex;
    align-items: center;
  } */
  .navListOrderImg {
    width: 23px;
    height: 23px;
    padding-right: 13px;
  }

  .navContentspan {
    color: #999;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 12px;
  }

  .newsQuarter {
    border-bottom: 1px solid #CCCCCC;
  }

  .newsTitleBox {
    padding: 27px 30px 30px 22px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

  }

  .newsTitleLeft {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .newsTitleLeft img {
    width: 38px;
    height: 38px;
  }

  .newsBigTitle {
    padding-left: 10px;
    color: #333333;
    font-size: 34px;
  }

  .newsAlreadyUpdated {
    display: flex;
    align-items: center;
    padding-left: 22px;
    padding-top: 6px;
  }

  .newsAlreadyUpdated span {
    font-size: 24px;
    color: #999999;
  }

  .color {
    color: #FF5D5D !important;
  }

  .newsTitleMore {
    width: 28px;
    height: 15px;
  }

  .newsList {
    background-color: #Fff;
    /* border-radius: 10px; */
    width: 100%;
    margin: 20px auto 0 auto;
    /* border: 1px solid #CCCCCC; */
  }

  .newsItem {
    border-bottom: 1px solid #EAEAEA;
    max-height:99999px;
  }

  .newsTitle {
    padding: 30px 20px 20px 20px;
    font-size: 34px;
    display: block;
  }

  .newsTitlespan {
    padding-left: 28px;
  }

  /* .newsItem text {
    font-size: 28px;
    color: #050400;
  } */

  .newsInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .newsDesc {
    padding-left: 20px;
    padding-bottom: 28px;
    /* padding-top: 34px; */
    line-height: 22px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .newsDesc span {
    font-size: 22px;
    line-height: 22px;
    color: #666;
    padding-right: 4px;
  }

  .newsImageBox {
    padding-right: 30px;
  }

  .newsImageBox img {
    width: 22px;
    height: 22px;
    padding-right: 10px;
  }

  .newsDesc text {
    font-size: 22px;
    line-height: 22px;
    color: #666;
    padding-right: 4px;
  }

  .imageBox {
    width: 270px;
    height: 94px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-right: 20px;
  }

  .imageBox img {
    width: 40px;
    height: 40px;
  }

  .imageItem {
    flex: 1;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .imageItem span {
    padding-left: 6px;
  }

  button::after {
    border: none;
  }

  button {
    background-color: #fff;
    border-radius: none;
    position: none;
    padding: 0;
  }

  .button-hover {
    color: rgb(0, 0, 0);
    background-color: #fff;
  }

</style>
