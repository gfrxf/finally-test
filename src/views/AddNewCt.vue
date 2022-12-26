<template>
  <div class="addNewCt">
    <div class="topDiv">这是AddNewCt</div> 
  </div>
</template>

<script>


export default {
  name: 'AddNewCt',
  components: {
  
  }
}
</script>

<style lang="less" scoped >
@import url(../App.less);
.addNewCt{
    width: 500px;
    height: 500px;
    background-color:antiquewhite;
    .topDiv{
      width: 500px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: @addNewCtTop;
    }
}
</style>
