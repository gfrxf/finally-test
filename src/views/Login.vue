<template>
  <div class="login">
    <h3 class="title">联系人在线管理系统</h3>
    <div class="box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item  prop="account">
          <div class="account">
            <i class="el-icon-user" ></i>
            <el-input v-model="ruleForm.account" placeholder="请输入内容"></el-input>
          </div>
        </el-form-item>
        <el-form-item prop="pass">
          <div class="password">
            <i class="el-icon-edit"></i>
            <el-input
              placeholder="请输入密码"
              v-model="ruleForm.pass"
              show-password
            ></el-input>
          </div>
        </el-form-item>
      </el-form>

      <div class="logbtn">
        <el-button class="lbtn" size="mediun" type="primary">登录</el-button>
        <!-- <el-button class="lbtn" size="mediun" type="success">登录</el-button> -->
        <!-- <el-button class="lbtn" size="mediun" type="info">登录</el-button> -->
        <!-- <el-button class="lbtn" size="mediun" type="warning">登录</el-button> -->
        <!-- <el-button class="lbtn" size="mediun" type="danger">登录</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    let validateAccount = (rule,value,callback) =>{
        if(value === ''){
          return callback(new Error('账号不能为空'));
        }
      }
      let validatePass = (rule,value,callback) =>{
        if(value === ''){
          return callback(new Error('密码不能为空'));
        }
      }
    return {
     
      ruleForm: {
        account: "",
        pass: "",
      },
      rules:{
        account:[{ validator: validateAccount, trigger: 'blur' }],
        pass:[{ validator: validatePass, trigger: 'blur' }]
      },
     
    };
  },
};
</script>

<style lang="less" scoped>
.login {
  border: 1px solid #000;
  width: 500px;
  height: 400px;
  margin: 0 auto;
  border-radius: 15px;
  text-align: center;
  margin-top: 300px;
  .title {
    color: rgb(48, 141, 206);
    font-weight: 700;
    margin-top: 15px;
  }
  .box {
    margin-top: 50px;

    .account {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .el-icon-user{
        margin-right: 10px;
      }
     
    }
    .account /deep/ .el-form-item__error{
        margin-left: 16px !important; 
      }
    .password {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .el-icon-edit{
        margin-right: 10px;
      }
    }
    .logbtn {
      width: 100%;
      margin-top: 30px;
      .lbtn {
        width: 30%;
      }
    }
  }
}
</style>
