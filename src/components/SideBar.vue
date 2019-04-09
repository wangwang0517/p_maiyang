<template>
  <el-menu
    :default-active="this.$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#909399"
    active-text-color="#fff"
    router>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item index="">about</el-menu-item>
      <el-menu-item index="1-4-1">选项1</el-menu-item>
    </el-submenu>
    <el-submenu index="1-4">
      <template slot="title"><i class="el-icon-setting"></i>病人</template>
      <el-menu-item index="1-4-1">病人详情</el-menu-item>
      <el-menu-item index="1-4-2">设备详情</el-menu-item>
    </el-submenu>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">设备</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-document"></i>
      <span slot="title">医护</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-setting"></i>
      <span slot="title">病区与值班管理</span>
    </el-menu-item>
    <el-submenu index="system-admin">
      <template slot="title">
        <i class="el-icon-setting"></i>
        <span>管理员</span>
      </template>
      <el-menu-item index="/editSystemAdmin">修改信息</el-menu-item>
      <el-menu-item index="/about">关于我们</el-menu-item>
      <el-menu-item index="/logout">退出登录</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: 'SideBar',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
