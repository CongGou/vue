<template>
  <div class="Search">
    <div class="MainCommons">
      <ul class="MainCommons-list">
        <li class="list-items" v-for="(item,index) in arr" @click="access(item,index)">
          <a>
            <ul class="items-title">
              <li class="column">专栏</li>
              <li>{{item.author.name}}</li>
              <li>{{item.date | formatDate}}</li>
            </ul>
            <div class="theme">
              <span>{{item.title}}</span>
            </div>
            <div class="label">{{item.label}}</div>
            <div class="label reading">
              阅读
              {{item.reading}}
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="alert-box" v-show="modalShow">
      <div class="alert">
        <p>
          该页面没有相关数据，两秒后自动返回首页
        </p>
      </div>
    </div>
  </div>

</template>

<script>
  import {formatDate} from '@/js/date';
  export default {
    name: "Search"
    , data() {
      return {
        arr:[],
        modalShow: false
      }
    },
    created(){
      this.arr = this.$store.state.SearchArticle
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
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy.MM.dd hh:mm:ss');
      },
    },
    watch:{
      arr(){
        if (this.arr === null) {
          this.modalShow = true;
          setTimeout(()=>{
            this.$router.push('/recommended')
          },2000)
        }
      }
    }
  }
</script>

<style scoped>
  .Search{
    margin-top: 20px;
    max-width: 700px;
  }
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
  .alert-box{
    z-index: 100;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background-color: rgba(0,0,0,.3);
  }
  .alert{
    position: relative;
    max-width: 400px;
    max-height: 200px;
    margin: 100px auto;
    color: #45484C;
    background-color: white;
    line-height: 160px;
    font-size: 18px;
  }
</style>

