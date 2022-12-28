<template>
  <div class="warn">
    <div class="title">联系人事项提醒</div>
    <div class="searchcontent">
      <el-input
        v-model="input"
        class="serchinput"
        placeholder="搜索"
      ></el-input>
      <i class="el-icon-search" size="medium" @click="sexClick"></i>
      <i class="el-icon-circle-plus-outline" @click="handleClick"></i>
      <el-select v-model="value" class="select" placeholder="待完成" @change="sexClick">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- <i class="el-icon-circle-plus-outline"></i>
      <i class="el-icon-remove-outline"></i>
      <i class="el-icon-setting"></i> -->
    </div>
    <div class="tablecontent">
      <i class="el-icon-top" @click="sortTop"></i>
      <i class="el-icon-bottom" @click="sortBottom"></i>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column fixed prop="name" label="姓名" width="158">
        </el-table-column>
        <el-table-column prop="matterTime" label="时间" width="160"> </el-table-column>
        <el-table-column prop="matter" label="事件" width="180">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick1(scope.row)" type="text" size="small"
              >取消</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleClick2(scope.row)" type="text" size="small"
              >完成</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination small layout="prev, pager, next" :total="totalCount" background="" @current-change="handleCurrentChange" :current-page="pageNum" :page-size="pageSize"  >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: "北京",
      input: "",
      options: [
        {
          value: "0",
          label: "待完成",
        },
        {
          value: "1",
          label: "已取消",
        },
        {
          value: "2",
          label: "已完成",
        },
      ],
      value: "",
      tableData: [],
      pageNum:0,
      pageSize:10,
     
      ctId:0
    };
  },
  methods:{
    sortTop(){
      this.tableData = this.compare(this.tableData,"name")
      console.log(this.tableData)
    },
    sortBottom(){
      this.tableData = this.compare(this.tableData,"name").reverse()
    },
    compare(arr,key){
      return arr.sort(function(a,b){
        let value1 = (a[key].substr(0,1)).charCodeAt()
        let value2 = (b[key].substr(0,1)).charCodeAt()
        return value1 - value2
      })
    },
    // 取消按钮
    async handleClick1(e) {
      let type = 0 // 0代表屏蔽，ctid用户id
      await this.pingbi(type, e.matterId)
      await this.contactList()
    },
     // 男女筛选
     async sexClick(){
      await this.contactList()
    },
    //完成按钮
    async handleClick2(e) {
      // console.log(e);
      let type = 1 // 1代表wancheng，ctid用户id
      await this.pingbi(type, e.matterId)
      await this.contactList()
    },
     // 屏蔽还原接口
     async pingbi(type,id){
      try {
        const { data: res } = await this.$axios.get("/matter/operation", {
          params: {
            type	: type,
            matterId: id,
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    // 分页切换
    async handleCurrentChange(val){
      // console.log(val);
      this.pageNum = val
      await this.contactList()
    },
    handleClick(e){
     this.$router.push({path:'/addmatter',query:{
      ctId:this.ctId,
      picName:this.$route.query?.picName
     }})
    },
        // 联系人事项提醒接口
        async contactList() {
      // console.log("concat");
      console.log(this.pageNum, this.pageSize, "concat");
      try {
        const { data: res } = await this.$axios.get("/matter/matter", {
          params: {
            pageNum: this.pageNum,
            pageSize: this.pageSize,
            ctId: this.ctId,
            type:this.value,
            words:this.input
          },
        });
        if (res.code != 200) return this.$message.error("请求失败");
        // this.$message.success("请求成功");
        console.log(res.data);
        this.tableData = res.data.records;
        this.totalCount = res.data.total
        // console.log(this.tableData,'table');
      } catch (e) {
        console.log(e);
      }
    },
  },
  created(){
 this.ctId = this.$route.query.ctId
  },
  async mounted() {
    await this.contactList();
  },
};
</script>

<style lang="less" scoped>
@import url(../App.less);
.warn {
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
  .searchcontent {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 60px;

    .serchinput {
      width: 250px;
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
    margin-top: 40px;
    position: relative;
    .el-icon-top {
      width: 15px;
      height: 15px;
      position: absolute;
      z-index: 99;
      left: 10%;
      top: 2%;
    }
    .el-icon-bottom {
      width: 15px;
      height: 15px;
      position: absolute;
      z-index: 99;
      left: 10%;
      top: 13%;
    }
  }
  .pagination {
    margin-top: 40px;
  }
}
</style>
