<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <div class="data-filter">
        <el-button type="text" >筛选：</el-button>

        <el-select v-model="state" style="margin-right: 10px">
          <el-option label="全部" value=""></el-option>
          <el-option label="正常" value="0"></el-option>
          <el-option label="故障" value="1"></el-option>
        </el-select>

        <el-select v-model="bind" style="margin-right: 10px">
          <el-option label="全部" value=""></el-option>
          <el-option label="已绑定" value="true"></el-option>
          <el-option label="未绑定" value="false"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%" header-row-class-name="table-header">
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="model" label="设备类型"></el-table-column>
        <el-table-column prop="power" label="电量"></el-table-column>
        <el-table-column prop="serialId" label="序列号"></el-table-column>
        <el-table-column prop="state" label="设备状态">
          <template slot-scope="scope">
            <el-tag :type="getStateFormatter(scope.row.state)" close-transition><strong>{{getState(scope.row.state)}}</strong></el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="bindFlag" label="绑定状态">
          <template slot-scope="scope">
            <el-tag :type="getBindFlagFormatter(scope.row.bindFlag)" close-transition><strong>{{getBindFlag(scope.row.bindFlag)}}</strong></el-tag>
          </template>
        </el-table-column>
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
import { getDeviceList, deleteDevice } from '../../api/device'
import { PAGE_SIZE } from '../../utils/default'
import { getDeviceBindFlagFormatterClass, getDeviceBindFlagFormatterHtml, getDeviceStateFormatterClass, getDeviceStateFormatterHtml } from '../../utils/format'

export default {
  data () {
    return {
      loading: false,
      state: '',
      bind: '',
      totalPage: 1,
      currentPage: 1,
      tableData: []
    }
  },
  computed: {
    getBindFlag () {
      return function (state) {
        return getDeviceBindFlagFormatterHtml(state)
      }
    },
    getBindFlagFormatter () {
      return function (state) {
        return getDeviceBindFlagFormatterClass(state)
      }
    },
    getState () {
      return function (state) {
        return getDeviceStateFormatterHtml(state)
      }
    },
    getStateFormatter () {
      return function (state) {
        return getDeviceStateFormatterClass(state)
      }
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getDeviceList({ current: this.currentPage, size: PAGE_SIZE, bind: this.bind, state: this.state }).then(data => {
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
    handleDeleteClick (id) {
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteDevice({ id: id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadData()
        }).catch(() => {
          this.loading = false
        })
      })
    },
    handleEditClick (id) {
      this.$router.push({ path: `/device/edit/${id}` })
    }
  },
  created () {
    this.loadData()
  }
}
</script>
