<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fff"
    router>
    <el-menu-item class="logo" index="home">脉氧脉率管理后台</el-menu-item>
    <el-menu-item v-on:click="changeCollapse">
      <font-awesome-icon icon="layer-group" />
    </el-menu-item>
    <el-menu-item  class="logout" index="/logout" >
      <font-awesome-icon icon="power-off" />
      退出
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    changeCollapse: function () {
      this.$emit('changeCollapseStatus')
    }
  }
}
</script>

<style scoped>

</style>
