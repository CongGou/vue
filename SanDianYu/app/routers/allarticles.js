const Article = require("../Schema/article");
const comments = require("../Schema/comments");
//所有文章数据
module.exports = (req,res)=>{
  Article.find().populate("author")
    .then(data=>{
      if (data){

          res.send({data})
      }

    })

};
