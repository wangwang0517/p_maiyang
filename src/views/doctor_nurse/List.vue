<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>医护管理</el-breadcrumb-item>
      <el-breadcrumb-item>医护信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <div class="data-filter">
        <el-button type="text" >筛选：</el-button>
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-select v-model="procedureType" slot="prepend">
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in procedureList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="employeeNumber" label="工号"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="procedure" label="病区"></el-table-column>
        <el-table-column prop="job" label="职称" ></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="handleDeleteClick(scope.row.id)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="totalPage"
        :current-page.sync="currentPage"
        @current-change="handleCurrentChange">
      </el-pagination>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      procedureType: '',
      procedureList: [],
      search: '',
      tableDataType: 0,
      totalPage: 100,
      currentPage: 3,
      tableData: [{
        id: 3,
        username: '张三',
        employeeNumber: '10003',
        phone: 'B4F5001',
        procedure: '肠胃科',
        job: '医生'
      }, {
        id: 2,
        username: '李四',
        employeeNumber: '10004',
        phone: 'B4F5002',
        procedure: '肠胃科',
        job: '护士'
      }, {
        id: 1,
        username: '王五',
        employeeNumber: '10001',
        phone: 'B4F5004',
        procedure: '肠胃科',
        job: '院长'
      }]
    }
  },
  computed: {
    getStatus () {
      return function (status) {
        if (Number.parseInt(status) === 1) {
          return '已解绑'
        } else {
          return '绑定中'
        }
      }
    },
    getStatusFormatter () {
      return function (status) {
        if (Number.parseInt(status) === 1) {
          return 'Info.vue'
        } else {
          return 'success'
        }
      }
    }
  },
  methods: {
    handleSearch () {
      console.info(`当前筛选条件：${this.search}`)
      console.info(`当前筛选条件：${this.patientType}`)
    },
    handleCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      console.info(`当前筛选条件：${this.search}`)
      console.info(`当前筛选条件：${this.patientType}`)
    },
    handleDeleteClick (id) {
      console.info(`当前记录id：${id}`)
    },
    handleEditClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/doctor_nurse/edit/${id}` })
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
