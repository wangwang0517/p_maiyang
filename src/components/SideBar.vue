<template>
  <el-menu
    :default-active="this.$route.path"
    class="myml-el-menu-vertical"
    :collapse="isCollapse"
    unique-opened
    background-color="#545c64"
    text-color="#909399"
    router>
    <el-submenu index="alarm" v-if="this.$store.state.permission == 'USER'">
      <template slot="title">
        <font-awesome-icon icon="heartbeat" />
        <span slot="title" class="menu-label">
          报警管理
          <sup v-if="this.$store.state.waringCount > 0" class="el-badge__content el-badge__content--undefined is-fixed">!</sup>
        </span>
      </template>
      <el-menu-item index="/alarm">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">
          报警信息
          <sup v-if="this.$store.state.waringCount > 0" class="el-badge__content el-badge__content--undefined is-fixed">{{this.$store.state.waringCount}}</sup>
        </span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="patients" v-if="this.$store.state.permission == 'USER'">
      <template slot="title">
        <font-awesome-icon icon="user-injured" />
        <span slot="title" class="menu-label">病人管理</span>
      </template>
      <el-menu-item index="/patient/new">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建病人信息</span>
      </el-menu-item>
      <el-menu-item index="/patient/list">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">病人信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="device" v-if="this.$store.state.permission == 'ADMIN'">
      <template slot="title">
        <font-awesome-icon icon="stopwatch" />
        <span slot="title" class="menu-label">设备管理</span>
      </template>
      <el-menu-item index="/device/new">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建设备信息</span>
      </el-menu-item>
      <el-menu-item index="/device/list">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">设备信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="doctor_nurse" v-if="this.$store.state.permission == 'ADMIN'">
      <template slot="title">
        <font-awesome-icon icon="user-md" />
        <span slot="title" class="menu-label">医护管理</span>
      </template>
      <el-menu-item index="/doctor_nurse/new">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建医护信息</span>
      </el-menu-item>
      <el-menu-item index="/doctor_nurse/list">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">医护信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="procedure" v-if="this.$store.state.permission == 'ADMIN'">
      <template slot="title">
        <font-awesome-icon icon="procedures" />
        <span slot="title" class="menu-label">病区管理</span>
      </template>
      <el-menu-item index="/procedure/new">
        <font-awesome-icon icon="plus-square" />
        <span slot="title" class="menu-label">新建病区</span>
      </el-menu-item>
      <el-menu-item index="/procedure/list">
        <font-awesome-icon icon="clipboard-list" />
        <span slot="title" class="menu-label">病区信息列表</span>
      </el-menu-item>
    </el-submenu>

    <el-submenu index="system" v-if="this.$store.state.permission == 'ADMIN'">
      <template slot="title">
        <font-awesome-icon icon="user-shield" />
        <span slot="title" class="menu-label">管理员</span>
      </template>
      <el-menu-item index="/system/edit">
        <font-awesome-icon icon="edit" />
        <span slot="title" class="menu-label">修改信息</span>
      </el-menu-item>
      <el-menu-item index="/system/about">
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
import store from '../store'
import VueSocketIO from 'vue-socket.io'
export default {
  props: {
    isCollapse: {
      default: false
    }
  },
  name: 'SideBar',
  created () {
    if (this.$store.state.permission === 'USER') {
      /* eslint-disable no-new */
      new VueSocketIO({
        debug: true,
        connection: '118.190.36.51:6789',
        vuex: {
          store,
          mutationPrefix: 'SOCKET_',
          actionPrefix: 'SOCKET_'
        },
        options: {
          query: 'token=' + store.state.token,
          path: '/info',
          autoConnect: true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  span.menu-label{
    position: relative;
    padding-left: 5px;
    padding-right: 15px;
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
