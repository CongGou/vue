<template>
  <div class="userCenter">
    <div>
      <b-tabs content-class="mt-3" fill>
        <b-tab title="个人资料" active no-nav-style>
          <ul class="list-items">
            <li class="portrait">
              <span>头像</span>
              <img :src="require(`@/images/upload/photo/${this.$store.state.PersonalData.photo}`) " alt="">
              <el-upload
                class="upload-demo"
                action="/api/uploadImg"
                multiple
                :limit="1">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </li>
            <li class="item">
              <span>用户名</span>
              <span style="display: inline-block;width: 200px; margin-left: 20px;color: #999">{{this.$store.state.loginUser}}</span>
            </li>
            <li class="item">
              <span>职位</span>
              <span class="item-content" v-show="ConOff" style="margin-left: 32px">{{this.ruleForm.position}}</span>
              <el-form  style="margin-left: 32px" :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm Input">
                <el-form-item prop="position">
                  <el-input v-model="ruleForm.position" placeholder="请填写您的职位"></el-input>
                </el-form-item>
              </el-form>
            </li>
            <li class="item">
              <span>个人介绍</span>
              <span class="item-content" v-show="ConOff">{{this.ruleForm.introduce}}</span>
              <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm Input">
                <el-form-item prop="introduce">
                  <el-input v-model="ruleForm.introduce" placeholder="请填写您的介绍"></el-input>
                </el-form-item>
              </el-form>
            </li>
            <li class="item">
              <span>个人签名</span>
              <span class="item-content" v-show="ConOff">{{this.ruleForm.signature}}</span>
              <el-form  :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm Input">
                <el-form-item prop="signature">
                  <el-input v-model="ruleForm.signature" placeholder="请填写您的个性姓名"></el-input>
                </el-form-item>
              </el-form>
            </li>
          </ul>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm InputSubmit">
            <el-form-item>
              <el-button style="outline: none;" type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
            </el-form-item>
          </el-form>
        </b-tab>
        <b-tab title="修改密码">
          <ul class="list-items passItem">
            <li class="item">
              <span>原密码</span>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm passInput">
                <el-form-item  prop="oldPass">
                  <el-input class="Input" type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            </li>
            <li class="item">
              <span>新密码</span>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm passInput">
                <el-form-item  prop="pass">
                  <el-input class="Input" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            </li>
            <li class="item">
              <span>确认密码</span>
              <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm passInput">
                <el-form-item prop="checkPass">
                  <el-input class="Input" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
              </el-form>
            </li>
          </ul>
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm InputSubmit">
            <el-form-item>
              <el-button class="passBtn" type="primary" @click="submitForm2('ruleForm')">立即修改</el-button>
            </el-form-item>
          </el-form>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ConOff: false,
        ruleForm: {
          //修改资料
          position: '',
          introduce: '',
          signature: '',
          //修改密码
          oldPass: '',
          pass: '',
          checkPass: '',
        },
        rules: {
          //修改资料
          position: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
          ],
          introduce: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
          ],
          signature: [
            { required: true, message: '请输入内容', trigger: 'blur' },
            { min: 1, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
          ],
          //修改密码
          oldPass: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      //修改个人资料
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid){
            if (
              this.ruleForm.position === '' &&
              this.ruleForm.introduce === '' &&
              this.ruleForm.signature === ''
            ){
              this.$message.error('内容不能为空，请先编辑')
            }else {
              this.$http.post('/personalData',{
                position:this.ruleForm.position,
                introduce:this.ruleForm.introduce,
                signature:this.ruleForm.signature
              }).then(res=>{
                if (res.data.errno === 1) {
                  this.$message.success(res.data.msg)
                }else {
                  this.$message.error(res.data.msg)
                }
              });
            }

          }
        })
      },
      //修改密码
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const salt = 'sandianyu';
            this.$http.post('/resetpwd',{
              oldPass: this.md5(this.ruleForm.oldPass+salt,32),
              newPass: this.md5(this.ruleForm.pass+salt,32),
              checkPass: this.md5(this.ruleForm.checkPass+salt,32)
            }).then(res =>{
              if (res.data.errno === 1 ){
                this.$message.success(res.data.msg);
                this.ruleForm.oldPass = '';
                this.ruleForm.pass = '';
                this.ruleForm.checkPass = '';
              }else {
                this.$message.error(res.data.msg)
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    },
    created(){
      this.$store.dispatch('savePersonal').then(()=>{
        let {position,introduce,signature} = this.$store.state.PersonalData
        this.ruleForm.position = position;
        this.ruleForm.introduce = introduce;
        this.ruleForm.signature = signature;
      })
    }
  }
</script>

<style scoped>
  .userCenter{
    position: relative;
    max-width: 700px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: white;
  }
  .list-items{
    width: 100%;
    height: 625px;
    padding: 24px 48px;
  }
  .list-items li span{
    margin-right: 100px;
  }
  .portrait{
    position: relative;
    width: 100%;
    height: 97px;
    line-height: 97px;
    border-top: 1px solid #E6EAED;
    border-bottom: 1px solid #E6EAED;
  }
  .portrait img{
    width: 72px;
    height: 72px;
    margin-right: 50px;
    margin-left: 30px;
  }
  .item{
    width: 100%;
    height: 69px;
    line-height: 69px;
    border-bottom: 1px solid #E6EAED;
  }
  .Input{
    display: inline-block;width: 400px
  }
  .InputSubmit{
    position: absolute;
    right: 90px;
    bottom: 100px;
  }
  .passItem{
    height: 300px !important;
  }
  .passInput{
    position: relative;
    top: -56px;
  }
  .passBtn{
    position: absolute;
    bottom: -110px;
    right: 5px;
    outline: none;
    margin-right: 60px;
  }
  /*上传图片*/
  .upload-demo{
    position: absolute;
    width: 250px;
    display: inline-block;
    height: 97px;
  }
  button{
    outline: none;
  }
  .el-upload__tip{
    position: absolute;
    height: 35px;
    top: -35px;
  }
</style>
