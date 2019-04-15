<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>报警管理</el-breadcrumb-item>
      <el-breadcrumb-item>报警信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <div class="data-filter">
        <el-button type="text" >筛选：</el-button>
        <el-button size="mini" type="primary" @click="getTableData('')" :plain="state !== '' ">全部</el-button>
        <el-button size="mini" type="primary" @click="getTableData(1)" :plain="state !== 1 ">已读</el-button>
        <el-button size="mini" type="primary" @click="getTableData(0)" :plain="state !== 0 ">未读</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="patientName" label="姓名"></el-table-column>
        <el-table-column prop="hosNumber" label="住院号"></el-table-column>
        <el-table-column prop="bedNumber" label="床号"></el-table-column>
        <el-table-column prop="oxygen" label="脉氧值"></el-table-column>
        <el-table-column prop="rate" label="脉率值"></el-table-column>
        <el-table-column prop="urgentLevel" label="紧急程度">
          <template slot-scope="scope">
            <el-tag :class="getLevelFormatter(scope.row.urgentLevel)" close-transition>{{getLevel(scope.row.urgentLevel)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="处理状态">
          <template slot-scope="scope">
            <el-tag :class="getStatusFormatter(scope.row.state)" close-transition><strong>{{getStatus(scope.row.state)}}</strong></el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="addTime" label="时间" width="170px"></el-table-column>
        <el-table-column prop="userName" label="处理人"></el-table-column>
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
import { getAlarmList } from '../../api/alarm'
import { PAGE_SIZE } from '../../utils/default'
import { getUrgentLevelFormatterClass, getUrgentLevelFormatterHtml, getAlarmStateFormatterClass, getAlarmStateFormatterHtml } from '../../utils/format'

export default {
  data () {
    return {
      totalPage: 1,
      currentPage: 1,
      state: '',
      tableData: []
    }
  },
  computed: {
    getLevel () {
      return function (level) {
        return getUrgentLevelFormatterHtml(level)
      }
    },
    getStatus () {
      return function (state) {
        return getAlarmStateFormatterHtml(state)
      }
    },
    getLevelFormatter () {
      return function (level) {
        return getUrgentLevelFormatterClass(level)
      }
    },
    getStatusFormatter () {
      return function (state) {
        return getAlarmStateFormatterClass(state)
      }
    }
  },
  methods: {
    loadData () {
      getAlarmList({ current: this.currentPage, size: PAGE_SIZE, state: this.state }).then(data => {
        this.tableData = data.data.records
        this.totalPage = data.data.pages
      })
    },
    getTableData (type) {
      this.state = type
      this.currentPage = 1
      this.loadData()
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.loadData()
    }
  },
  created () {
    this.loadData()
  }
}
</script>
