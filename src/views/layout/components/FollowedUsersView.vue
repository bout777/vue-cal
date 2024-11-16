<template>
  <div class="followed-users-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关注的用户</span>
        </div>
      </template>

      <el-scrollbar class="infinite-list" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <div v-if="!initLoaded" class="loading-wrapper">
          <el-skeleton :rows="3" animated />
        </div>

        <template v-else>
          <user-card v-for="userId in followedUserIds" :key="userId" :userId="userId" />
        </template>
        <div v-if="loading" class="loading-wrapper">加载中</div>
        <div v-if="noMore" class="no-more">没有更多了</div>
      </el-scrollbar>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user'
import UserCard from '@/components/UserCard.vue'
const route = useRoute()
const loading = ref(false)
const noMore = ref(false)
const followedUserIds = ref([])
const page = ref(1)
const pageSize = 10

// 计算是否禁用无限滚动
const disabled = computed(() => loading.value || noMore.value)


const initLoaded = ref(false)
const initLoad = async () => {
  if (initLoaded.value) return
  setTimeout(() => {
    initLoaded.value = true
  }, 1000)
}
// 修改 loadMore 函数使用测试数据
const load = async () => {
  console.log("loading")
  if (loading.value) return

  loading.value = true
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟获取数据
    const start = (page.value - 1) * pageSize
    const newUsers = Array.from({ length: pageSize }, (_, i) => start + i + 1)

    // 模拟数据到达上限
    if (page.value >= 5) {
      noMore.value = true
      return
    }

    followedUserIds.value.push(...newUsers)
    page.value++
  } catch (error) {
    ElMessage.error('加载失败，请重试')
  } finally {
    loading.value = false
  }
}



// 添加 onMounted 钩子
onMounted(() => {
  initLoad()
})
</script>

<style scoped>
.followed-users-container {
  padding: 20px;
}

.infinite-list {
  height: calc(100vh - 200px);
  overflow-y: hidden;
}

.infinite-list :deep(.el-scrollbar__wrap) {
  overflow-x: hidden;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.user-item:last-child {
  border-bottom: none;
}

.user-info {
  flex: 1;
  margin-left: 16px;
}

.username {
  font-weight: bold;
  margin-bottom: 4px;
}

.bio {
  color: #666;
  font-size: 14px;
}

.loading-wrapper {
  padding: 16px;
}

.no-more {
  text-align: center;
  color: #999;
  padding: 16px;
}
</style>
