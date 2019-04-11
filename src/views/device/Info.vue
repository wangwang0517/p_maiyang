<template>
  <div class="myml-main about">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }"><font-awesome-icon icon="home"/> 首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/device/list' }">设备列表</el-breadcrumb-item>
      <el-breadcrumb-item>设备详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line"></div>
    <div class="information">
    </div>
  </div>
</template>
