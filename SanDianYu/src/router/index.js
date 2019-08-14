import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Nav from '@/components/Nav'
import Index from '@/components/home/index'
import Login from '@/components/home/login/Login'
import Article from '@/components/home/article/Article'
import Publish from '@/components/home/publish/Publish'
import Administration from '@/components/home/adminarticle/AdminArticle'
import Search from '@/components/home/search/Search'
import Usercenter from '@/components/home/usercenter/Usercenter'
import Recommended from '@/components/home/index/base/left/base/recommended/Recommended'
import Latest from '@/components/home/index/base/left/base/latest/Latest'
import Hot from '@/components/home/index/base/left/base/hot/Hot'
import ArticleCommon from '@/components/home/index/base/left/base/commons/articleContent'
import AuthorList from '@/components/home/index/base/right/base/AuthorList'
import Focus from '@/components/home/index/base/right/base/Focus'
import Fans from '@/components/home/index/base/right/base/Fans'
import Terms from '@/components/home/terms/Terms'
import Error from '@/components/home/Error/Error'

Vue.use(Router)

const router=new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/',
      name:'Nav',
      component: Nav,
      redirect:'/index',
      children:[
        {
          path:'index',
          name:'index',
          component:Index,
          redirect:'/recommended',
          children:[
            {
              path:'/recommended',
              component: Recommended,

            },
            {
              path:'/latest',
              name:'Latest',
              component: Latest,
            },
            {
              path:'/hot',
              name:'Hot',
              component: Hot,
            }
          ]
        },
        {
          path:'publish',
          component: Publish
        },
        {
          path:'administration',
          component: Administration
        },
        {
          path:'usercenter',
          component: Usercenter
        },
        {
          path:'search',
          title:'文章搜索',
          component: Search
        },
        {
          path:'focus',
          title:'关注',
          component: Focus
        },
        {
          path:'fans',
          title:'粉丝',
          component: Fans
        },
        {
          path:'/authorList',
          title:'作者榜单',
          component: AuthorList
        },
        {
          path:'/terms',
          name:'terms',
          component: Terms
        },
      ]
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path:'/article/:id',
      name:'Article',
      component: Article
    },
    {
      path:'/articlecommon',
      name:'ArticleCommon',
      component: ArticleCommon
    },
    {
      path:'*',
      component: Error
    }

  ]
})
//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.name !== 'index'){
    store.dispatch('checkMe')
  }
  next()
});

export default router
