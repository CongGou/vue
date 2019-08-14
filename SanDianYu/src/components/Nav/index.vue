<template>
  <div class="Nav">
    <div class="NavCon">
      <b-navbar toggleable="lg" class="NavBar">
        <b-navbar-brand class="Navbg">
          <img src="../../images/bg/logo.png" alt="">
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/index">首页</b-nav-item>
            <b-nav-item to="/publish">发表文章</b-nav-item>
            <b-nav-item to="/administration">管理文章</b-nav-item>
            <b-nav-item to="/usercenter">个人主页</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-form>
              <b-form-input size="sm" class="mr-sm-2" v-model="search" placeholder="请输入关键字"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="button" @click="handlersearch()">搜索</b-button>
              <div class="searchArtcle"  v-show="show1">
                <ul class="item">
                  <li class="list" v-for="(item,index) in arr" :key="index" @click="access(item,index)">
                    {{item.title}}
                  </li>
                </ul>
              </div>
              <div class="searchArtcle"  v-show="show2">
                <ul class="item">
                  <li class="list" >{{msg}}</li>
                </ul>
              </div>
            </b-nav-form>
          </b-navbar-nav>
          <b-navbar-nav class="marRight">
            <b-nav-item @click="logOut" v-if="this.$store.state.Show">退出登录</b-nav-item>
            <b-nav-item class="login" to="/login" v-else="!this.$store.state.Show" >注册登录</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <div style="max-width: 960px; margin: auto; overflow: hidden;">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        search:'',
        arr:[],
        show1:false,
        show2:false,
        msg:''
      };
    },
    beforeCreate(){
      this.$store.dispatch('getArticle')
    },
    methods: {
      handlersearch(){
        if (this.search !== ''){
          this.$http.post('/search',{
            keyword:this.search
          }).then(res=>{
            if (res.data.errno===1) {
              this.arr = res.data.data;
              this.show1 = true;
              this.show2 = false;
              this.search = '';
              this.$router.push('/search');
              this.$store.commit('getSearchArticle',res.data.data)
            }else {
              this.show1 = false;
              this.show2 = true;
              this.msg = res.data.msg
            }
          });
        } else {
          this.$message.error('请先输入内容');
        }

      },
      access(value){
        let articleID = value._id;
        this.$http.post('/allarticleaccess',{
          articleId : articleID
        }).then(res=>{
          this.$router.push('/articlecommon');
          this.$store.commit('saveArticleAccess',res.data)
        })
        this.$http.post('/reading',{
          articleId : articleID
        }).then(res=>{
          console.log(res);
        })
      },
      logOut(){
        this.$http.post('/logout').then(res=>{
          let msg = res.data.msg;
          if (res.data.errno===1) {
            this.$message.success(msg);
            this.$store.commit('saveLogOut');
            this.$router.push('/index');
          }
        })
      },
    },
    created(){
      this.$store.dispatch('savePersonal')
    },
    watch:{
      search(){
        if (this.search !== ''){
          this.$http.post('/search',{
            keyword:this.search
          }).then(res=>{
            if (res.data.errno === 1) {
              this.arr = res.data.data;
              this.show1 = true;
              this.show2 = false
            }else {
              this.show1 = false;
              this.show2 = true;
              this.msg = res.data.msg
            }
          });
        } else {
          this.arr = '';
          this.show1 = false;
          this.show2 = false;
        }
      }
    }

  }
</script>

<style scoped>
  body{
    background-color: #F4F5F5 !important;
  }
  .NavCon{
    position:sticky;
    top:0;
    bottom: 0;
    z-index: 100;
    background-color: white;
  }
  .NavBar{
    max-width: 960px;
    margin: auto;
    padding: 0.5rem 0.2rem;
  }
  .Navbg{
    color: #499AFB;
  }
  .Navbg img{
    height: 40px;
  }
  .navbar-light .navbar-nav .nav-link:hover{
    color: #037EFB !important;
  }
  .router-link-exact-active{
    color: #037EFB !important;
  }
  .router-link-active{
    color: #037EFB !important;
  }
  .marRight{
    margin-left: 25px;
  }
  .btn-secondary{
    background-color: #037EFB !important;
    border-color: #037EFB;
  }
  .login a{
    padding: 0 !important;
    text-align: right;
    line-height: 40px;
  }
  .searchArtcle{
    width: 192px;
    max-height: 200px;
    padding: 10px 0;
    background-color: white;
    position: absolute;
    top: 45px;
    box-shadow: 0 0 5px #ccc;
    border-radius: 5px;
    overflow: hidden;
  }
  .list{
    height: 30px;
    text-align: center;
    color: #555;
    font-size: 12px;
    line-height: 30px;
    overflow: hidden;
    cursor: pointer;
  }
  .list:hover{
    background-color: #E6E9EE;
  }
</style>
