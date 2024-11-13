<template>
  <div class="common-layout">
    <el-container>
      <el-header><HeaderTabs /></el-header>
      <el-main><RouterView /></el-main>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}

.el-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.el-header {
  background-color: #fff;
  height: 70px !important;
  line-height: normal;
  padding: 0 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.el-main {
  flex: 1;
  overflow-y: auto;
}
</style>
