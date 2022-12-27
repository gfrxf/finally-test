<template>
    <div class="DetailCt">
      <div class="topDiv">详细信息
        <!-- <img class="back_home" @click="backHome" src="//yun.duiba.com.cn/polaris/close.6096642d7897de46ebdbf325b7285f4eaf15b339.png" alt=""> -->
      </div> 
      <!-- 头像展示区域 -->
      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
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
      <el-select class="selectCss" v-model="ruleForm.region" placeholder="性别">
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
      <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="goToEvent">事项</el-button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'DetailCt',
    data() {
        return {
          ruleForm: {
            name: '赵六',
            address:"湖南省长沙市",
            region: '1886726389',
            email:"1212332",
            QQ:"32242",
            WeiXin:"3424",
            postalCode:"34324234",
            phoneNumber:"344343434",
            date1: '2022-03-04', // 出生日期
            imageUrl:"https://yun.duiba.com.cn/polaris/close.6096642d7897de46ebdbf325b7285f4eaf15b339.png",
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
    async created(){
      await this.getUserInfo()
    },
    methods: {
        // 表单提交
        async submitForm(formName) {
          // await this.submitDialogData()
          console.log(this.tartImg)
          // this.ruleForm = {...this.ruleForm,ctImg:this.tartImg}
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let params=this.ruleForm
              let url='/addContact'
              this.$axios.post(url,params).then(res =>{
                console.log('请求成功')
                console.log(res)
              }).catch(error =>{
                console.log('请求失败')
                console.log(error )
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 请求数据
        async getUserInfo(){
          const { data: res } = await this.$axios.get('/userInfo/detailCt', {
            ctId:this.$router.params.ctId
          })
          this.ruleForm.name = res.data.ctName
          this.ruleForm.address = res.data.ctAd 
          this.ruleForm.postalCode = res.data.ctyb
          this.ruleForm.QQ = res.data.ctQq
          this.ruleForm.WeiXin = res.data.ctWx
          this.ruleForm.email = res.data.ctEm
          this.ruleForm.sex = res.data.ctMf
          this.ruleForm.date1 = res.data.ctBirth
          this.ruleForm.phoneNumber = res.data.ctPhone
          this.ruleForm.imageUrl = res.data.ctImg
        },
        // 表单预校验
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
  
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
          console.log(this.imageUrl)
        },
  
        backHome(){
          console.log(111)
          this.$router.push('/home')
        },
        goToEvent(){
          this.$router.push('/')
        }
  
   },
    components: {
    
    },
  }
  </script>
  
  <style lang="less" scoped >
  @import url(../App.less);
  .DetailCt{
      width: 500px;
      height: 720px;
      background-color:@detailCtBg;
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
        background-color: @detailCtTop;
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
  