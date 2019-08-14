<template>
  <div class="AuthorList">
    <ul class="MainCommons-list">
      <li class="list-items" v-for="(item,index) in this.$store.state.AllUser" :key="index">
        <a>
            <img :src="require(`@/images/upload/photo/${item.photo}`) " alt="">
          <span class="useName">{{item.name}}</span>
          <br>
          <span class="introduce">{{item.introduce}}</span>
          <p class="praise-read"><span>获得 {{item.giveALike}} 赞 </span><span> 阅读 {{item.reading}}</span></p>
          <div v-show="Btnshow">
            <button class="follow" @click="open(item,index)" v-if="arr[index].onOff">关注</button>
            <button class="follow active" @click="open(item,index)" v-else="arr[index].onOff">已关注</button>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: "AuthorList"
        , data() {
            return {
              arr:[],
              onClose: false,
              Btnshow: true
            }
        },
        created(){
          this.arr = this.$store.state.AllUser;
          //获取关注量
          this.arr.forEach((item,index)=>{
            this.$http.post('/focus/findAllFocus',{
              _id:item._id
            }).then(res=>{
              if(res.data.errno === 1){
                this.arr[index].onOff = !this.arr[index].onOff
              }
            })
          })

        },
        methods:{
          open(item,index){
            let _id = item._id
            if (this.arr[index].onOff) {
              this.$http.post('/focus',{
                _id
              }).then(res=>{
                if(res.data.errno === 0){
                  this.$message.error(res.data.msg)
                }else {
                  this.$message.success(res.data.msg);
                  this.arr[index].onOff = !this.arr[index].onOff
                  // console.log(this.onOff,1);
                  // this.$store.commit('saveFocus',this.onOff)
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
                  this.arr[index].onOff = !this.arr[index].onOff
                  // this.$store.commit('saveFocus',this.onOff)
                }
              })
            }
          }
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
  .follow{
    position: absolute;
    top: 45px;
    right: 15px;
    width: 80px;
    height: 30px;
    font-size: 16px;
    color: #37c701;
    background-color: #fff;
    border: 1px solid rgba(55,199,1,.6);
    border-radius: 2px;
    line-height: 30px;
    outline: none;
  }
  .active{
    color: white;
    background-color: #65D010;
  }
</style>
