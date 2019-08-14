<template>
  <div class="publish">
    <div class="inputBox">
      <el-form class="titleInput" ref="form" :model="form">
        <el-form-item label="文章标题：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <el-form class="titleInput labelRight" ref="form" :model="form">
        <el-form-item label="文章标签：">
          <el-input v-model="form.label"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <quill-editor ref="myTextEditor"
                  v-model="content"
                  :config="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)">
    </quill-editor>
    <el-form ref="form" :model="form">
      <el-form-item>
        <el-button class="publishCon" type="primary" @click="onSubmit">立即发表</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Publish"
    , data() {
      return {
        form: {
          name: '',
          label:''
        },
        content: '<h2></h2>',
        editorOption: {
          // something config
        }
      }
    },
    methods: {
      onSubmit() {
        let reading = 0;
        let getLike = 0;
        this.$http.post('/article',{

          title:this.form.name,
          content:this.content,
          label: this.form.label,
          reading,
          getLike
        }).then(res=>{
          let msg = res.data.msg;
          if(res.data.errno===1){
            this.$message.success(msg);
            this.form.name='';
            this.form.label='';
            this.content='';
            this.$store.dispatch('getArticle')
          }else {
            this.$message.error(msg);
          }
          // console.log(msg)
        }).catch(e=>{
          console.log(e)
        })
      },
      onEditorBlur(editor) {
        // console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        // console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        // console.log('editor ready!', editor)
      },
    },
  }
</script>

<style>
  .publish{
    position: relative;
    width: 940px;
    height: 550px;
    margin: 20px auto;
    padding: 0 10px;
    background: #fff;
  }
  .inputBox{
    width: 100%;
  }
  .titleInput{
    display: inline-block;
    width: 40%;
    margin-bottom: 10px;
  }
  .publishCon{
    position: absolute;
    top: 10px;
    right: 0;
    box-shadow: 0 0 1px #333;
  }
  .quill-editor .ql-snow{
    padding: 8px 0 !important;
  }
  .ql-container.ql-snow{
    height: 300px;
  }
  .ql-editor{
    padding: 8px 0 !important;
  }
  .labelRight{
    position: absolute;
    right: 40px;
    top: 0;
  }
</style>
