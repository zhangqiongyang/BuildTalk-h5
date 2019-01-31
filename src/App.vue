<template>
  <div id="app">
    <keep-alive>
      <router-view/>

    </keep-alive>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-family: PingFang-SC-Regular;
  }

  img{
    width: 100%;
  }



  #app {
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    max-width: 750px;
    /*background-color: #de1e25;*/
    /*height: 2000px;*/
    margin: 0 auto;
    /*background-color: #f5f5f5;*/
  }
</style>
