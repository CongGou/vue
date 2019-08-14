<template>
  <div class="AuthorList">
    <ul class="MainCommons-list">
      <li class="list-items" v-for="(item,index) in arr" :key="index">
        <a>
          <img :src="require(`@/images/upload/photo/${item.author.photo}`) " alt="">
          <span class="useName">{{item.author.name}}</span>
          <br>
          <span class="introduce">{{item.author.introduce}}</span>
          <p class="praise-read"><span>获得 {{item.author.giveALike}} 赞</span><span> {{item.author.reading}} 阅读</span></p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Fans"
    , data() {
      return {
        arr:[]
      }
    },
    created(){
      this.$http.post('/focus/BeFocusOn').then(res=>{
        this.arr = res.data.data;
      })
    }
  }
</script>

<style scoped>
  .AuthorList{
    width: 700px;
    margin-top: 20px;
    background-color: white;
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
  .MainCommons-list a{
    display: block;
    position: relative;
    color: black;
    list-style: none;
    width: 100%;
    line-height: 61px;
    padding: 25px 15px;
  }
  .MainCommons-list a img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .useName{
    position: absolute;
    top: 7px;
    left: 85px;
    font-weight: bold;
  }
  .introduce{
    position: absolute;
    top: 30px;
    left: 85px;
    color: #999;
    font-size: 14px;
  }
  .praise-read{
    position: absolute;
    bottom: 1px;
    left: 85px;
    color: #999;
    font-size: 14px;
  }
</style>
