<template>
  <div class="login">
    <div class="loginBg" ref="loginBg">
      <ul>
        <li v-show="BgShow">
          <img src="../../../images/bg/normal0447fe9.png" alt="">
        </li>
        <li v-show="UserBg">
          <img src="../../../images/bg/greeting1415c1c.png" alt="">
        </li>
        <li class="PassImg" v-show="PassBg">
          <img src="../../../images/bg/blindfold58ce423.png" alt="">
        </li>
      </ul>
    </div>
    <el-tabs stretch v-model="activeName" type="card" >
      <el-tab-pane label="登录" name="first">
        <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name" >
            <el-input @focus="UserImg" v-model="ruleForm1.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input @focus="PassImg" type="password" v-model="ruleForm1.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm1')">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="name">
            <el-input @focus="UserImg" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input @focus="PassImg" type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input @focus="PassImg" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="registerForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
        BgShow: true,
        UserBg: false,
        PassBg: false,
        ruleForm1: {
          pass: '',
          name: ''
        },
        ruleForm: {
          pass: '',
          name: '',
          checkPass:''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 6 到 16 个字符', trigger: 'blur' }
          ],
          pass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        },
        activeName: 'first'
      };
    },
    methods: {
      UserImg(){
        this.UserBg = true;
        this.BgShow = false;
        this.PassBg = false;
      },
      PassImg(){
        this.UserBg = false;
        this.BgShow = false;
        this.PassBg = true;
      },
      //登录
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const salt = 'sandianyu';
            this.$http.post('/login',{
              name:this.ruleForm1.name,
              pass:this.md5(this.ruleForm1.pass+salt,32),
            }).then(res=>{
              let msg = res.data.msg;
              if (res.data.errno===0) { //登录失败
                this.$message.error(msg);
                return
              }
              //登录成功
              this.$message({
                message: '恭喜你，登录成功',
                type: 'success'
              });
              this.$emit('change','1');
              let data = res.data.user;
              this.$router.push('/');
              this.$store.dispatch('saveuserInfo')
              this.$store.dispatch('savePersonal')
              this.$refs[formName].resetFields();
            })
          } else {
            return false;
          }
        });
      },
      // 注册
      registerForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // alert('submit!');
            const salt = 'sandianyu';
            // console.log(this.md5(this.ruleForm.pass+salt,32));
            this.$http.post('/register',{
              name:this.ruleForm.name,
              pass:this.md5(this.ruleForm.pass+salt,32),
              checkPass:this.md5(this.ruleForm.checkPass+salt,32)
            }).then(res=>{
              if (res.data.errno===0) { //注册失败
                this.$message.error('用户已存在，请重新注册');
                return
              }
              //注册成功
              this.$message({
                message: '恭喜你，注册成功',
                type: 'success'
              });
              this.$router.push('/');
              this.$store.commit('saveLoginUser',this.ruleForm.name)
              this.$store.dispatch('saveuserInfo')
              this.$store.dispatch('savePersonal')
              this.$refs[formName].resetFields();
            })
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>
  button{
    outline: none;
  }
  .login{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 350px;
    height: 340px;
    margin: auto;
    background-color: white;
    box-shadow: 0 0 2px #999;
    border-radius: 5px;
  }
  .loginBg{
    position: absolute;
    top: 0;
  }
  .loginBg ul li img{
    position: absolute;
    z-index: 20;
    top: -105px;
    left: 101px;
    width: 160px;
    height: 140px;
  }
  .demo-ruleForm{
    margin: 20px 42px 0 5px;
  }
</style>
