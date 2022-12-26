<template>
  <div class="home">
    <div class="title">
      联系人列表
    </div>
    <div class="content">
      <img class="con-ing" src="../assets/nhlt.jpg" alt="">
      <div class="city">
        <span>{{ city }}</span>
        <button class="change-city">[更换城市]</button>
        
      </div>
      <div class="weatherbox">
        <div id="he-plugin-standard"></div>
        </div>
       
    </div>
  </div>
</template>

<script>


export default {
  name: 'HomeView',
  components: {
  
  },
  data(){
    return{
      city:"北京"
    }
  },
  created(){
    //和风天气插件调用
    window.WIDGET = {
      "CONFIG": {
    "layout": "1",
    "width": 570,
    "height": 150,
    "background": "1",
    "dataColor": "FFFFFF",
    "borderRadius": "5",
    "key": "bb8b0567ae4b467d864e0aa4a4cfbd9c"
  }
    };
    (function (d) {
      var c = d.createElement('link');
      c.rel = 'stylesheet';
      c.href = 'https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0';
      var s = d.createElement('script');
      s.src = "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      var sn = d.getElementsByTagName('script')[0];
      sn.parentNode.insertBefore(c, sn);
      sn.parentNode.insertBefore(s, sn);
    })(document);
  },
}
</script>

<style lang="less" scoped >
@import url(../App.less);
.home{
  width: 800px;
  margin: 0 auto;
  // text-align: center;
  position: relative;
  border: 1px solid @homeViewTop;
  .title{
    width: 800px;
    height: 50px;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%);
 
    background-color: @homeViewTop;
    line-height: 50px;
    color: #fff;
  }
  .content{
    margin-top: 50px;
    display: flex;
    align-items: center;
    .con-ing{
      // width: 10px;
      // height: 10px;
      width: 80px;
      height: 80px;
     
      border-radius: 50%;
      margin: 10px;
    }
    .city{
      display: flex;
      flex-direction: column;

      .change-city{
        width: 80px;
        height: 30px;
        font-size: 12px;
        margin-top: 10px;
        margin-left: 10px
        ;
      }
    }
    .weatherbox{
      margin-left: 20px;
    }
  }
}
</style>
