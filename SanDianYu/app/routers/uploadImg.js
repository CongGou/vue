const multer = require("multer");
const path = require("path");
const user = require("../Schema/user");

//让上传的文件，存储到磁盘
let storage = multer.diskStorage({
  //存储目录，必须先创建好
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname,"../../src/images/upload/photo"));
  },
  //保存的文件名
  filename: function (req, file, cb) {
    if ( req.session.userinfo ){
      let fileName = req.session.userinfo._id + file.originalname.match(/\.[^\.]+$/g)[0];
      req.fileName =fileName;
      cb(null, fileName);
    }else{
      cb(null, file.fieldname + '-' + Date.now());
    }
  }
});

let upload = multer({
  storage: storage //代表存储到硬盘而不是内存
  ,fileFilter(req, file, cb){
    cb(null,/\.(jpg|png)$/.test(file.originalname));
  }
  ,limits : {
    fileSize : 1024*600 //限制文件大小600k
  }
}).single("file");


//头像上传
module.exports=(req,res)=>{
  let _id = req.session.userinfo._id
  //运行与错误的监听
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.send({error:0,msg:"上传失败"});
    }else{
      user.updateOne(
        {_id:_id}
        ,{"photo":req.fileName}
      ).catch(e=>{});
      res.send({error:1,msg:"上传成功"});
    }
  });
};
