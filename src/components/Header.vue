<template>
  <el-menu
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#fff"
    router>
    <el-menu-item route="/home">首页</el-menu-item>
    <el-menu-item  class="logout" route="/logout">退出</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {
    handleSelect (key) {
      console.log(key)
    }
  }
}
</script>

<style scoped>

</style>
