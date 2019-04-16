<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>管理员</el-breadcrumb-item>
      <el-breadcrumb-item>编辑信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="systemAdminForm" status-icon :rules="systemAdminFormRules" ref="systemAdminForm"
             label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model.number="systemAdminForm.username"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model.number="systemAdminForm.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model.number="systemAdminForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="systemAdminForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="systemAdminForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('systemAdminForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { updateInfo, getInfo } from '../../api/user'
import { Base64 } from 'js-base64'

export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入手机号码'))
      } else {
        callback()
      }
    }
    let validateCheckPassword = (rule, value, callback) => {
      if (value !== this.systemAdminForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      systemAdminForm: {
        username: this.$store.getters.user.username,
        name: this.$store.getters.user.name,
        phone: this.$store.getters.user.phone.toString(),
        password: null,
        checkPassword: null
      },
      systemAdminFormRules: {
        checkPassword: [
          { validator: validateCheckPassword, trigger: 'blur' }
        ],
        username: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        name: [
          { validator: validateName, trigger: 'blur' }
        ],
        phone: [
          { validator: validatePhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = this.systemAdminForm
          delete params.checkPassword
          if (params.password) {
            params.password = Base64.encode(params.password)
          }
          let formData = new FormData()
          for (let key in params) {
            formData.append(key, params[key])
          }
          updateInfo(formData).then(() => {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
            this.$refs[formName].resetFields()
            getInfo().then(data => {
              this.$store.commit('updateInfo', data.data)
            })
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
