<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
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

export default {
  name: 'login',
  data () {
    let validatePassword = (rule, value, callback) => {
      console.info(`password is ${value}`)
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('密码最小长度为6位'))
      } else {
        callback()
      }
    }
    let validateUsername = (rule, value, callback) => {
      console.info(`username is ${value}`)
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.login-form{
  width: 300px;
  margin: 0 auto;
  padding: 50px;
}
  .submit-button{
    display: block;
    width: 100%;
  }
</style>
