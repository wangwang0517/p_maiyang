<template>
  <div class="myml-main edit-system-admin">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home" /> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病区与值班管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑病区信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <el-form :model="procedureForm" status-icon :rules="procedureFormRules" ref="procedureForm" label-width="100px">
      <el-form-item label="病区" prop="name">
        <el-input v-model="procedureForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="procedureForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="值班护士" prop="nurse">
        <el-select v-model="procedureForm.nurse" filterable placeholder="请选择医护" style="width: 100%">
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
        <el-button type="primary" @click="submitForm('procedureForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>
<script>
export default {
  data () {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    return {
      doctorNurseList: [],
      procedureForm: {
        name: '病区一',
        phone: '188888888',
        nurse: '1'
      },
      procedureFormRules: {
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
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  created () {
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
  }
}
</script>
