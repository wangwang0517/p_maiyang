<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item><font-awesome-icon icon="user-injured" /> 病人管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/patient/list' }"><font-awesome-icon icon="clipboard-list" /> 病人信息列表</el-breadcrumb-item>
      <el-breadcrumb-item><font-awesome-icon icon="address-card" /> 病人信息详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <el-table :data="userData" style="width: 100%" header-row-class-name="table-header">
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="hospitalizationNumber" label="住院号"></el-table-column>
        <el-table-column prop="procedure" label="病区"></el-table-column>
        <el-table-column prop="bedNumber" label="床号"></el-table-column>
        <el-table-column prop="devise" label="设备">
          <template slot-scope="scope">
            <el-button @click="handleDeviceClick(scope.row.id)" type="text" size="small">{{scope.row.devise}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="绑定时间" width="170px"></el-table-column>
        <el-table-column prop="endTime" label="解绑时间" width="170px"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <el-tag  :type="getStatusFormatter(scope.row.status)" close-transition>{{getStatus(scope.row.status)}}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="line"></div>
      <el-table :data="alarmData" style="width: 100%" header-row-class-name="table-header" size="mini">
        <el-table-column label="报警历史" align="center">
          <el-table-column prop="oxygen" label="脉氧值"></el-table-column>
          <el-table-column prop="rate" label="脉率值"></el-table-column>
          <el-table-column prop="level" label="紧急程度">
            <template slot-scope="scope">
              <el-tag size="mini" :type="getLevelFormatter(scope.row.level)" close-transition>{{getLevel(scope.row.level)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="处理状态">
            <template slot-scope="scope">
              <el-tag size="mini" :type="getStatusFormatter(scope.row.status)" close-transition>{{getStatus(scope.row.status)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="time" label="时间" width="170px"></el-table-column>
          <el-table-column prop="processor" label="处理人"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="alarmTotalPage"
        :current-page.sync="alarmCurrentPage"
        @current-change="handleAlarmCurrentChange">
      </el-pagination>
      <div class="line"></div>
      <el-table :data="recordData" style="width: 100%" header-row-class-name="table-header" size="mini" >
        <el-table-column label="脉氧脉率历史" align="center">
          <el-table-column prop="oxygen" label="脉氧值"></el-table-column>
          <el-table-column prop="rate" label="脉率值"></el-table-column>
          <el-table-column prop="time" label="时间" width="170px"></el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="recordTotalPage"
        :current-page.sync="recordCurrentPage"
        @current-change="handleRecordCurrentChange">
      </el-pagination>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: [{
        id: 3,
        username: '张三',
        hospitalizationNumber: '10003',
        bedNumber: 'B4F5001',
        procedure: '肠胃科',
        startTime: '2018-04-06 12:34:45',
        endTime: '2018-04-10 12:34:45',
        status: '1',
        devise: '设备1'
      }],
      alarmTotalPage: 100,
      alarmCurrentPage: 3,
      alarmData: [{
        oxygen: '89',
        rate: '70',
        level: '1',
        status: '1',
        time: '2018-04-10 12:34:45',
        processor: '张医生'
      }, {
        oxygen: '99',
        rate: '83',
        level: '2',
        status: '0',
        time: '2018-04-10 12:34:45',
        processor: ''
      }, {
        oxygen: '79',
        rate: '63',
        level: '3',
        status: '0',
        time: '2018-04-10 12:34:45',
        processor: ''
      }],
      recordTotalPage: 100,
      recordCurrentPage: 3,
      recordData: [{
        oxygen: '89',
        rate: '70',
        time: '2018-04-10 12:34:45'
      }, {
        oxygen: '99',
        rate: '83',
        time: '2018-04-10 12:34:45'
      }, {
        oxygen: '79',
        rate: '63',
        time: '2018-04-10 12:34:45'
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
    },
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
    }
  },
  methods: {
    handleDeviceClick (id) {
      console.info(`当前记录id：${id}`)
      this.$router.push({ path: `/device/info/${id}` })
    },
    handleAlarmCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      this.$notify({
        message: `页面：${currentPage}`,
        showClose: false
      })
    },
    handleRecordCurrentChange (currentPage) {
      console.info(`当前页面：${currentPage}`)
      this.$notify({
        message: `页面：${currentPage}`,
        showClose: false
      })
    }
  }
}
</script>
