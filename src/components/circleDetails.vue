<template>
  <div>
    <div class="circle_info_box">
      <div class="circle_img">
        <img src="../../static/img/jiuer.jpg" alt="">
      </div>
      <div class="circle_info">
        <span class="circle_name">建筑产业工业互联网</span>
        <div class="circle_author">
          <span>圈主：小地瓜</span>
          <span>创建 490天</span>
        </div>
        <div class="circle_label">
          <span>BIM</span>
        </div>
      </div>
    </div>

    <div class="circle_intro_box">
      <div class="circle_intro_title">
        <span>圈子介绍</span>
        <img src="../../static/img/circleDetails_down.png" alt="">
      </div>
      <span class="circle_intro">加快Bim技术的推广与应用，对建筑业每个项目的所有参建方用三维仿真的形式表现出来，加快所有资源的整合,，加快所有资源的整合，加快所有资源的整合</span>
    </div>

    <div class="circle_nav">
      <div class="nav_item">
        <div>主题</div>
        <div class="nav_line"></div>
      </div>
      <div class="nav_item">
        <div>精华</div>
        <span>2</span>
        <div class="nav_line"></div>
      </div>
    </div>

    <div class="circle_subject">
      <div class="subject_item" v-for="subjectInfo">
        <div class="subject_title">
          <img :src="item.headimg" alt="">
          <div class="">
            <span>{{item.name}}</span>
            <span>圈主</span>
          </div>
        </div>
        <div>
          <span></span>
          <div>
            <img src="" alt="">
          </div>
        </div>
      </div>

      <div class='circle_item'>
        <div class='item_author' @click='toSubjectDetails'>
          <img :src='subjectInfo.headimg'/>
          <div class='author_con'>
            <div class='author_content'>
              <div class='author_box'>
                <span class='author_name'>{{subjectInfo.name}}</span>
                <span v-if='subjectInfo.is_circleMaster == 1' class='author_master'>圈主</span>
              </div>
              <span class='author_time'>{{subjectInfo.publish_time}}</span>
            </div>
          </div>
        </div>
        <div class='circle_content'>
          <span style='width:100%;display:block;' @click='toSubjectDetails'>{{subjectInfo.theme_content}}</span>
          <div class='imgBox' @click='toSubjectDetails'>
            <div v-for='subjectInfo.theme_img'>
              <img :src='item.pic_url' />
            </div>
          </div>

        </div>

      </div>
</template>

<script>
  export default {
    name: "circleDetails",
    data() {
      return {
        subjectInfo: {}
      }
    }
  }
</script>

<style scoped lang="less">
  @iphone6: 750px;
  body {
    color: #242831;
    font-size: 30px;
  }

  //圈子信息
  .circle_info_box {
    display: flex;
    flex-direction: row;
    background: url("../../static/img/circleDetails_back.png") no-repeat;
    color: #ffffff;
    padding: 50px 30px 90px 30px;
  }

  .circle_img {
    width: 180px;
    height: 180px;
    position: relative;
    img {
      width: 100%;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }

  }

  .circle_info {
    margin-left: 40px;
  }

  .circle_name {
    font-size: 36px;
    line-height: 36px;
  }

  .circle_author {
    margin-top: 20px;
    font-size: 20px;
    span {
      padding-right: 30px;
    }
  }

  .circle_label {
    margin-top: 30px;
    span {
      padding: 5px 20px;
      background-color: #1FA0FA;
      margin-bottom: 10px;
      margin-right: 10px;
    }
  }

  //圈子介绍
  .circle_intro_box {
    background-color: #ffffff;
    border-radius: 44px 44px 0 0;
    margin-top: -40px;
    padding: 40px 30px;
    font-size: 30px;

  }

  .circle_intro_title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    span {
      font-weight: bold;
    }
    img {
      width: 18px;
      height: 18px;
    }
  }

  .circle_intro {
    color: #656565;
    font-size: 24px;
    margin-top: 30px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 34px;

  }

  //圈子导航
  .circle_nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #E8E7E8;
    font-size: 30px;
  }

  .nav_item {
    height: 88px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    div {
      font-weight: bold;
    }
    span {
      color: #8F8F8F;
      margin-top: -16px;
      margin-left: 10px;
    }
    .nav_line {
      width: 60px;
      height: 4px;
      background: #F5B83A;
      position: absolute;
      bottom: 0;
    }
  }

</style>
