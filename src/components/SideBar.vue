<template>
  <el-menu
    :default-active="this.$route.path"
    class="myml-el-menu-vertical"
    :collapse="isCollapse"
    unique-opened
    background-color="#545c64"
    text-color="#909399"
    router>
    <el-submenu index="heartbeat">
      <template slot="title">
        <font-awesome-icon icon="heartbeat" />
        <span slot="title" class="menu-label">报警管理</span>
      </template>
      <el-menu-item index="/heartbeat">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">报警信息</span>
      </el-menu-item>
      <el-menu-item index="/heartbeatHistory">
        <font-awesome-icon icon="history" />
        <span slot="title" class="menu-label">报警查询</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="patients">
      <template slot="title">
        <font-awesome-icon icon="user-injured" />
        <span slot="title" class="menu-label">病人管理</span>
      </template>
      <el-menu-item index="/newPatient">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建病人信息</span>
      </el-menu-item>
      <el-menu-item index="/patientList">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">病人信息列表</span>
      </el-menu-item>
      <el-menu-item index="/patientHistory">
        <font-awesome-icon icon="history" />
        <span slot="title" class="menu-label">历史病人信息</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="device">
      <template slot="title">
        <font-awesome-icon icon="stopwatch" />
        <span slot="title" class="menu-label">设备管理</span>
      </template>
      <el-menu-item index="/newDevice">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建设备信息</span>
      </el-menu-item>
      <el-menu-item index="/deviceList">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">设备信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="doctorNurse">
      <template slot="title">
        <font-awesome-icon icon="user-md" />
        <span slot="title" class="menu-label">医护管理</span>
      </template>
      <el-menu-item index="/newDoctorNurse">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建医护信息</span>
      </el-menu-item>
      <el-menu-item index="/doctorNurseList">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">医护信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="procedures">
      <template slot="title">
        <font-awesome-icon icon="procedures" />
        <span slot="title" class="menu-label">病区与值班管理</span>
      </template>
      <el-menu-item index="/newProcedure">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建值班信息</span>
      </el-menu-item>
      <el-menu-item index="/proceduresList">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">值班信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="system-admin">
      <template slot="title">
        <font-awesome-icon icon="user-shield" />
        <span slot="title" class="menu-label">管理员</span>
      </template>
      <el-menu-item index="/editSystemAdmin">
        <font-awesome-icon icon="edit" />
        <span slot="title" class="menu-label">修改信息</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <font-awesome-icon icon="info-circle" />
        <span slot="title" class="menu-label">关于我们</span>
      </el-menu-item>
      <el-menu-item index="/logout">
        <font-awesome-icon icon="power-off" />
        <span slot="title" class="menu-label">退出登录</span>
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props: {
    isCollapse: {
      default: false
    }
  },
  name: 'SideBar'
}
</script>

<style lang="scss" scoped>
  span.menu-label{
    padding-left: 5px;
  }
  .myml-el-menu-vertical{
    overflow: hidden;
    .el-menu-item.is-active{
      color: #fff;
    }
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
</style>
