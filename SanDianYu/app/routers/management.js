const article = require("../Schema/article");

// 管理文章
module.exports=(req,res)=>{
  if(!req.session.userinfo){
    return res.send({errno:0,msg:"登陆过期，请重新登录。"})
  }
  let _id = req.session.userinfo._id;
  if(req.session.userinfo){
    article.find({author:_id})
      .then(users=>{
      res.send(users)
      })

  }else {
    res.send({
      errno: 0,msg: '登陆过期，请重新登录'
    })
  }
};
