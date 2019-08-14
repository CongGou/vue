const mongoose = require('mongoose');
//引入node自带的加密模块
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {type:String,required:true},
  pass: {type:String,required:true},
  checkPass: {type:String,required:true},
  position: {type:String,default:'这个人很懒什么都没有'},
  introduce: {type:String,default:'这个人很懒什么都没有'},
  signature: {type:String,default:'这个人很懒什么都没有'},
  photo : {type:String,default: "default.jpg"},
  giveALike: {type:Number,min:0},
  reading:{type:Number,min:0},
  onOff:{type:String,default: true}
});
//密码加密 中间件
userSchema.pre("save",function(next){

  //console.log("我是保存之前的中间件函数");

  //使用node自带的加密模块，对传入的原始密码进行加密
  let newPwd = crypto.createHash('sha256').update( this.pass ).digest("hex");
  let newCheckPass = crypto.createHash('sha256').update( this.checkPass ).digest("hex");
  //console.log(newPwd);
  //替换将要保存的password字段
  this.pass = newPwd;
  this.checkPass = newCheckPass;
  // console.log( this.pass,this.checkPass = newCheckPass);
  next();
});

module.exports = mongoose.model('user',userSchema);
