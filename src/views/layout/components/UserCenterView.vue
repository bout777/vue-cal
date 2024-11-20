<template>
  <div class="user-center">
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
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Star, List, ChatDotRound, Message } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()
const activeMenu = ref('profile')

const menuItems = [
  { index: 'profile', icon: 'User', title: '个人资料' },
  { index: 'followed-users', icon: 'UserFilled', title: '关注的用户' },
  { index: 'followed-demands', icon: 'Star', title: '我关注的需求' },
  { index: 'published-demands', icon: 'List', title: '我发布的需求' },
]

// 监听路由变化
watch(
  () => route.name,
  (newName) => {
    if (newName) {
      activeMenu.value = newName as string
    }
  }
)

const userId = ref(route.params.userId)

const handleSelect = (key: string) => {
  router.push({ name: key, params: { userId: userId.value } })
}

onMounted(() => {
  console.log('路径参数',route.params.userId)
}
)
</script>

<style scoped>
.user-center {
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  background-color: #f5f7fa;
}

.sidebar {
  width: 200px;
  height: 100%;
  flex-shrink: 0;
  background-color: #f7f7f7;

  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.01);
  position: fixed;
}

.menu {
  border-right: none;
  width: 100%;

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
  padding: 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>
