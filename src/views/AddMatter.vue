<template>
    <div class="AddMatter">
      <div class="topDiv">联系人事项添加
        <!-- <img class="back_home" @click="backHome" src="//yun.duiba.com.cn/polaris/close.6096642d7897de46ebdbf325b7285f4eaf15b339.png" alt=""> -->
      </div> 
      <!-- 头像上传区域 -->
    <img :src="ruleForm.imageUrl" class="avatar">
      <!-- 表单区域 -->
      <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item  class="selectCssBox" label="日期" required>
        <el-form-item prop="date1">
          <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 180px"></el-date-picker>
        </el-form-item>
    </el-form-item>
    <el-form-item label="事件" prop="phoneNumber">
      <el-input v-model="ruleForm.phoneNumber" placeholder="事件"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">添加事项</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
    </div>
  </template>
  
  <script>
  
  
  export default {
    name: 'AddMatter',
    data() {
        return {
          ruleForm: {
            phoneNumber:"",
            date1: '', // 出生日期
            imageUrl:"https://yun.duiba.com.cn/polaris/lQLPJyF0jznlPWzMyMzIsFHp1wjauc7pA6YD8T9ASQA_200_200.png_720x720g.2bf6c336cad1e016669b358ce5d2f3320324b198.jpg",
          },
          
          rules: {
            phoneNumber:[
              { required: true, message: '请输入电话号码', trigger: 'blur' },
            ],
            date1: [
              { required: true,type: 'date', message: '请选择日期', trigger: 'blur' }
            ],
          }
        }
    },
    methods: {
        // 表单提交
        async submitForm(formName) {
          /**
          if(this.ruleForm.date1 == ""){
            this.$message.error('请选择日期')
            return
          }
          if(this.ruleForm.phoneNumber == ""){
            this.$message.error('请输入事项')
            return
          }
           */
          try{
            const { data: res } = await this.$axios.post('/userInfo/listContracts', {
              matterTime: this.ruleForm.date1,
              matter: this.ruleForm.phoneNumber,
              ctId:this.$route.params?.ctId
            })
            if (res.code !== 200) return this.$message.error('添加失败')
            this.$message.success('添加成功')
          }catch(e){
            console.log(e)
          } 
        },
        // 表单预校验
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
  
        backHome(){
          console.log(111)
          this.$router.push('/home')
        },
  
   },
    components: {
    
    },
  }
  </script>
  
  <style lang="less" scoped >
  @import url(../App.less);
  .AddMatter{
      width: 500px;
      height: 420px;
      background-color:@addMatterBg;
      margin: auto;
    .avatar {
      width: 150px;
      height: 150px;
      display: block;
      margin: 20px auto;
    }
      .el-form-item{
        text-align: left !important;
      }
      .uploadAvatar{
        margin-bottom: 15px;
      }
      .topDiv{
        width: 500px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: @addMatterTop;
        margin-bottom: 20px;
        position: relative;
        .back_home{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 10px;
        top: 5px;
    }
      }
      .selectCssBox{
        margin-left: 0;
        .el-form-item--small{
           margin-bottom: 0px;
        }
      }
      .el-form-item--small{
        margin-bottom: 15px;
      }
      .selectCss{
        width: 180px;
      }
      .el-input{
        width: 300px;
        // text-align: left;
      }
  }
  </style>
  