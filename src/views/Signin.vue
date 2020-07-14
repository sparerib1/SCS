<template>
<div class="login">
    <div class="login-content">
      <section class="form_container">
        <div class="manage_tip">
          <span class="title">企业SCS共享云盘系统</span>
        </div>
        <form class="signupform">
        <!--用户名-->
        <input class="input" placeholder="用户名" v-model="username"/>
        <!--错误提示，下同-->
        <div class="error">{{uError}}</div>
        <!--密码-->
        <input class="input" placeholder="密码" v-model="userpwd"/>
        <div class="error">{{pError}}</div>
        <!--确认密码-->
        <input class="input" placeholder="确认密码" v-model="pwdagain"/>
        <div class="error">{{aError}}</div>
        <!--注册按钮-->
        <button class="register-btn" @click="userRegister">注册</button>
        <!--这里我们用路由跳转到登陆组件-->
        <router-link to="/">已有账号，登陆</router-link>
        </form>
      </section>
    </div>
</div>
</template>
<script>
export default {
  // 这里是组件的名字，无影响
  name: 'register',
  data: function () {
    return {
    // 这里主要是初始化用户输入的信息，以及错误提示
      username: '',
      userpwd: '',
      pwdagain: '',
      uError: '',
      pError: '',
      aError: ''
    }
  },
  // methods 用于定义的函数。
  methods: {
    // 这里定义了一个用户注册函数
    userRegister: function () {
      // 简单进行一下验证，判断是否为空
      // 正经项目肯定需要更多的验证规则，这里只是提供一个思路
      if (this.username === '') {
        this.uError = '用户名不能为空！'
      } else {
        this.uError = ''
      }
      if (this.userpwd === '') {
        this.pError = '密码不能为空！'
      } else {
        this.pError = ''
      }
      // eslint-disable-next-line eqeqeq
      if (this.userpwd != this.pwdagain) {
        this.aError = '两次密码不一致！'
      } else {
        this.aError = ''
      }
      if (this.uError === '' && this.pError === '' && this.aError === '') {
      //  验证通过后通过axios来完成ajax请求，将注册信息传到后端
      //  这里不涉及后端内容，仅提供思路
      //  this.$axios.get('路径?参数').then(res => ())
      //  this.$axios.post('路径',{参数}).then(res => ())
      //  默认注册成功，跳转到登陆页面
        this.$router.push('/')
        alert('注册成功！')
      }
    }
  }
}
</script>
<style>
.login {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center; /*定义父元素的元素垂直居中*/
  justify-content: center; /*定义子元素的里的元素水平居中*/
}
.login-content {
  width: 430px;
  height: 376px;
  border: 1px solid #ebebeb;
  box-shadow: 0 12px 14px rgba(0,0,0,.08);
  border-radius: 3px;
  background-color: azure;
}
.form_container {
  width: 380px;
  height: 300px;
  /* border: 1px solid red; */
  padding: 25px;
  /* border-radius: 5px; */
  text-align: center;
  background-color: #fff;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 35px;
  color: #000000;
  margin: 10px;
}
.signupform{
    margin: 30px;
}
.input{
    width: 320px;
    height: 30px;
    margin: 8px 0 8px 0;
}
.register-btn{
    margin: 15px 0 20px 0;
    width: 320px;
    height: 40px;
    background-color: #0896ba;
    border-color: #0896ba;
    font-size: 17px;
    color: white;
}
.register-btn:hover {
  background-color: #08b0db;
}
</style>
