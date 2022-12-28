<template>
  <div class="addNewCt">
    <div class="topDiv">添加联系人
      <!-- <img class="back_home" @click="backHome" src="//yun.duiba.com.cn/polaris/close.6096642d7897de46ebdbf325b7285f4eaf15b339.png" alt=""> -->
    </div> 
    <!-- 头像上传区域 -->
    <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        >
        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <!-- 表单区域 -->
    <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名" prop="name">
    <el-input class="inputLength" v-model="ruleForm.name" placeholder="姓名"></el-input>
  </el-form-item>
  <el-form-item label="地址" prop="address">
    <el-input v-model="ruleForm.address" placeholder="地址"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="ruleForm.email" placeholder="邮箱"></el-input>
  </el-form-item>
  <el-form-item label="QQ" prop="QQ">
    <el-input v-model="ruleForm.QQ" placeholder="QQ"></el-input>
  </el-form-item>
  <el-form-item label="微信" prop="WeiXin">
    <el-input v-model="ruleForm.WeiXin" placeholder="微信"></el-input>
  </el-form-item>
  <el-form-item label="邮编" prop="postalCode">
    <el-input v-model="ruleForm.postalCode" placeholder="邮编"></el-input>
  </el-form-item>
  <el-form-item class="selectCssBox" label="性别" prop="sex">
    <el-select class="selectCss" v-model="ruleForm.sex" placeholder="性别">
      <el-option label="男" value="男"></el-option>
      <el-option label="女" value="女"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item  class="selectCssBox" label="生日" required>
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 180px"></el-date-picker>
      </el-form-item>
  </el-form-item>
  <el-form-item label="电话" prop="phoneNumber">
    <el-input v-model="ruleForm.phoneNumber" placeholder="电话"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
  </div>
</template>

<script>


export default {
  name: 'AddNewCt',
  data() {
      return {
        ruleForm: {
          name: '',
          address:"",
          sex: '',
          email:"",
          QQ:"",
          WeiXin:"",
          postalCode:"",
          phoneNumber:"",
          date1: '', // 出生日期
          imageUrl:"",
        },
        
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          address:[
            { message: '请输入地址', trigger: 'blur' },
          ],
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ],
          QQ:[
            { message: '请输入QQ号', trigger: 'blur' },
          ],
          WeiXin:[
            { message: '请输入微信号', trigger: 'blur' },
          ],
          postalCode:[
            { message: '请输入邮编', trigger: 'blur' },
            { min: 6, max: 6, message: '长度应为6个字符', trigger: 'blur' }
          ],
          sex:[
            {message: '请选择性别', trigger: 'change' },
          ],
          phoneNumber:[
            { required: true, message: '请输入电话号码', trigger: 'blur' },
          ],
          date1: [
            { type: 'date', message: '请选择日期', trigger: 'change' }
          ],
        }
      }
  },
  methods: {
      // 表单提交
      async submitForm(formName) {
        try{
        const { data: res } = await this.$axios.post('/userInfo/addNewCt', {
          ctName: this.ruleForm.name,
          ctAd: this.ruleForm.address,
          ctyb: this.ruleForm.postalCode,
          ctQq: this.ruleForm.QQ,
          ctWx: this.ruleForm.WeiXin,
          ctEm: this.ruleForm.email,
          ctMf: this.ruleForm.sex,
          ctBirth: this.ruleForm.date1,
          ctPhone: this.ruleForm.phoneNumber,
          ctImg:this.ruleForm.imageUrl
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

      handleAvatarSuccess(res, file) {
        console.log(res)
        this.ruleForm.imageUrl = res.data
        
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
.addNewCt{
    width: 500px;
    height: 720px;
    background-color:@addNewCtBg;
    margin: auto;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
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
      background-color: @addNewCtTop;
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
