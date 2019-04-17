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
          <el-select v-model="patientType" slot="prepend">
            <el-option label="全部" value="1"></el-option>
            <el-option label="绑定中" value="2"></el-option>
            <el-option label="已解绑" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="hospitalizationNumber" label="住院号"></el-table-column>
        <el-table-column prop="procedure" label="病区"></el-table-column>
        <el-table-column prop="bedNumber" label="床号"></el-table-column>
        <el-table-column prop="startTime" label="绑定时间" width="170px"></el-table-column>
        <el-table-column prop="endTime" label="解绑时间" width="170px"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusFormatter(scope.row.status)" close-transition>{{getStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleShowClick(scope.row.id)" type="text" size="small">查看</el-button>
            <el-button @click="handleEditClick(scope.row.id)" type="text" size="small">编辑</el-button>
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
import { getNurseList } from '../../api/user'
import { PAGE_SIZE } from '../../utils/default'

export default {
  data () {
    return {
      loading: false,
      totalPage: 1,
      currentPage: 1,
      tableData: []
    }
  },
  computed: {
  },
  methods: {
    loadData () {
      this.loading = true
      getNurseList({ current: this.currentPage, size: PAGE_SIZE }).then(data => {
        this.tableData = data.data.records
        this.totalPage = data.data.pages
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleSearch () {
      console.info(`当前筛选条件：${this.search}`)
      console.info(`当前筛选条件：${this.patientType}`)
    },
    handleCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      console.info(`当前筛选条件：${this.search}`)
      console.info(`当前筛选条件：${this.patientType}`)
    },
    handleShowClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/patient/info/${id}` })
    },
    handleEditClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/patient/edit/${id}` })
    }
  },
  created () {
    this.loadData()
  }
}
</script>
