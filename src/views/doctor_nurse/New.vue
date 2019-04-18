<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>医护管理</el-breadcrumb-item>
      <el-breadcrumb-item>新建医护信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="doctorNurseForm" status-icon :rules="doctorNurseFormRules" ref="doctorNurseForm" label-width="100px">
      <el-form-item label="账号" prop="username">
        <el-input v-model="doctorNurseForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="doctorNurseForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="doctorNurseForm.name"></el-input>
      </el-form-item>
      <el-form-item label="工号" prop="workno">
        <el-input v-model="doctorNurseForm.workno"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="doctorNurseForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="病区" prop="wardsId">
        <el-select v-model="doctorNurseForm.wardsId" multiple placeholder="请选择病区" style="width: 100%">
          <el-option
            v-for="item in procedureList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="职称" prop="typeId">
        <el-select v-model="doctorNurseForm.typeId" placeholder="请选择职称" style="width: 100%">
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
import { POSITION, ALL_RECORD } from '../../utils/default'
import { getWardsList } from '../../api/wards'
import { Base64 } from 'js-base64'
import { saveNurse } from '../../api/user'
export default {
  data () {
    let validateUserName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    let validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号密码'))
      } else {
        callback()
      }
    }
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名称'))
      } else {
        callback()
      }
    }
    let validateType = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择职称'))
      } else {
        callback()
      }
    }
    let validateWorkNo = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入工号'))
      } else {
        callback()
      }
    }
    let validatewardsId = (rule, value, callback) => {
      if (value === [] || value.length < 1) {
        callback(new Error('请选择病区'))
      } else {
        callback()
      }
    }
    return {
      jobList: POSITION,
      procedureList: [],
      doctorNurseForm: {
        username: '',
        password: '',
        name: '',
        typeId: '',
        typeName: '',
        workno: '',
        wardsId: []
      },
      doctorNurseFormRules: {
        username: [{ validator: validateUserName, trigger: 'blur' }],
        password: [{ validator: validatePassword, trigger: 'blur' }],
        name: [{ validator: validateName, trigger: 'blur' }],
        typeId: [{ validator: validateType, trigger: 'blur' }],
        workno: [{ validator: validateWorkNo, trigger: 'blur' }],
        wardsId: [{ validator: validatewardsId, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.doctorNurseForm.typeName = this.jobList.filter(item => {
            return item.value === this.doctorNurseForm.typeId
          })[0].label
          this.doctorNurseForm.wardsId = this.doctorNurseForm.wardsId.join(',')
          this.doctorNurseForm.password = Base64.encode(this.doctorNurseForm.password)
          saveNurse(this.doctorNurseForm).then(() => {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$router.push({ path: `/doctor_nurse/list` })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
    getWardsList({ current: 1, size: ALL_RECORD }).then(data => {
      this.procedureList = data.data.records.map((item, index) => {
        return {
          id: item.id,
          name: item.name
        }
      })
    })
  }
}
</script>
