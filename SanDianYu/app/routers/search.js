const article = require("../Schema/article");

module.exports = (req,res)=>{
  if(!req.session.userinfo){
    return res.send({errno:0,msg:"登录失败，请重新登录"})
  }

  // let _id = req.session.userinfo._id;
  //关键词组成条件
  let keyword = req.body.keyword;
  let conditions = {};
  if ( keyword ){
    let reg = new RegExp(keyword);
    conditions = {
      $or:[
        {title:reg},
        {label:reg},
        {content:reg}
      ]
    }
  }

  //开始查找
  article.find(conditions).populate('author')
    .then(data=>{
      if ( data.length ){
        res.send({errno:1,data});
      } else{
        res.send({errno:0,msg:"没有超找到相关数据"})
      }
    })
    .catch(e=>{
      res.send({errno:0,msg:"服务器异常~请稍后再试~"})
    });
};
