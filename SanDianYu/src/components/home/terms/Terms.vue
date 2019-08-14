<template>
  <div class="Terms">
    <div>
      <h2>条款和免责</h2>
      <p>在使用
        <b>三点鱼 (以下简称本平台)</b>
        提供的一切服务前，
        请务必仔细阅读并理解透彻本声明，您可以选择不使用本平台，
        但如果您使用本平台，将被视为完全认可此协议及其可能随时更新的内容
      </p>
      <p>本平台保留随时修改服务条款的权利，用户在使用本平台服务时
        ，有必要对最新的服务条款进行仔细阅读和重新确认，当发生有关
        争议时，以最新的服务条款为准。
      </p>
    </div>
    <div class="item">
      <ol>
        <li class="list">1. 本平台尊重并保护所有用户的个人隐私权，具体细节可以阅读我们的 隐私保护声明 ，
          您注册的用户名、电子邮件地址、付款账户等个人资料，未经您亲自许可或根据相关法律、
          法规的强制性规定，
          本平台不会主动地泄露给第三方。
        </li>
        <li class="list">2. 本平台的所有用户在平台内所进行的一切操作均为其个人行为，本平台不会对其进行
          监督或干涉，也不对其行为承担任何责任。
        </li>
        <li class="list">3. 除本平台注明之服务条款外，其他一切因使用本平台而可能遭致的意外、疏忽、侵权
          及其造成的损失(如:自身密码保管不当
          导致账户被盗用，经济损失等)，本平台对其概不负责，也不承担任何法律责任。
        </li>
        <li class="right">此协议中的"用户"包括一切访问本平台的用户，无论是否注册均适用于此协议!</li>
        <li class="right">协议生效时间: 2019/07/20</li>
      </ol>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Terms"
    , data() {
      return {}
    }
  }
</script>

<style scoped>
  .Terms{
    min-width: 500px;
    min-height: 300px;
    margin-top: 20px;
    padding: 20px 20px;
    background-color: white;
  }
  .Terms h2{
    text-align: center;
    margin-bottom: 10px;
  }
  .Terms p{
    margin: 10px 0;
    color: #555;
    text-indent: 10px;
    font-size: 15px;
  }
  .item{
    margin-top: 20px;
  }
  .list{
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    text-indent: 10px;
    color: #555;
    font-size: 14px;
  }
  .right{
    text-align: right;
    color: #A8A8A8;
    font-size: 12px;
  }
</style>

