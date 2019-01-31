<template>
  <div>
    <div class='authorDescBox'>
      <img src='../../static/img/mine_background.png' class='authorBackground' >
      <div class='authorDesc'>
        <div class="authorimg">
        <img :src='authorinfo.author_pic'></div>
        <!-- <div class='authorInfoDesc'> -->
        <span class='bold'>{{authorinfo.author_desc}} - {{authorinfo.author_name}}</span>
        <!-- </div> -->
      </div>
    </div>
    <div class='authorInfoBox'>
      <div v-html="authorinfo.remark"></div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "authorDesc",
      data(){
          return{
            authorinfo: {
              author_desc: "建谈负责人",
              author_id: 10,
              author_intro: "建谈负责人",
              author_name: "谈小建",
              author_openid: null,
              author_pic: "https://www.51jiantan.com/static/image/zhangming.png",
              author_unionid: null,
              is_recommend: 0,
              is_show: 0,
              sign: "平台，数据，BIM"
            }
          }
      },
      created(){
        //获取路由带来得参数
        this.getParams();
      },
      watch: {
        // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
        // '$route': 'getParams'
        '$route'(){
          this.getParams()
        }
      },
      methods:{
        //获取路由带来得参数
        getParams() {
          console.log(this.$route.params);
          // 取到路由带过来的参数
          let routerParams = this.$route.params;
          // 将数据放在当前组件的数据内
          this.authorinfo = routerParams;
          console.log(this.authorinfo)
        },
      },

    }
</script>

<style scoped>
  /* pages/sub_browse/pages/authorDesc/authorDesc.wxss */

  .authorDescBox {
    width: 100%;
    /* height: 240px; */
    position: relative;
    /* overflow: hidden; */
  }

  .authorBackground {
    height: 175px;
    width: 100%;
  }

  /* .authorDescBox img {
    width: 100% !important;
    z-index: 3;
    position: absolute;
  } */



  .authorDesc {
    position: absolute;
    /* left: 50%;
    transform: translateX(-50%); */
    top: 0;
    /* bottom: 0; */
    /* z-index: 2; */
    width: 100%;
    display: flex;
    z-index: 4;
    flex-direction: column;
    padding-top: 98px;
    padding-bottom: 30px;
    justify-content: center;
    text-align: center;
  }

  .authorimg{
    width: 132px;
    height: 132px;
    border: 4px solid #fff;
    margin: 0 auto;
    border-radius: 50%;
    max-width: 100%;
    max-height: 100%;
    position: relative;
    overflow: hidden;
  }

  .authorimg img {
    position: absolute;
    /*top: 50%;*/
    transform: translateX(-50%);
  }

  .authorDesc span {
    color: #333333;
    font-size: 34px;
    padding-top: 20px;
  }

  .bold {
    font-weight: bold;
    padding-bottom: 20px;
  }

  .authorInfoBox {
    padding: 183px 52px 126px 40px;
  }

  .authorInfo {
    padding-bottom: 90px;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 34px !important;
    font-weight: bold !important;
    color: #333 !important;
    padding-bottom: 32px;
  }

  .authorInfo span {
    line-height: 42px;
    color: #666;
    font-size: 28px;
  }

  .courseInfo {
    display: flex;
    flex-direction: column;
  }

  .courseInfospan{
    display: flex;
    flex-direction: row;
  }

  .courseInfospan img{
    width: 28px;
    height: 28px;
    padding-right: 20px;
    padding-top: 6px;
  }

  .courseInfo span {
    width: 640px;
    line-height: 42px;
    color: #666;
    font-size: 28px;
    padding-bottom: 50px;
  }

</style>
