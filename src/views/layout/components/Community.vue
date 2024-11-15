<template>
  <div class="community">
    <div class="sidebar">
      <el-menu
        :default-active="activeMenu"
        class="menu"
        @select="handleSelect"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.index"
          :index="item.index"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.title }}</span>
        </el-menu-item>
      </el-menu>
    </div>

    <div class="content-wrapper">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Office, ChatDotRound, Message } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('developers')

const menuItems = [
  { index: 'developers', icon: 'User', title: '开发者' },
  { index: 'companies', icon: 'Office', title: '企业' },
  { index: 'my-posts', icon: 'ChatDotRound', title: '我发出的回复' },
  { index: 'received-posts', icon: 'Message', title: '我收到的回复' },
]

watch(
  () => route.name,
  (newName) => {
    if (newName) {
      activeMenu.value = newName as string
    }
  }
)

const handleSelect = (key: string) => {
  router.push({ name: key })
}
</script>

<style scoped>
.community {
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.sidebar {
  width: 200px;
  flex-shrink: 0;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 20px;
}

.menu {
  border-right: none;
  width: 100%;
  border-radius: 8px;
  :deep(.el-menu-item:hover) {
    background-color: #f5f7fa;
  }
}

.content-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.content {
  width: 50vw;
  min-width: 600px;
  max-width: 800px;
  background: #fff;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
