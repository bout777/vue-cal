<template>
  <div class="followed-users-container">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>关注的用户</span>
        </div>
      </template>

      <div
        class="infinite-list"
        v-infinite-scroll="loadMore"
        :infinite-scroll-disabled="disabled"
      >
        <div v-if="loading" class="loading-wrapper">
          <el-skeleton :rows="3" animated />
        </div>

        <template v-else>
          <div v-for="user in followedUsers" :key="user.id" class="user-item">
            <el-avatar :size="40" :src="user.avatar" />
            <div class="user-info">
              <div class="username">{{ user.username }}</div>
              <div class="bio">{{ user.bio || '这个用户很懒，还没有简介' }}</div>
            </div>
            <el-button
              type="primary"
              size="small"
              @click="unfollowUser(user.id)"
            >取消关注</el-button>
          </div>
        </template>

        <div v-if="noMore" class="no-more">没有更多了</div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

const page = ref(1)
const pageSize = 10
const loading = ref(false)
const noMore = ref(false)
const followedUsers = ref([])

// 计算是否禁用无限滚动
const disabled = computed(() => loading.value || noMore.value)

// 模拟测试数据
const mockUsers = [
  {
    id: 1,
    username: '张三',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
    bio: '前端开发工程师，热爱技术分享'
  },
  {
    id: 2,
    username: '李四',
    avatar: 'https://avatars.githubusercontent.com/u/2?v=4',
    bio: '全栈开发者，喜欢探索新技术'
  },
  {
    id: 3,
    username: '王五',
    avatar: 'https://avatars.githubusercontent.com/u/3?v=4',
    bio: 'UI设计师，追求极致体验'
  },
  {
    id: 4,
    username: '赵六',
    avatar: 'https://avatars.githubusercontent.com/u/4?v=4',
    bio: '产品经理，用户体验专家'
  },
  {
    id: 5,
    username: '小明',
    avatar: 'https://avatars.githubusercontent.com/u/5?v=4',
    bio: '后端工程师，专注性能优化'
  },
  {
    id: 6,
    username: '小红',
    avatar: 'https://avatars.githubusercontent.com/u/6?v=4',
    bio: '数据分析师，热爱数据挖掘'
  },
  {
    id: 7,
    username: '小华',
    avatar: 'https://avatars.githubusercontent.com/u/7?v=4',
    bio: '运维工程师，保障系统稳定'
  },
  {
    id: 8,
    username: '小李',
    avatar: 'https://avatars.githubusercontent.com/u/8?v=4',
    bio: '测试工程师，质量把控专家'
  },
  {
    id: 9,
    username: '小张',
    avatar: 'https://avatars.githubusercontent.com/u/9?v=4',
    bio: '安全工程师，网络安全专家'
  },
  {
    id: 10,
    username: '小王',
    avatar: 'https://avatars.githubusercontent.com/u/10?v=4',
    bio: 'DevOps工程师，持续集成专家'
  },
  {
    id: 11,
    username: '大明',
    avatar: 'https://avatars.githubusercontent.com/u/11?v=4',
    bio: '架构师，系统设计专家'
  },
  {
    id: 12,
    username: '大红',
    avatar: 'https://avatars.githubusercontent.com/u/12?v=4',
    bio: '人工智能工程师，机器学习专家'
  },
  {
    id: 13,
    username: '大华',
    avatar: 'https://avatars.githubusercontent.com/u/13?v=4',
    bio: '区块链开发者，Web3探索者'
  },
  {
    id: 14,
    username: '大李',
    avatar: 'https://avatars.githubusercontent.com/u/14?v=4',
    bio: '游戏开发者，引擎专家'
  },
  {
    id: 15,
    username: '大张',
    avatar: 'https://avatars.githubusercontent.com/u/15?v=4',
    bio: '移动开发者，跨平台专家'
  }
]

// 修改 loadMore 函数使用测试数据
const loadMore = async () => {
  if (loading.value) return

  loading.value = true
  try {
    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 1000))

    // 模拟分页数据
    const start = (page.value - 1) * pageSize
    const end = start + pageSize
    const pageData = mockUsers.slice(start, end)

    if (pageData.length < pageSize) {
      noMore.value = true
    }

    followedUsers.value.push(...pageData)
    page.value++
  } catch (error) {
    ElMessage.error('加载失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

// 修改 unfollowUser 函数使用测试数据
const unfollowUser = async (userId) => {
  try {
    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 500))

    followedUsers.value = followedUsers.value.filter(user => user.id !== userId)
    ElMessage.success('已取消关注')
  } catch (error) {
    ElMessage.error('操作失败，请稍后重试')
  }
}
</script>

<style scoped>
.followed-users-container {
  padding: 20px;
}

.infinite-list {
  height: calc(100vh - 200px);
  overflow-y: auto;
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
