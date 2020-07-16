<template>
  <div class="login">
    <div class="login-content">
      <section class="form_container">
        <div class="manage_tip">
          <span class="title">企业SCS共享云盘系统</span>
        </div>
        <el-form :model="loginUser" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="userName">
            <el-input
              v-model="loginUser.userName"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginUser.password"
              prefix-icon="el-icon-s-goods"
              placeholder="请输入密码"
              type="password"
              @keyup.native.enter="submitForm('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登 录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sign" class="submit_btn">注 册</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      loginUser: {
        userName: 'admin',
        password: '123456'
      },
      rules: {
        userName: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
          // { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
          // { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sign: function () {
      this.$router.push('/signin')
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // localStorage.setItem('eleToken', 'Basic qwerdf')
          // this.$router.push('/index')
          
          this.$axios
            .get(
              '/api/login/login?userName=' +
                this.loginUser.userName +
                '&password=' +
                this.loginUser.password
            )
            .then(res => {
              // 登录成功，储存token
              console.log(res)
              const { token, userinfo } = res
              localStorage.setItem('eleToken', 'Basic ' + token)
              // localStorage.setItem('eleProjectId', 3)
              // 将用户信息存储到store中
              console.log(userinfo)
              // this.initUserInfo(userinfo)
              this.$router.push('/document')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
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
  font-size: 26px;
  color: #000000;
}
.loginForm {
  margin-top: 30px;
}

.submit_btn {
  width: 100%;
  background-color: #0896ba;
  border-color: #0896ba;
}
.submit_btn:hover {
  background-color: #08b0db;
}
.pawleft {
  float: left;
}
.pawright {
  float: right;
  color: #409eff;
}
</style>
