<template>
  <div id="app" >
    <el-container>
      <el-header class="myml-header" v-if="!this.$route.meta.hiddenCommonComponents" v-cloak>
        <Header v-on:changeCollapseStatus="changeCollapseStatus"></Header>
      </el-header>
      <el-container class="myml-container">
        <el-aside width="auto" class="myml-side-bar"  v-if="!this.$route.meta.hiddenCommonComponents" v-cloak>
          <side-bar :isCollapse="isCollapse"></side-bar>
        </el-aside>
        <el-main style="padding: 0">
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
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    Header,
    SideBar
  },
  methods: {
    changeCollapseStatus () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="scss">

</style>
