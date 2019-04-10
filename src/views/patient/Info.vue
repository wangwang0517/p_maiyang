<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item><font-awesome-icon icon="user-injured" /> 病人管理</el-breadcrumb-item>
      <el-breadcrumb-item><font-awesome-icon icon="address-card" /> 病人信息详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <el-table :data="tableData" style="width: 100%" header-row-class-name="table-header" align="center">
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
      </el-table>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: 3,
        username: '张三',
        hospitalizationNumber: '10003',
        bedNumber: 'B4F5001',
        procedure: '肠胃科',
        startTime: '2018-04-06 12:34:45',
        endTime: '2018-04-10 12:34:45',
        status: '1'
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
  }
}
</script>
