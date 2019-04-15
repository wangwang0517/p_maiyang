<template>
  <div class="login">
    <img alt="Vue logo" class="logo" src="../assets/logo.png">
    <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form" >
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')" class="submit-button">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '../api/user'
import { Base64 } from 'js-base64'

export default {
  name: 'login',
  data () {
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码最小长度为6位'))
      } else {
        callback()
      }
    }
    let validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'user',
        password: '123456'
      },
      loginRules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) {
          return false
        }
        await login({ username: this.loginForm.username, password: Base64.encode(this.loginForm.password) }).then(data => {
          this.$store.commit('setLoginResult', data.data)
          this.$router.push('/alarm')
        })
      })
    }
  }
}
</script>
<style lang="scss">
  .login{
    background: #fff;
    border-radius: 5px;
    width: 400px;
    margin: 100px auto;
    padding: 50px;
    .logo{
      display: block;
      max-width: 50%;
      margin: 0 auto;
    }
    .login-form{
      padding: 20px;
    }
  }
  .submit-button{
    display: block;
    width: 100%;
  }
</style>
