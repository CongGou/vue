<template>
  <div class="index">
    <b-row>
      <main-left></main-left>
      <div class="grid-content bg-purple right">
        <MainRight></MainRight>
      </div>
    </b-row>
  </div>

</template>

<script>
  import MainLeft from './base/left/MainLeft'
  import MainRight from './base/right/MainRight'
  export default {
    data() {
      return {

      }
    },
    components:{
      MainLeft,
      MainRight
    },
    created(){
    }

  }
</script>

<style scoped>
  body{
    background-color: #F4F5F5;
  }
  .index{
    margin-top: 20px;
  }
  .row{
    position: relative;
    min-height: 300px;
    margin: 0 !important;
  }
  /*右边*/
  .right{
    position: fixed;
    z-index: 90;
    margin-left: 712px;
  }
</style>
