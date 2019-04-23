<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病区与值班管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建病区信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="procedureForm" status-icon :rules="procedureFormRules" ref="procedureForm" label-width="100px">
      <el-form-item label="病区" prop="name">
        <el-input v-model="procedureForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="procedureForm.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('procedureForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { saveWards } from '../../api/wards'

export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入病区名称'))
      } else {
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入病区电话'))
      } else {
        callback()
      }
    }
    return {
      procedureForm: {
        name: '',
        phone: ''
      },
      procedureFormRules: {
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
          saveWards(this.procedureForm).then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ path: `/procedure/list` })
          }).catch(err => {
            console.info(err)
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
