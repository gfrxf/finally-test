<template>
  <div class="home">
    <div class="title">联系人列表</div>
    <div class="content">
      <img class="con-ing" src="../assets/nhlt.jpg" alt="" />
      <div class="city">
        <span>{{ city }}</span>
        <!-- <button class="change-city">[更换城市]</button> -->
        <el-button class="change-city" size="mediun" type="primary"
          >[更换城市]</el-button
        >
      </div>
      <div class="weatherbox">
        <div id="he-plugin-standard"></div>
      </div>
    </div>
    <div class="searchcontent">
      <el-input
        v-model="input"
        class="serchinput"
        placeholder="搜索"
      ></el-input>
      <i class="el-icon-search" size="medium"></i>
      <el-select v-model="value" class="select" placeholder="全部">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <i
        class="el-icon-circle-plus-outline"
        @click="$router.push({ path: '/addmatter' })"
      ></i>
      <i
        class="el-icon-remove-outline"
        @click="toPageAddMatter"
      ></i>
      <i class="el-icon-setting" @click="this.$router.push({ path: '/warn',query:{ctid} })"></i>
    </div>
    <div class="tablecontent">
      <i class="el-icon-top"></i>
      <i class="el-icon-bottom"></i>
      
      <el-table :data="tableData" border style="width: 100%">
       
        <el-table-column fixed prop="name"  label="姓名" width="168">
        
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="150"> </el-table-column>
        <el-table-column prop="phone" label="电话" width="180">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >屏蔽</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination small layout="prev, pager, next" :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      city: "北京",
      input: "",
      options: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "男",
        },
        {
          value: "选项3",
          label: "女",
        },
      ],
      value: "",
      tableData: [
        {
          name: "王小虎",
          sex: "男",
          phone: "17754545",
        },
        {
          name: "王小虎",
          sex: "男",
          phone: "17754545",
        },
        {
          name: "王小虎",
          sex: "男",
          phone: "17754545",
        },
      ],
      ctid:1524
    };
  },
  methods: {
    toPageAddMatter() {
      // console.log(this.ctid);
     this.$router.push({
      path:'about',
      query:{
        ctid:this.ctid
      }
     })
    },
    async contactList(){
      console.log("concat");
      try {
        const {data:res} = await this.$axios.get('/userInfo/listContracts',{
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          words:this.words
        })
        if(res.code != 200) return this.$message.error('请求失败')
        this.$message.success("请求成功")
        console.log(res);

      }catch(e){
        console.log(e);
      }
    },

  },
  created() {

    //和风天气插件调用
    window.WIDGET = {
      CONFIG: {
        layout: "1",
        width: 570,
        height: 150,
        background: "1",
        dataColor: "FFFFFF",
        borderRadius: "5",
        key: "bb8b0567ae4b467d864e0aa4a4cfbd9c",
      },
    };
    (function (d) {
      var c = d.createElement("link");
      c.rel = "stylesheet";
      c.href =
        "https://widget.heweather.net/simple/static/css/he-simple.css?v=1.4.0";
      var s = d.createElement("script");
      s.src =
        "https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      var sn = d.getElementsByTagName("script")[0];
      sn.parentNode.insertBefore(c, sn);
      sn.parentNode.insertBefore(s, sn);
    })(document);
   
  },
  mounted(){
    this.contactList()
    console.log("home组件渲染");
  },
//  created(){
//  let cookie = document.cookie = window.sessionStorage.getItem("Cookie")
//   console.log(cookie);
//  }
 
 
};
</script>

<style lang="less" scoped>
@import url(../App.less);
.home {
  width: 800px;
  margin: 0 auto;
  // text-align: center;
  position: relative;
  border: 1px solid @homeViewTop;
  .title {
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
  .content {
    margin-top: 80px;
    display: flex;
    align-items: center;
    .con-ing {
      // width: 10px;
      // height: 10px;
      width: 80px;
      height: 80px;

      border-radius: 50%;
      margin: 10px;
    }
    .city {
      display: flex;
      flex-direction: column;

      .change-city {
        font-size: 12px;
        margin-top: 10px;
        margin-left: 10px;
      }
    }
    .weatherbox {
      margin-left: 25px;
    }
  }
  .searchcontent {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 20px;

    .serchinput {
      width: 150px;
      margin-right: -10px;
    }
    .el-icon-search {
      // width: 30px;
      // height: 30px;
    }
    .select {
      width: 100px;
    }
  }
  .tablecontent {
    position: relative;
    margin-top: 40px;
    // .name{
    //   position: relative;

    // }
    .el-icon-top{
      width: 15px;
      height: 15px;
      position: absolute;
      z-index: 99;
      left: 10%;
      top: 2%;
    }
    .el-icon-bottom{
      width: 15px;
      height: 15px;
      position: absolute;
      z-index: 99;
      left: 10%;
      top: 13%;
    }
  }
  .pagination{
    margin-top: 40px;
  }
}
</style>
