<template>
  <div class="MainCommons">
    <ul class="MainCommons-list">
      <li class="list-items" v-for="(items,index) in allArticles" :key="index" @click="access(items,index)">
        <a>
          <ul class="items-title">
            <li class="column">专栏</li>
            <li>{{items.author.name}}</li>
            <li>{{items.date | formatDate}}</li>
          </ul>
          <div class="theme">
            <span>{{items.title}}</span>
          </div>
          <div class="label">{{items.label}}</div>
          <div class="label reading">
            阅读
            {{items.reading}}
          </div>
        </a>
      </li>
    </ul>

  </div>
</template>

<script>
  import {formatDate} from '@/js/date';
  export default {
    name: "MainCommons"
    , data() {
      return {
        allArticles:[],
      }
    },
    methods:{
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
      }
    },
    created(){
      this.$store.dispatch('getAllArticle').then(()=>{
        this.allArticles = this.$store.state.Latest;
      })
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy.MM.dd hh:mm:ss');
      },
    }
  }
</script>

<style scoped>
  .MainCommons ul,ol{
    margin: 0 !important;
  }
  .MainCommons{
    width: 100%;
    background-color: #fff;
  }
  .list-items{
    width: 100%;
    height: 117px;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }
  .list-items:hover{
    background-color: #F8F9F9;
  }
  .list-items a{
    display: inline-block;
    width: 100%;
    height: 100%;
    padding: 18px 24px;
    color: black;
    text-decoration: none;
    list-style: none;
  }
  .items-title{
    width: 100%;
    height: 17px;
    line-height: 17px;
    font-size: 12px;
  }
  .items-title li{
    float: left;
    margin-right: 10px;
    color: #999;
  }
  .items-title .column{
    font-size: 12px;
    font-weight: bold;
    color: #B950D7;
  }
  .theme{
    width: 100%;
    height: 40px;
    line-height: 40px;
  }
  .label{
    display: inline-block;
    height: 20px;
    border-radius: 50px;
    padding: 0 10px;
    background-color: #E6EAED;
    color: #909090;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .reading {
    background-color: transparent;
    color: #909090;
  }
</style>

