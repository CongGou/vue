const express = require("express");
const Article = require("../Schema/article");
const comments = require("../Schema/comments");


let router = express.Router();
//所有文章访问
router.post('/',(req,res)=>{
  let _id = req.body.articleId
  if (_id){
    Article.findById(_id).populate("author")
      .then(data=>{
        if (data) {
              res.send({errno:1 ,data})
        }
      })
  }

});
router.post('/comments',(req,res)=>{
  let _id = req.body.articleId
  if (_id){
    comments.find({article:_id}).populate("author")
      .then(data=>{
        if (data) {
          res.send({errno:1,data})
        }else {
          res.send({errno:0,data})
        }
      })
  }
});
module.exports = router;
