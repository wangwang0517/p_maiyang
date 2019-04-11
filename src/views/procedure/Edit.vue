<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑病人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="patientForm" status-icon :rules="patientFormRules" ref="patientForm" label-width="100px">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="patientForm.username"></el-input>
      </el-form-item>
      <el-form-item label="住院号" prop="hospitalizationNumber">
        <el-input v-model="patientForm.hospitalizationNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="床号" prop="bedNumber">
        <el-input v-model="patientForm.bedNumber"></el-input>
      </el-form-item>
      <el-form-item label="病区" prop="procedure">
        <el-select v-model="patientForm.procedure" placeholder="请选择病区" style="width: 100%">
          <el-option
            v-for="item in procedureList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备" prop="device">
        <el-select v-model="patientForm.device" placeholder="请选择设备" style="width: 100%">
          <el-option
            v-for="item in deviceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('patientForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
export default {
  data () {
    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      deviceList: [],
      procedureList: [],
      patientForm: {
        username: '',
        hospitalizationNumber: '',
        bedNumber: '',
        device: '',
        procedure: ''
      },
      patientFormRules: {
        username: [
          { validator: validateUserName, trigger: 'blur' }
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
  },
  created () {
    this.procedureList = [{
      value: '1',
      label: '病区一'
    }, {
      value: '2',
      label: '病区二'
    }, {
      value: '3',
      label: '病区三'
    }, {
      value: '4',
      label: '病区四'
    }, {
      value: '5',
      label: '病区五'
    }]

    this.deviceList = [{
      value: '1',
      label: '设备一'
    }, {
      value: '2',
      label: '设备二'
    }, {
      value: '3',
      label: '设备三'
    }, {
      value: '4',
      label: '设备四'
    }, {
      value: '5',
      label: '设备五'
    }]

    console.info(`当前用户id为：${this.$route.params.id}`)
  }
}
</script>
