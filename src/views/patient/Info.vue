<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>病人管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/patient/list' }">病人信息列表</el-breadcrumb-item>
      <el-breadcrumb-item>病人信息详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
      <el-table :data="userData" style="width: 100%" header-row-class-name="table-header">
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="hosNumber" label="住院号"></el-table-column>
        <el-table-column prop="wardsName" label="病区"></el-table-column>
        <el-table-column prop="bedNumber" label="床号"></el-table-column>
        <el-table-column prop="deviceName" label="设备"></el-table-column>
        <el-table-column prop="bindTime" label="绑定时间" width="170px"></el-table-column>
        <el-table-column prop="unbindTime" label="解绑时间" width="170px"></el-table-column>
        <el-table-column prop="unbindUserName" label="解绑操作人"></el-table-column>
        <el-table-column label="操作"  width="150px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleAlarm(scope.row.id)">处理</el-button>
            <el-button v-if="!scope.row.unbindUserId" type="primary" size="mini" @click="unbindPatient(scope.row.id)">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="line"></div>
      <el-table :data="deviceInfo" style="width: 100%" header-row-class-name="table-header">
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
      </el-table>
      <div class="line"></div>
      <el-table v-loading="loading" :data="alarmData" style="width: 100%" header-row-class-name="table-header" size="mini">
        <el-table-column label="报警历史" align="center">
          <el-table-column prop="oxygen" label="脉氧值"></el-table-column>
          <el-table-column prop="rate" label="脉率值"></el-table-column>
          <el-table-column prop="urgentLevel" label="紧急程度">
            <template slot-scope="scope">
              <el-tag :class="getLevelFormatter(scope.row.urgentLevel)" size="small" close-transition>{{getLevel(scope.row.urgentLevel)}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="处理状态">
            <template slot-scope="scope">
              <el-tag :class="getStatusFormatter(scope.row.state)" size="small" close-transition><strong>{{getStatus(scope.row.state)}}</strong></el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="addTime" label="时间" width="170px"></el-table-column>
          <el-table-column prop="userName" label="处理人"></el-table-column>
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
          <el-table-column prop="acqTime" label="时间" width="170px"></el-table-column>
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
import { getPatientInfo, unbindPatient } from '../../api/patient'
import { PAGE_SIZE } from '../../utils/default'
import { getPatientAlarmList, getPatientRecordList, handlePatientAlarm } from '../../api/alarm'
import { getUrgentLevelFormatterClass, getUrgentLevelFormatterHtml, getAlarmStateFormatterClass, getAlarmStateFormatterHtml, getDeviceBindFlagFormatterHtml, getDeviceBindFlagFormatterClass, getDeviceStateFormatterHtml, getDeviceStateFormatterClass } from '../../utils/format'
import { getDeviceInfo } from '../../api/device'

export default {
  data () {
    return {
      id: '',
      loading: false,
      userData: [],
      alarmTotalPage: 1,
      alarmCurrentPage: 1,
      alarmData: [],
      recordTotalPage: 1,
      recordCurrentPage: 1,
      recordData: [],
      deviceInfo: []
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
    },
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
    loadPatientData () {
      this.loading = true
      getPatientInfo(this.id).then(data => {
        this.userData = new Array(data.data)
        getDeviceInfo({ id: data.data.deviceId }).then(data => {
          this.deviceInfo = new Array(data.data)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }).catch(() => {
        this.loading = false
      })
    },
    loadAlarmData () {
      this.loading = true
      getPatientAlarmList({ current: this.alarmCurrentPage, size: PAGE_SIZE, patientId: this.id }).then(data => {
        this.alarmData = data.data.records
        this.alarmTotalPage = data.data.pages
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    loadRecordData () {
      this.loading = true
      getPatientRecordList({ current: this.recordCurrentPage, size: PAGE_SIZE, patientId: this.id }).then(data => {
        this.recordData = data.data.records
        this.recordTotalPage = data.data.pages
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleAlarmCurrentChange (currentPage) {
      this.alarmCurrentPage = currentPage
      this.loadAlarmData()
    },
    handleRecordCurrentChange (currentPage) {
      this.recordCurrentPage = currentPage
      this.loadRecordData()
    },
    handleAlarm (id) {
      this.loading = true
      handlePatientAlarm(id).then(() => {
        this.$message({
          type: 'success',
          message: '处理成功!'
        })
        this.loadAlarmData()
      }).catch(() => {
        this.loading = false
      })
    },
    unbindPatient (id) {
      this.$confirm('此操作解绑设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        unbindPatient(id).then(() => {
          this.$message({
            type: 'success',
            message: '解绑成功!'
          })
          getPatientInfo(this.id).then(data => {
            this.userData = new Array(data.data)
          })
        }).catch(() => {
          this.loading = false
        })
      })
    }
  },
  created () {
    this.id = this.$route.params.id
    this.loadPatientData()
    this.loadAlarmData()
    this.loadRecordData()
  }
}
</script>
