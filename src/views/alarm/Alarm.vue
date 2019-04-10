<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">
        <font-awesome-icon icon="home"/>
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <font-awesome-icon icon="heartbeat"/>
        报警管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        <font-awesome-icon icon="clipboard-list"/>
        报警信息
      </el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <div class="data-filter">
        <el-button type="text" >筛选：</el-button>
        <el-button size="mini" type="primary" @click="getTableData(0)" :plain="tableDataType !== 0 ">全部</el-button>
        <el-button size="mini" type="primary" @click="getTableData(1)" :plain="tableDataType !== 1 ">已读</el-button>
        <el-button size="mini" type="primary" @click="getTableData(-1)" :plain="tableDataType !== -1 ">未读</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="hospitalizationNumber" label="住院号"></el-table-column>
        <el-table-column prop="bedNumber" label="床号"></el-table-column>
        <el-table-column prop="oxygen" label="脉氧值"></el-table-column>
        <el-table-column prop="rate" label="脉率值"></el-table-column>
        <el-table-column prop="level" label="紧急程度">
          <template slot-scope="scope">
            <el-tag :type="getLevelFormatter(scope.row.level)" close-transition>{{getLevel(scope.row.level)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="处理状态">
          <template slot-scope="scope">
            <el-tag :type="getStatusFormatter(scope.row.status)" close-transition>{{getStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="170px"></el-table-column>
        <el-table-column prop="processor" label="处理人"></el-table-column>
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
      tableDataType: 0,
      totalPage: 100,
      currentPage: 3,
      tableData: [{
        username: '张三',
        hospitalizationNumber: '10003',
        bedNumber: 'B4F5001',
        oxygen: '89',
        rate: '70',
        level: '1',
        status: '1',
        time: '2018-04-10 12:34:45',
        processor: '张医生'
      }, {
        username: '李四',
        hospitalizationNumber: '10004',
        bedNumber: 'B4F5002',
        oxygen: '99',
        rate: '83',
        level: '2',
        status: '0',
        time: '2018-04-10 12:34:45',
        processor: ''
      }, {
        username: '王五',
        hospitalizationNumber: '10001',
        bedNumber: 'B4F5004',
        oxygen: '79',
        rate: '63',
        level: '3',
        status: '0',
        time: '2018-04-10 12:34:45',
        processor: ''
      }]
    }
  },
  computed: {
    getLevel () {
      return function (level) {
        switch (Number.parseInt(level)) {
          case 1 :
            return '一级'
          case 2 :
            return '二级'
          case 3 :
            return '三级'
          case 4 :
            return '四级'
          default:
            return '其他'
        }
      }
    },
    getStatus () {
      return function (status) {
        if (Number.parseInt(status) === 1) {
          return '已处理'
        } else {
          return '未处理'
        }
      }
    },
    getLevelFormatter () {
      return function (level) {
        switch (Number.parseInt(level)) {
          case 1 :
            return 'success'
          case 2 :
            return 'Info.vue'
          case 3 :
            return 'warning'
          case 4 :
            return 'danger'
          default:
            return ''
        }
      }
    },
    getStatusFormatter () {
      return function (status) {
        if (Number.parseInt(status) === 1) {
          return 'success'
        } else {
          return 'danger'
        }
      }
    }
  },
  methods: {
    getTableData (type) {
      this.tableDataType = type
      this.$notify({
        message: `筛选条件：${this.tableDataType}`,
        showClose: false
      })
    },
    handleCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      console.info(`当前筛选条件：${this.tableDataType}`)
      this.$notify({
        message: `页面：${currentPage}，筛选条件：${this.tableDataType}`,
        showClose: false
      })
    }
  }
}
</script>
