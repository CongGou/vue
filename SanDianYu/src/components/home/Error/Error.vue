<template>
  <div class="Background">
    <div class="con">
      <h5>抱歉，您访问的页面出错啦！！</h5>
      <ul class="btn">
        <li @click="goback">返回上一页</li>
        <li @click="goIndex" class="right">返回首页</li>
      </ul>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Error"
        , data() {
            return {}
        },
        methods:{
          goback(){
            this.$router.go(-1)
          },
          goIndex(){
            this.$router.push('/')
          }
        }
    }
</script>

<style scoped>
  .Background{
    position: relative;
    width: 100%;
    height: 800px;
    background: url("../../../images/timg.gif") center/cover;
  }
  .con{
    position: absolute;
    top: 80px;
    left: 60px;
    width: 300px;
    height: 100px;
  }
  .btn{
    margin-top: 10px;
    width: 244px;
  }
  .btn li{
    float: left;
    width: 100px;
    background-color: #FBD172;
    box-shadow: 0 0 5px #ccc;
    cursor: pointer;
  }
  .right{
    margin-left: 18px;
  }
</style>
