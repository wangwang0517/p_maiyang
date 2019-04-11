<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/device/list' }">设备列表</el-breadcrumb-item>
      <el-breadcrumb-item>编辑设备信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="deviceForm" status-icon :rules="deviceFormRules" ref="deviceForm" label-width="100px">
      <el-form-item label="设备名称" prop="name">
        <el-input v-model="deviceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="设备型号" prop="type">
        <el-input v-model="deviceForm.type"></el-input>
      </el-form-item>
      <el-form-item label="设备序列号" prop="series">
        <el-input v-model="deviceForm.series"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="deviceForm.status" size="medium">
          <el-radio border label="1">故障</el-radio>
          <el-radio border label="0">正常</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('deviceForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入设备名称'))
      } else {
        callback()
      }
    }
    return {
      deviceForm: {
        name: '设备一',
        type: '型号一',
        series: '1234567',
        status: '1'
      },
      deviceFormRules: {
        name: [
          { validator: validateName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            message: `提交信息`,
            showClose: false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    console.info(`当前用户id为：${this.$route.params.id}`)
  }
}
</script>
