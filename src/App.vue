<template>
  <div id="app">
    <el-container>
      <el-header class="myml-header" v-if="!this.$route.meta.hiddenCommonComponents">
        <Header></Header>
      </el-header>
      <el-container class="myml-container">
        <el-aside width="200px" class="myml-side-bar"  v-if="!this.$route.meta.hiddenCommonComponents">
          <side-bar></side-bar>
        </el-aside>
        <el-main class="myml-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import SideBar from '@/components/SideBar.vue'
export default {
  components: {
    Header,
    SideBar
  }
}
</script>

<style lang="scss">

</style>
