<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
      <el-breadcrumb-item>病人信息列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <el-table v-loading="loading" :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column label="值班护士">
          <template slot-scope="scope">
            <el-select v-model="scope.row.userId" filterable placeholder="请选择" @change="changeUser($event, scope.row.id)">
              <el-option
                v-for="item in nurseList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
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
import { getWardsList, deleteWards, setNurse } from '../../api/wards'
import { PAGE_SIZE, ALL_RECORD } from '../../utils/default'
import { getNurseList } from '../../api/user'

export default {
  data () {
    return {
      nurseList: [],
      totalPage: 1,
      currentPage: 1,
      loading: true,
      tableData: []
    }
  },
  methods: {
    loadData () {
      this.loading = true
      getWardsList({ current: this.currentPage, size: PAGE_SIZE }).then(data => {
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
      this.$confirm('此操作将永久删除该, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        deleteWards({ id: id }).then(() => {
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
    changeUser (value, id) {
      this.loading = true
      let formData = new FormData()
      formData.append('id', id)
      formData.append('userId', value)
      setNurse(formData).then(() => {
        this.$message({
          type: 'success',
          message: '设置成功!'
        })
        this.loadData()
      }).catch(err => {
        console.info(err)
      })
    }
  },
  created () {
    this.loadData()
    getNurseList({ current: 1, size: ALL_RECORD }).then(data => {
      this.nurseList = data.data.records.map(item => {
        return {
          value: item.id,
          label: item.name
        }
      })
    })
  }
}
</script>
