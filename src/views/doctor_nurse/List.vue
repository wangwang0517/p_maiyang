<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>医护管理</el-breadcrumb-item>
      <el-breadcrumb-item>医护信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="workno" label="工号"></el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="wardsName" label="病区"></el-table-column>
        <el-table-column prop="typeName" label="职称" ></el-table-column>
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
import { getNurseList } from '../../api/user'
import { PAGE_SIZE } from '../../utils/default'

export default {
  data () {
    return {
      loading: false,
      procedureType: '',
      procedureList: [],
      search: '',
      tableDataType: 0,
      totalPage: 1,
      currentPage: 1,
      tableData: []
    }
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
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.loadData()
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
    this.loadData()
  }
}
</script>
