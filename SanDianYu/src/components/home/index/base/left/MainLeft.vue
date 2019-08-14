<template>
    <div class="MainLeft">
      <div class="grid-content bg-purple left">
        <div class="LeftMain">
          <div class='leftArticle'>
            <header class="list-header">
              <ul class="nav-list">
                <div>
                  <b-navbar toggleable="lg">
                    <b-navbar-nav>
                      <b-nav-item to="/recommended">推荐</b-nav-item>
                      <b-nav-item to="/latest">最新</b-nav-item>
                      <b-nav-item to="/hot">热门</b-nav-item>
                    </b-navbar-nav>
                  </b-navbar>
                </div>
              </ul>
            </header>
          </div>
        </div>

        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>


</template>

<script>
    export default {
        name: "MainLeft"
        , data() {
            return {}
        }
    }
</script>

<style scoped>
  .left{
    min-width: 700px !important;
    overflow: hidden;
  }
  .leftArticle{
    box-shadow: 0 0 1px #999;
    background: white;
  }

  .leftArticle ol, ul, dl {
    margin: 0;
  }

  .list-header {
    padding: .24rem 1rem;
    border-bottom: 1px solid hsla(0,0%,59.2%,.1);
  }
  .navbar{
    padding: 0 !important;
  }
  .nav-link{
    font-size: 14px !important;
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
</style>
