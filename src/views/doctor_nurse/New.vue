<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>医护管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建医护信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="doctorNurseForm" status-icon :rules="doctorNurseFormRules" ref="doctorNurseForm" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="doctorNurseForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="doctorNurseForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input type="password" v-model="doctorNurseForm.checkPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="doctorNurseForm.name"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="jobNumber">
        <el-input v-model="doctorNurseForm.employeeNumber"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="doctorNurseForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="病区" prop="procedure">
        <el-select v-model="doctorNurseForm.procedure" multiple placeholder="请选择病区" style="width: 100%">
          <el-option
            v-for="item in procedureList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="job">
        <el-select v-model="doctorNurseForm.job" placeholder="请选择职称" style="width: 100%">
          <el-option v-for="item in jobList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('doctorNurseForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
import { POSITION } from '../../utils/default'

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
      jobList: POSITION,
      procedureList: [],
      doctorNurseForm: {
        username: '',
        employeeNumber: '',
        procedure: [],
        phone: '',
        job: ''
      },
      doctorNurseFormRules: {
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
  }
}
</script>
