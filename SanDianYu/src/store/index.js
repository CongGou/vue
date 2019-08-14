import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'


Vue.use(Vuex);
export default new Vuex.Store({
  state: {  //存放所有组件的可以使用的数据
    loginUser: localStorage.getItem('saveLoginUser')||'请先登录',
    userArticle:[],
    userInfo: JSON.parse(localStorage.getItem('saveuserInfo')),
    Show:'',
    //个人文章
    articleCon:JSON.parse(localStorage.getItem('saveAccess')),
    //评论
    // Comments:JSON.parse(localStorage.getItem('saveAccess')),
    //所有文章随机排序
    AllArticle:[],
    //所有文章最新排序
    Latest:[],
    //搜索文章
    SearchArticle:JSON.parse(localStorage.getItem('getSearchArticle')),
    //所有文章访问
    ArticleAccess:JSON.parse(localStorage.getItem('saveArticleAccess')),
    //所有用户
    AllUser:[],
    //个人资料
    PersonalData:JSON.parse(localStorage.getItem('savePersonal'))

  },
  mutations:{
    //登录与退出登录切换
    saveLoginUser(state,msg){
      state.loginUser = msg;
      state.Show = true;
      localStorage.setItem('saveLoginUser',msg)
    },
    //个人用户信息
    saveuserInfo(state,data){
      state.userInfo = data;
      localStorage.setItem('saveuserInfo',JSON.stringify(data))
    },
    //个人文章管理列表
    saveArticle(state,msg){
      state.userArticle = msg
    },
    //个人访问文章
    saveAccess(state,msg){
      this.state.articleCon = msg;
      localStorage.setItem('saveAccess',JSON.stringify(msg))
    },
    //是否登录
    saveLogOut(){
      this.state.Show = '';
      this.state.userArticle = '';
      this.state.loginUser=localStorage.removeItem('saveLoginUser')||'请先登录'
      this.state.Focus=localStorage.removeItem('saveFocus')||'关注'
    },
    //关注
    saveFocus(state,data){
      // console.log(data);
      localStorage.setItem('saveFocus',data)
    },
    //评论
    saveComments(state,data){
      // console.log(data)
      this.state.Comments = data;
      localStorage.setItem('saveComments',JSON.stringify(data))
    },
    //所有文章
    getAllArticle(state,data){
      state.Latest = data.data.reverse();
      state.AllArticle = data.data
    },
    //搜索文章
    getSearchArticle(state,data){
      console.log(data);
      state.SearchArticle = data.reverse();

    },
    //所有文章访问
    saveArticleAccess(state,data){
      // console.log(data);
      state.ArticleAccess = data;
      localStorage.setItem('saveArticleAccess',JSON.stringify(data))
    },
    //所有用户
    getUser(state,data){
      // console.log(data);
      state.AllUser = data;
    },
    //个人资料修改
    savePersonal(state,data){
      state.PersonalData = data.data
      localStorage.setItem('savePersonal',JSON.stringify(data))
    }
  },
  actions:{
    async checkMe({commit}){
      //请求publish接口,对登录信息进行判断,并保留状态t
      const {msg} = await Vue.prototype.$http.get('/publish').then(data=>data.data);
      if(!msg){
        router.push({name:'login'});
        return
      }
      //登录的用户接收到vuex
      commit('saveLoginUser',msg);
    },
    //个人用户信息
    saveuserInfo(cxt){
      return new Promise((resolve =>{
        axios.get('/api/userinfo').then(res=>{
          cxt.commit('saveuserInfo',res.data);
          resolve()
        })

      }))
    },
    //个人用户文章管理
    getArticle(cxt){
      return new Promise((resolve =>{
        axios.get('/api/management').then(res=>{
          cxt.commit('saveArticle',res.data);
          resolve()
        })

      }))
    },
    //所有文章
    getAllArticle(cxt){
      return new Promise((resolve =>{
        axios.get('/api/allarticles').then(res=>{
          cxt.commit('getAllArticle',res.data);
          resolve()
        })

      }))
    },
    //所有文章用户
    getUser(cxt){
      return new Promise((resolve =>{
        axios.get('/api/alluser').then(res=>{
          cxt.commit('getUser',res.data);
          resolve()
        })

      }))
    },
    //个人资料
    savePersonal(cxt){
      return new Promise((resolve =>{
        axios.get('/api/getData').then(res=>{
          cxt.commit('savePersonal',res.data);
          resolve()
        })

      }))
    }
  }
})
