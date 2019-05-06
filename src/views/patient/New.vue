<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建病人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="patientForm" status-icon :rules="patientFormRules" ref="patientForm" label-width="100px">
      <el-form-item label="姓名" prop="name">
        <el-input v-model="patientForm.name"></el-input>
      </el-form-item>
      <el-form-item label="住院号" prop="hosNumber">
        <el-input v-model="patientForm.hosNumber" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="床号" prop="bedNumber">
        <el-input v-model="patientForm.bedNumber"></el-input>
      </el-form-item>
      <el-form-item label="病区" prop="wardsId">
        <el-select v-model="patientForm.wardsId" placeholder="请选择病区" style="width: 100%">
          <el-option
            v-for="item in procedureList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="设备" prop="deviceId">
        <el-select v-model="patientForm.deviceId" placeholder="请选择设备" style="width: 100%">
          <el-option
            v-for="item in deviceList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
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
import { getUserWards } from '../../api/user'
import { getDeviceList } from '../../api/device'
import { ALL_RECORD } from '../../utils/default'
import { savePatient } from '../../api/patient'

export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入病人姓名'))
      } else {
        callback()
      }
    }
    let validateHosNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入病人住院号'))
      } else {
        callback()
      }
    }
    let validateBedNumber = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入病人床号'))
      } else {
        callback()
      }
    }
    let validateDeviceId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择病人设备'))
      } else {
        callback()
      }
    }
    let validateWardsId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择病人病区'))
      } else {
        callback()
      }
    }
    return {
      deviceList: [],
      procedureList: [],
      patientForm: {
        name: '',
        hosNumber: '',
        bedNumber: '',
        deviceId: '',
        wardsId: ''
      },
      patientFormRules: {
        name: [{ validator: validateName, trigger: 'blur' }],
        hosNumber: [{ validator: validateHosNumber, trigger: 'blur' }],
        bedNumber: [{ validator: validateBedNumber, trigger: 'blur' }],
        deviceId: [{ validator: validateDeviceId, trigger: 'blur' }],
        wardsId: [{ validator: validateWardsId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          savePatient(this.patientForm).then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ path: `/patient/list` })
          }).catch(err => {
            console.info(err)
          })
        } else {
          return false
        }
      })
    }
  },
  created () {
    getUserWards().then(data => {
      this.procedureList = data.data.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    })
    getDeviceList({ current: 1, size: ALL_RECORD, bind: false, state: '' }).then(data => {
      this.deviceList = data.data.records.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    })
  }
}
</script>
