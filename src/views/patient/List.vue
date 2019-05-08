<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
      <el-breadcrumb-item>病人信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <div class="data-filter">
        <el-button type="text" >筛选：</el-button>
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-select v-model="history" slot="prepend">
            <el-option label="全部" value=""></el-option>
            <el-option label="绑定中" value="false"></el-option>
            <el-option label="已解绑" value="true"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="hosNumber" label="住院号"></el-table-column>
        <el-table-column prop="wardsName" label="病区"></el-table-column>
        <el-table-column prop="bedNumber" label="床号"></el-table-column>
        <el-table-column prop="deviceNameValue" label="设备"></el-table-column>
        <el-table-column prop="bindTime" label="绑定时间" width="170px"></el-table-column>
        <el-table-column prop="unbindTime" label="解绑时间" width="170px"></el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleShowClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="handleEditClick(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button v-if="isShowUnbind(scope.row.unbindTime)" @click="handleUnbindClick(scope.row.id)" type="text" size="small">设备解绑</el-button>
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
import { getPatientList, unbindPatient } from '../../api/patient'
import { PAGE_SIZE } from '../../utils/default'

export default {
  data () {
    return {
      loading: true,
      history: false,
      search: '',
      totalPage: 1,
      currentPage: 1,
      tableData: []
    }
  },
  computed: {
    isShowUnbind () {
      return function (unbindTime) {
        return (unbindTime == null)
      }
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getPatientList({ current: this.currentPage, size: PAGE_SIZE, history: this.history, search: this.search }).then(data => {
        this.tableData = data.data.records
        this.totalPage = data.data.pages
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSearch () {
      this.loadData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.loadData()
    },
    handleShowClick (id) {
      this.$router.push({ path: `/patient/info/${id}` })
    },
    handleEditClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/patient/edit/${id}` })
    },
    handleUnbindClick (id) {
      this.$confirm('此操作解绑设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        unbindPatient(id).then(() => {
          this.$message({
            type: 'success',
            message: '解绑成功!'
          })
          this.loadData()
        }).catch(() => {
          this.loading = false
        })
      })
    }
  },
  created () {
    this.loadData()
  }
}
</script>
