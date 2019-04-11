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
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-select v-model="deviceType" slot="prepend">
            <el-option label="全部" value="1"></el-option>
            <el-option label="正常" value="2"></el-option>
            <el-option label="故障" value="3"></el-option>
          </el-select>
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header">
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="type" label="设备类型"></el-table-column>
        <el-table-column prop="series" label="序列号"></el-table-column>
        <el-table-column prop="user" label="绑定的用户">
          <template slot-scope="scope">
            <el-button @click="handleUserClick(scope.row.user.id)" type="text" size="mini">{{scope.row.user.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusFormatter(scope.row.status)" close-transition>{{getStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
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
export default {
  data () {
    return {
      deviceType: '1',
      search: '',
      totalPage: 100,
      currentPage: 3,
      tableData: [{
        id: 3,
        name: '设备三',
        type: '型号三',
        series: '123456789',
        user: {
          id: 1,
          name: '王五'
        },
        status: '0'
      }, {
        id: 2,
        name: '设备二',
        type: '型号二',
        series: '123456789',
        user: {
          id: 2,
          name: '张三'
        },
        status: '0'
      }, {
        id: 1,
        name: '设备一',
        type: '型号一',
        series: '123456789',
        user: { },
        status: '0'
      }]
    }
  },
  computed: {
    getStatus () {
      return function (status) {
        if (Number.parseInt(status) === 1) {
          return '故障'
        } else {
          return '正常'
        }
      }
    },
    getStatusFormatter () {
      return function (status) {
        if (Number.parseInt(status) === 1) {
          return 'danger'
        } else {
          return 'success'
        }
      }
    }
  },
  methods: {
    handleSearch () {
      console.info(`当前筛选条件：${this.search}`)
      console.info(`当前筛选条件：${this.deviceType}`)
    },
    handleCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      console.info(`当前筛选条件：${this.search}`)
      console.info(`当前筛选条件：${this.deviceType}`)
    },
    handleUserClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/patient/info/${id}` })
    },
    handleEditClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/device/edit/${id}` })
    }
  }
}
</script>
