<template>
  <div class="article">
    <div class="con">
      <el-container>
        <el-main style="background: white; margin-right: 10px">
          <div class="Focus">
            <div class="Img">
              <img :src="require(`@/images/upload/photo/${this.$store.state.ArticleAccess.data.author.photo}`) " alt="">
              <span class="title">{{this.$store.state.ArticleAccess.data.author.name}}</span>
              <span class="date">{{this.$store.state.ArticleAccess.data.date | formatDate}}</span>
              <span class="reading">阅读 {{this.$store.state.ArticleAccess.data.reading}}</span>
            </div>
            <div v-show="Btnshow">
              <el-button class="btn" @click="open" v-if="onOff"  plain>+ 关注</el-button>
              <el-button class="btn focused" @click="open" v-else="onOff" type="success">已关注</el-button>
            </div>
          </div>
          <el-header class="title">
            <h2>{{this.$store.state.ArticleAccess.data.title}}</h2>
          </el-header>
          <el-main>
            <div>
              <p v-html="this.$store.state.ArticleAccess.data.content"></p>
            </div>
          </el-main>
        </el-main>
      </el-container>
    </div>
    <div class="articleLabel">
      <span v-html="this.$store.state.ArticleAccess.data.label"></span>
    </div>
    <div class="con">
      <el-container>
        <el-main style="background: white; margin-right: 10px">
          <el-header class="title comments">
            <h3>评论</h3>
          </el-header>
          <el-main>
            <div>
              <ul>
                <li class="Focus comments-con" v-for="(item,index) in arr" :key="index">
                  <div class="comments-box">
                    <div class="Img comments-img">
                      <img src="../../../../../../../images/bg/bg1.jpg" alt="">
                      <span>{{item.author.name}}</span>
                    </div>
                    <div class="userComments">
                      <p>
                        {{item.content}}
                      </p>
                      <span>{{item.date | formatDate}}</span>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

          </el-main>
        </el-main>
      </el-container>
    </div>

    <div class="articleBtn">
      <div>
        <ul>

          <li @click="goBack"><i class="el-icon-arrow-left"></i></li>
          <li class="giveLike" @click="giveLike" v-if="getLike">
            <el-badge v-model="getLikeNum" class="item" type="info">
            </el-badge>
          </li>
          <li class="giveLike1" @click="giveLike" v-else="getLike">
            <el-badge v-model="getLikeNum" class="item" type="success">
            </el-badge>
          </li>
          <li @click="commentShow">
            <el-badge v-model="commentNum" class="item commentNum" type="info">
            </el-badge>
            <i class="el-icon-s-comment"></i>
          </li>
          <li><i class="el-icon-share"></i></li>
          <li @click="goTop"><i class="el-icon-arrow-up"></i></li>
        </ul>
      </div>
      <div class="comments-text" v-show="show">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
        <div class="commentsButton">
          <el-button type="primary" size="small" @click="onSubmit">立即评论</el-button>
          <el-button type="primary" size="small" @click="commentClose">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/js/date';

  export default {
    data() {
      return {
        textarea:'',
        show: false,
        arr:[],
        Btnshow:true,
        onOff: true,
        getLike:true,
        getLikeNum: '',
        commentNum:''
      };
    },
    created(){
      //关注
      let _id = this.$store.state.ArticleAccess.data.author._id;
      let userId = this.$store.state.userInfo._id;
      if (_id===userId) {
        this.Btnshow = false
      }
      this.$http.post('/focus/findFocus',{
        _id
      }).then(res=>{
        if(res.data.errno === 1){
          this.onOff = !this.onOff;
        }
      });
      //点赞
      let getLikeId = this.$store.state.ArticleAccess.data._id;
      this.$http.post('/getLike/findGetLike',{
        _id:getLikeId
      }).then(res=>{
        if(res.data.errno === 1){
          this.getLike = !this.getLike;
        }
      });
      this.$http.post('/allarticleaccess',{
        articleId:getLikeId
      }).then(res=>{
        if(res.data.errno === 1){
          this.getLikeNum = res.data.data.getLike
        }
      });
      //评论
      let articleId = this.$store.state.ArticleAccess.data._id;
      this.$http.post('/allarticleaccess/comments',{articleId}).then(res=>{
        this.arr = res.data.data;
        this.commentNum = this.arr.length;
      })
    },
    methods:{
      //返回上一步
      goBack(){
        this.$router.go('-1')
      },
      //点赞
      giveLike(){
        let _id = this.$store.state.ArticleAccess.data._id;
        if (this.getLike) {
          this.$http.post('/getLike',{
            _id
          }).then(res=>{
            if(res.data.errno === 0){
              this.$message.error(res.data.msg)
            }else {
              this.$message.success(res.data.msg);
              this.getLike = !this.getLike;
              this.$http.post('/allarticleaccess',{
                articleId:_id
              }).then(res=>{
                if(res.data.errno === 1){
                  this.getLikeNum = res.data.data.getLike
                }
              });
            }
          })
        }else {
          this.$http.post('/getLike/cancelGetLike',{
            _id
          }).then(res=>{
            if(res.data.errno === 0){
              this.$message.error(res.data.msg)
            }else {
              this.$message.success(res.data.msg);
              this.getLike = !this.getLike;
              this.$http.post('/allarticleaccess',{
                articleId:_id
              }).then(res=>{
                if(res.data.errno === 1){
                  this.getLikeNum = res.data.data.getLike
                }
              });
              this.$store.commit('saveFocus',this.onOff)
            }
          })
        }
      },
      //返回顶部
      goTop(){

      },
      //关注
      open() {
        // console.log(this.$store.state.ArticleAccess);
        let _id = this.$store.state.ArticleAccess.data.author._id;
        console.log(_id);
        if (this.onOff) {
          this.$http.post('/focus',{
            _id
          }).then(res=>{
            if(res.data.errno === 0){
              this.$message.error(res.data.msg)
            }else {
              this.$message.success(res.data.msg);
              this.onOff = !this.onOff
              // console.log(this.onOff,1);
              this.$store.commit('saveFocus',this.onOff)
            }
          })
        }else {
          this.$http.post('/focus/cancelFocus',{
            _id
          }).then(res=>{
            if(res.data.errno === 0){
              this.$message.error(res.data.msg)
            }else {
              this.$message.success(res.data.msg);
              this.onOff = !this.onOff
              this.$store.commit('saveFocus',this.onOff)
            }
          })
        }
      },
      //评论输入框
      commentShow(){
        this.show = true
      },
      //关闭评论输入框
      commentClose(){
        this.show = false
      },
      // 评论
      onSubmit() {
        if(this.textarea === ''){
          return this.$message.error('请先输入内容')
        }
        let articleId = this.$store.state.ArticleAccess.data._id;
        // console.log(articleId);
        this.$http.post('/comments',{
          comments: this.textarea,
          articleId : articleId
        }).then(res=>{
          if ( res.data.errno === 1 ) {
            this.$message.success(res.data.msg);
            this.textarea = '';
            this.show = false;
            this.$store.commit('saveComments',res.data)
            this.$http.post('/allarticleaccess/comments',{articleId}).then(res=>{
              this.arr = res.data.data;
            })
          }else {
            this.$message.error(res.data.msg);
          }

        });
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy年MM月dd日 hh:mm:ss');
      },
    }
  }
</script>

<style scoped>
  .article{
    width: 824px;
    min-height: 900px;
    margin: 30px auto;
    border-radius: 5px;
  }
  .el-header{
    height: 80px !important;
  }
  .Focus{
    position: relative;
    width: 734px;
    height: 80px;
    padding: 0 20px;
    margin-bottom: 20px;
  }
  .btn{
    position: absolute;
    right: 20px;
    top: 20px;
    border: 1px solid #6AC43F;
  }
  .focused{
    color: white;
    background-color: #74CA4A;
  }
  .Img{
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: white;
  }
  .Img img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .Img span{
    position: absolute;
    left: 120px;
    font-size: 18px;
  }
  .title{
    font-weight: bold;
  }
  .reading{
    top: 50px;
    margin-left: 175px;
    color: #9D9D9D;
    font-size: 14px !important;
  }
  .Img .date{
    top: 50px;
    color: #9D9D9D;
    font-size: 14px;
  }
  .title h2{
    margin-bottom: 10px;
  }
  .comments{
    position: relative;
    height: 20px !important;
  }
  .comments-box{
    height: 75px;
    border-bottom: 1px solid #C2C5C8;
  }
  .comments-con{
    width: 704px;
    margin: 0;
    padding-top: 10px;
  }
  .comments-img{
    width: 40px;
    height: 40px;
    margin: 0 !important;
  }
  .comments-img img{
    width: 40px;
    height: 40px;
  }
  .comments-img span{
    left: 70px;
    top: 10px;
    font-size: 14px;
  }
  .userComments{
    position: absolute;
    top: 35px;
    left: 68px;
    color: #979797;
    font-size: 12px;
  }
  .userComments span{
    display: block;
    position: absolute;
    width: 200px;
    top: 25px;
    font-size: 12px;
    color: #707070;
  }
  .articleBtn{
    position: fixed;
    top: 300px;
    left: 100px;
  }
  .articleBtn ul li{
    width: 40px;
    height: 40px;
    margin: 7px 0;
    border-radius: 50%;
    background-color: #fff;
    color: #979797;
    text-align: center;
    line-height: 40px;
    font-size: 26px;
  }
  .giveLike{
    width: 70px;
    background: url("../../../../../../../images/bg3.png") -9px -5px;
  }
  .giveLike1{
    background: url("../../../../../../../images/bg4.png") -9px -5px;
  }
  .articleBtn .giveLike:hover {
    background: url("../../../../../../../images/bg4.png") -9px -5px;
    background-color: white;
  }
  .articleBtn ul li:hover{
    color: #67C23A;
  }
  .articleBtn ul li:hover{
    color: #67C23A;
  }
  .articleLabel{
    width: 814px;
    padding:0 38px;
    background-color: white;
    color: #9D9D9D;
  }
  .articleLabel span{
    display: inline-block;
    height: 20px;
    border-radius: 50px;
    padding: 0 10px;
    background-color: #E6EAED;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .comments-text{
    position: absolute;
    top: 90px;
    left: 50px;
    width: 500px;
    padding: 10px 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px #999;
    background-color: #fff;
  }
  .comments-text:after{
    content: '';
    position: absolute;
    top: 10px;
    left: -8px;
    width:0;
    height:0;
    border-top:10px solid transparent;
    border-bottom:10px solid transparent;
    border-right:10px solid #fff;
  }
  .commentsButton{
    float: right;
    margin-top: 10px;
  }
  .item {
    margin-top: -28px;
    margin-right: -50px;
  }
  .commentNum{
    margin-left: 26px;
    margin-right: -52px;
  }
</style>
