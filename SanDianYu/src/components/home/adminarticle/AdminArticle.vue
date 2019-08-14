<template>
  <div class="Administration">
    <el-table
      :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%"
      router>
      <el-table-column label="文章标题" prop="title"></el-table-column>
      <el-table-column label="文章标签" prop="label"></el-table-column>
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleView(scope.$index, scope.row)">查看</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "AdminArticle"
    , data() {
      return {
        tableData: [],
        search: ''
      }
    },
    methods: {
      //删除文章
      handleDelete(index) {
        this.$http.post('/delete').then(res=>{
          let msg = res.data.msg;
          if ( res.data.errno === 0 ){
            this.$message.error(msg);
            return
          }
          this.$message.success(msg);
          this.tableData.splice(index,1)
        });
        // console.log(index, row);
      },
      //查看文章
      handleView(index,row) {
        let articleId = row._id;
        this.$http.post('/access',{articleId}).then(res=>{
          this.$store.commit('saveAccess',res.data);
          this.$router.push('/article/:id');
        })
      }
    },
    beforeCreate(){
      this.$store.dispatch('getArticle').then(()=>{
        this.tableData = this.$store.state.userArticle;
      })
    }
  }
</script>

<style scoped>
  .Administration{
    width: 960px;
    margin: 20px auto;
    padding: 0 10px;
    background: white;
  }
</style>

