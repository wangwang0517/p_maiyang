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
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="nurse" label="值班护士"></el-table-column>
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
      search: '',
      totalPage: 100,
      currentPage: 3,
      tableData: [{
        id: 3,
        name: '肠胃科',
        phone: '12232222',
        nurse: '张三'
      }, {
        id: 2,
        nurse: '李四',
        phone: '10004',
        name: '肠胃科'
      }, {
        id: 1,
        nurse: '王五',
        phone: '10001',
        name: '肠胃科'
      }]
    }
  },
  methods: {
    handleCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      console.info(`当前筛选条件：${this.search}`)
    },
    handleDeleteClick (id) {
      console.info(`当前记录id：${id}`)
    },
    handleEditClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/procedure/edit/${id}` })
    }
  }
}
</script>
