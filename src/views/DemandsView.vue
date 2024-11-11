<template>
  <div class="demands">
    <h2>需求榜</h2>
    <el-card
      v-for="demand in demands"
      :key="demand.id"
      class="demand-card"
      :body-style="{ cursor: 'pointer' }"
      @click="showDemandDetail(demand.id)"
    >
      <div class="demand-header">
        <h3>{{ demand.title }}</h3>
        <el-tag :type="getStatusType(demand.status)">{{ demand.status }}</el-tag>
      </div>
      <p class="demand-desc">{{ demand.description }}</p>
      <div class="demand-footer">
        <div class="demand-info">
          <span>发布时间: {{ demand.date }}</span>
          <span class="reward">悬赏: {{ demand.reward }}</span>
        </div>
        <div class="demand-stats">
          <el-tooltip content="回复数">
            <span class="stat-item">
              <el-icon><ChatDotRound /></el-icon>
              {{ demand.replyCount }}
            </span>
          </el-tooltip>
          <el-tooltip content="浏览量">
            <span class="stat-item">
              <el-icon><View /></el-icon>
              {{ demand.viewCount }}
            </span>
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChatDotRound, View } from '@element-plus/icons-vue'

const router = useRouter()
const demands = ref([
  {
    id: 1,
    title: '网站开发需求',
    description: '需要开发一个企业官网，包含产品展示、新闻资讯等功能',
    status: '进行中',
    date: '2024-03-20',
    reward: '¥5000',
    replyCount: 8,
    viewCount: 156
  },
  {
    id: 2,
    title: '小程序开发',
    description: '开发一个商城小程序，需要包含支付功能',
    status: '已结束',
    date: '2024-03-19',
    reward: '¥3000',
    replyCount: 12,
    viewCount: 234
  }
])

const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    '进行中': 'success',
    '已结束': 'info',
    '已完成': 'warning'
  }
  return types[status] || 'info'
}

const showDemandDetail = (id: number) => {
  console.log(id)
  router.push({
    name: 'demand-detail',
    params: { id: id.toString() }
  })
}
</script>

<style scoped>
.demands {
  padding: 20px;
}
.demand-card {
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s;
}

.demand-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.demand-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.demand-desc {
  color: #666;
  margin: 10px 0;
}

.demand-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #999;
  font-size: 14px;
}

.demand-info {
  display: flex;
  gap: 20px;
}

.reward {
  color: #f56c6c;
  font-weight: bold;
}

.demand-stats {
  display: flex;
  gap: 15px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>
