<template>
  <div class="home">
    <el-container>
      <el-header class="myml-header">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import Header from '@/components/Header.vue'

export default {
  name: 'home',
  components: {
    Header
  }
}
</script>
