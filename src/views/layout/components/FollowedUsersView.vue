<template>
  <div class="followed-users-container">
    <el-card
      class="box-card"
    >
      <template #header>
        <div class="card-header">
          <span>关注的用户</span>
        </div>
      </template>

      <div class="content-wrapper">
        <div v-if="!initLoaded" class="loading-wrapper">
          <el-skeleton :rows="3" animated />
        </div>

        <template v-else>
          <ul>
          <user-card v-for="userId in followedUserIds" :key="userId" :userId="userId" />
          </ul>
        </template>

        <div v-if="loading" class="loading-wrapper">加载中</div>
        <div v-if="noMore" class="no-more">没有更多了</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import UserCard from '@/components/UserCard.vue'
import { emitter } from '@/utils/emitter'

const route = useRoute()
const loading = ref(false)
const noMore = ref(false)
const followedUserIds = ref([])
const page = ref(1)
const pageSize = 10
const initLoaded = ref(false)

// 计算是否禁用加载
const disabled = computed(() => loading.value || noMore.value)

// 初始化加载
const initLoad = async () => {
  if (initLoaded.value) return
  await load()
  setTimeout(() => {
    initLoaded.value = true
  }, 1000)
  console.log('initLoaded')
}

// 加载数据
const load = async () => {
  if (disabled.value) return

  loading.value = true
  emitter.emit('loading', true)
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟获取数据
    const start = (page.value - 1) * pageSize
    const newUsers = Array.from({ length: pageSize }, (_, i) => start + i + 1)

    // 模拟数据到达上限
    if (followedUserIds.value.length >= 20) {
      noMore.value = true
      return
    }

    followedUserIds.value.push(...newUsers)
    page.value++
  } catch (error) {
    ElMessage.error('加载失败，请重试')
  } finally {
    loading.value = false
    emitter.emit('loading', false)
  }
}

// 滚动处理函数
let timer = null


// 生命周期钩子
onMounted(() => {
  initLoad()
  emitter.on('infiniteScroll', () => {
    load()
  })
})

// 组件卸载时移除滚动监听
onUnmounted(() => {
  emitter.off('infinaiteScroll')
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
.followed-users-container {
  padding: 0px;
}

.content-wrapper {
  min-height: 200px;
}

.loading-wrapper {
  padding: 16px;
  text-align: center;
  color: #909399;
}

.no-more {
  text-align: center;
  color: #909399;
  padding: 16px;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
