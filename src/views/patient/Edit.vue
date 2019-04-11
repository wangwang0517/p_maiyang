<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/patient/list' }">病人信息列表</el-breadcrumb-item>
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
      <el-form-item label="医护" prop="doctor_nurse">
        <el-select v-model="patientForm.doctor_nurse" filterable multiple placeholder="请选择医护" style="width: 100%">
          <el-option
            v-for="item in doctorNurseList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span><el-tag size="mini">{{ item.work }}</el-tag>  {{ item.label }}</span>
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
      doctorNurseList: [],
      patientForm: {
        id: 3,
        username: '张三',
        hospitalizationNumber: '10003',
        bedNumber: 'B4F5001',
        procedure: '肠胃科',
        device: '1',
        doctor_nurse: ['1', '2', '3']
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

    this.doctorNurseList = [{
      value: '1',
      label: '张三',
      work: '护士'
    }, {
      value: '2',
      label: '李四',
      work: '院长'
    }, {
      value: '3',
      label: '王五',
      work: '医生'
    }, {
      value: '4',
      label: '赵柳',
      work: '护士'
    }, {
      value: '5',
      label: '朱琪',
      work: '护士长'
    }]
    console.info(`当前用户id为：${this.$route.params.id}`)
  }
}
</script>
