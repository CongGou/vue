<template>
  <div class="MainRight">
      <div class="suction">
        <div class="suction-top">
          <div class="Content">
            <div class="ContentTop">
              <div class="headImg">
                <router-link :to="{path:'/usercenter'}">
                  <img :src="require(`@/images/upload/photo/${this.user.photo}`) " alt="">
                </router-link>
              </div>
              <div class="userName" ><p><span>{{this.$store.state.loginUser}}</span></p></div>
            </div>
            <div class="SubscribeBtn">
              <ul class="stat-list">
                <router-link :to="{path:'administration'}" class="item">
                  <div class="title">帖子</div>
                  <div class="count">{{this.$store.state.userArticle.length}}</div>
                </router-link>
                <router-link :to="{path:'focus'}" class="item">
                  <div class="title">关注</div>
                  <div class="count">{{FocusNum}}</div>
                </router-link>
                <router-link :to="{path:'fans'}" class="item">
                  <div class="title">粉丝</div>
                  <div class="count">{{BeFocusNum}}</div>
                </router-link>
              </ul>
            </div>
          </div>
          <div class="sidebar-block">
            <header class="user-block-header">🎖️作者榜</header>
            <ul class="user-list">
              <li v-for="(items,index) in AllUser" :key="index">
                <a href="#">
                  <img :src="require(`@/images/upload/photo/${items.photo}`) " alt="">
                  <span>{{items.name}}</span>
                  <span class="bottom">{{items.introduce}}</span>
                </a>
              </li>
            </ul>
            <div class="small"><router-link :to="{path:'authorList'}">完整榜单 ></router-link></div>
          </div>
        </div>
      </div>
      <div class="MainRightBottom">
        <ul>
          <li><a href="#javascript:">津ICP备19003971号-1</a></li>
          <li><router-link to="/terms">条款和免责</router-link></li>
          <li><a href="#javascript:">© CopyRight 2019 三点鱼</a></li>
          <li><a href="#javascript:">反馈邮箱：1912433492@qq.com</a></li>
        </ul>
      </div>
  </div>
</template>

<script>
    export default {
        name: "MainRight"
        , data() {
            return {
              user:{},
              AllUser:[],
              FocusNum: '',
              BeFocusNum:''
            }
        }
        ,created(){
            this.$http.post('/getData').then(res=>{
              this.user = res.data.data
            })
            //用户名
            this.$store.dispatch('getUser').then(()=>{
              this.AllUser = this.$store.state.AllUser;
            });
            //所有关注量
            this.$http.post('/focus/AllFocus').then(res=>{
              this.FocusNum = res.data.data.length;
            });
            //被关注量
            this.$http.post('/focus/BeFocusOn').then(res=>{
              this.BeFocusNum = res.data.data.length;
            })
        }
    }
</script>

<style scoped>
  .ActiveContent img{
    width:120px;
    height: 120px;
    margin: 15px 10px;
  }
  .ActiveContent p{
    position: absolute;
    display: inline-block;
    height: 40px;
    overflow: hidden;
  }
  /*右边*/
  .Content{
    position: relative;
    width: 248px;
    height: 160px;
    background: #fff;
    margin-bottom: 10px;
    cursor: pointer;
  }
  .ContentTop{
    width: 100%;
    height: 93px;
    padding: 15px  0 0 15px;
  }
  .headImg{
    width: 62px;
    height: 62px;
    box-shadow: 0 0 3px #999;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }
  .headImg img{
    width: 62px;
    height: 62px;
    border-radius: 50%;
    margin: 0 !important;
  }
  .SubscribeBtn{
    width: 100%;
    height: 20px;
    border-top: 1px solid #EEEFEF;
    bottom: 30px;
    margin: auto;
  }
  .stat-list{
    flex: 1 1 auto;
    display: flex;
    margin: 0;
    list-style: none;
    text-align: center;
    padding: 16.5px 0;
  }
  .stat-list a{
    text-decoration: none;
    list-style: none;
  }
  .stat-list .item{
    flex: 1 1 33.333%;
    max-height: 2.833rem;
    line-height: 1;
  }
  .title{
    font-size: 13px;
    color: #8a9aa9;
    margin-bottom: .5rem;
  }
  .userName{
    position: absolute;
    top: 20px;
    left: 70px;
    width: 100px;
    height: 30px;
    color: #17181a;
    font-size: 15px;
    font-weight: 600;
  }
  .userName p{
    width: 140px;
    height: 30px;
    margin-left: 10px;
    text-align: center;
    line-height: 30px;
  }
  .item{
    top:10px;
    left: -6px;
  }
  /*榜单*/
  .sidebar-block{
    width: 248px;
    max-height: 318px;
    background-color: #fff;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
    cursor: pointer;
  }
  .sidebar-block a{
    text-decoration: none;
  }
  .user-block-header{
    width: 100%;
    height: 42px;
    padding: 12px 15px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }
  .user-list{
    max-height: 238px;
    overflow: hidden;
    margin-bottom: 0 !important;
  }
  .user-list li{
    height: 78px;
  }
  .small{
    height: 42px;
    font-size: 14px;
    text-align: center;
    line-height: 42px;
  }
  .user-list li a{
    display: block;
    position: relative;
    color: black;
    list-style: none;
    width: 100%;
    padding: 12px 15px;
  }
  .user-list li a img{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .user-list li a span{
    position: absolute;
    left: 70px;
    display: inline-block;
    width: 173px;
    font-size: 14px;
  }
  .bottom{
    bottom: 15px;
    font-size: 12px;
    color: #9D9D9D;
  }
  .MainRightBottom{
    margin-top: 10px;
  }
  .MainRightBottom ul li a{
    color: #939393;
    list-style: none;
    text-decoration: none;
    font-size: 12px;
  }
  .MainRightBottom ul li a:hover{
    color: #037BFB;
  }
</style>
