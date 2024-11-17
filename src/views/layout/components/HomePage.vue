<template>
  <el-scrollbar>
  <div class="common-layout">
    <el-container v-infinite-scroll="() => { emitter.emit('infiniteScroll')
     }" :infinite-scroll-disabled="disabled">
      <el-header><HeaderTabs /></el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
    </div>
  </el-scrollbar>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { emitter } from '@/utils/emitter'

const disabled = ref(false)
onMounted(() => {
  emitter.on('disabled', (disabled) => {
    disabled.value = disabled
    console.log('disabled_val', disabled)
  })
})
</script>
<style scoped>
.common-layout {
  width: 100%;
  min-height: 100vh;
}

.el-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.el-header {
  background-color: #fff;
  height: 70px !important;
  line-height: normal;
  padding: 0 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.el-main {
  flex: 1;
  padding: 0;
}
</style>
