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
      <el-form-item label="设备型号" prop="model">
        <el-input v-model="deviceForm.model"></el-input>
      </el-form-item>
      <el-form-item label="设备序列号" prop="serialId">
        <el-input v-model="deviceForm.serialId"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio-group v-model="deviceForm.state" size="medium">
          <el-radio border label="0">正常</el-radio>
          <el-radio border label="1">故障</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('deviceForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { getDeviceInfo, updateDeviceInfo } from '../../api/device'
export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入设备名称'))
      } else {
        callback()
      }
    }
    let validateModel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入设备型号'))
      } else {
        callback()
      }
    }
    let validateSerialId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入设备序列号'))
      } else {
        callback()
      }
    }
    return {
      deviceForm: {
        id: '',
        name: '',
        model: '',
        serialId: '',
        state: ''
      },
      deviceFormRules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        model: [{ validator: validateModel, trigger: 'blur' }],
        serialId: [{ validator: validateSerialId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          updateDeviceInfo(this.deviceForm).then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ path: `/device/list` })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    this.deviceForm.id = this.$route.params.id
    getDeviceInfo({ id: this.deviceForm.id }).then(data => {
      this.deviceForm.name = data.data.name
      this.deviceForm.model = data.data.model
      this.deviceForm.serialId = data.data.serialId
      this.deviceForm.state = data.data.state.toString()
    }).catch(err => {
      console.info(err)
    })
  }
}
</script>
