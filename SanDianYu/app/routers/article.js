const express = require("express");
const article = require("../Schema/article");

let router = express.Router();



//发表文章
router.post('/',(req,res)=>{
  if(!req.session.userinfo){
    return res.send({errno:0,msg:"登陆过期，请重新登录。"})
  }
  let {title,content,label,reading,getLike} = req.body;

  if(!(title&&content)){
    return res.send({errno:0,msg:"格式错误11"});
  }
  article.create({
    title
    ,label
    ,reading
    ,getLike
    ,content
    ,author: req.session.userinfo._id
  }).then((data)=>{
    if ( data ){
      res.send({errno:1,msg:"文章发表成功"});
    } else{
      res.send({errno:0,msg:"服务器异常~请稍后重试~"});
    }
  }).catch(e=>{
    res.send({errno:0,msg:"服务器异常~请稍后重试~"});
  });
});

module.exports = router;
