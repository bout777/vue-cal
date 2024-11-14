<template>
  <div class="header-container">
    <el-tabs
      v-model="activeTab"
      class="header-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="item in tabItems"
        :key="item.name"
        :label="item.label"
        :name="item.name"
      />
    </el-tabs>

    <div class="user-profile">
      <el-dropdown @command="handleCommand">
        <div class="avatar-container">
          <el-avatar
            :size="40"
            :src="userAvatar"
            @error="() => true"
          >
            <el-icon><UserFilled /></el-icon>
          </el-avatar>
          <el-icon class="el-icon--right"><CaretBottom /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <el-icon><User /></el-icon>个人中心
            </el-dropdown-item>
            <el-dropdown-item command="settings">
              <el-icon><Setting /></el-icon>设置
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <el-icon><SwitchButton /></el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserFilled, CaretBottom, User, Setting, SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()
const activeTab = ref('home')
const userAvatar = ref('') // 这里可以设置用户头像URL

const tabItems = [
  { label: '首页', name: 'home' },
  { label: '需求榜', name: 'demands' },
  { label: '公告栏', name: 'announcements' },
  { label: '关于', name: 'about' },
  { label: '个人中心', name: 'profile' }
]

const handleClick = (tab: any) => {
  router.push({ name: tab.props.name })
}

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push({ name: 'profile' })
      break
    case 'settings':
      router.push({ name: 'settings' })
      break
    case 'logout':
      // 处理登出逻辑
      console.log('logout')
      break
  }
}
</script>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

.header-tabs {
  flex: 1;
}

.user-profile {
  margin-left: 20px;
}

.avatar-container {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.avatar-container .el-icon--right {
  margin-left: 4px;
  font-size: 12px;
  color: #909399;
}

:deep(.el-dropdown-menu__item) {
  display: flex;
  align-items: center;
  gap: 8px;
}

:deep(.el-dropdown-menu__item .el-icon) {
  margin-right: 4px;
}
</style>
