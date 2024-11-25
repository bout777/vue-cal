<template>
  <div class="demand-detail">
    <div class="detail-container">
      <!-- 左侧需求详情 -->
      <el-card class="detail-section">
        <template #header>
          <div class="card-header">
            <h2>{{ demand.title }}</h2>
            <el-tag :type="getStatusType(demand.status)">{{ demand.status }}</el-tag>
          </div>
        </template>

        <div class="demand-info">
          <div class="info-item">
            <el-icon><Timer /></el-icon>
            发布时间：{{ demand.date }}
          </div>
          <div class="info-item">
            <el-icon><Money /></el-icon>
            悬赏金额：{{ demand.reward }}
          </div>
          <div class="info-item">
            <el-icon><User /></el-icon>
            发布者：{{ demand.publisher }}
          </div>
        </div>

        <el-divider />

        <div class="demand-content">
          <h3>需求描述</h3>
          <p>{{ demand.description }}</p>

          <h3>技术要求</h3>
          <el-tag
            v-for="tech in demand.techStack"
            :key="tech"
            class="tech-tag"
          >
            {{ tech }}
          </el-tag>
        </div>
      </el-card>

      <!-- 右侧回复区域 -->
      <div class="replies-section">
        <el-card>
          <template #header>
            <div class="replies-header">
              <h3>开发者回复 ({{ demand.replies.length }})</h3>
            </div>
          </template>

          <div class="reply-list">
            <reply-card v-for="replyId in replyIds" :key="replyId" :replyId="replyId" />
          </div>

          <!-- 回复输入框 -->
          <div class="reply-input">
            <h3>我要回复</h3>
            <el-input
              v-model="newReply"
              type="textarea"
              :rows="4"
              placeholder="请输入您的解决方案..."
            />
            <div class="reply-actions">
              <el-button type="primary" @click="submitReply">提交回复</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Timer, Money, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ReplyCard from '@/components/ReplyCard.vue'

const route = useRoute()
const newReply = ref('')

const replyIds = ref([1,2,3,4])
const demand = ref({
  id: 1,
  title: '网站开发需求',
  description: '需要开发一个企业官网，具体功能包括：\n1. 响应式布局\n2. 产品展示\n3. 新闻资讯\n4. 在线咨询',
  status: '进行中',
  date: '2024-03-20',
  reward: '¥5000',
  publisher: 'John Doe',
  techStack: ['Vue3', 'TypeScript', 'Element Plus', 'Node.js'],
  replies: [
    {
      id: 1,
      developer: 'Alice',
      avatar: '',
      content: '我有相关开发经验，可以接这个项目...',
      time: '2024-03-21 10:30'
    },
    {
      id: 2,
      developer: 'Bob',
      avatar: '',
      content: '我们团队可以承接这个项目，已经完成过类似案例...',
      time: '2024-03-21 11:45'
    }
  ]
})

const getStatusType = (status: string) => {
  const types: Record<string, string> = {
    '进行中': 'success',
    '已结束': 'info',
    '已完成': 'warning'
  }
  return types[status] || 'info'
}

const submitReply = () => {
  if (!newReply.value.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }

  // 这里应该调用API提交回复
  demand.value.replies.push({
    id: Date.now(),
    developer: '当前用户',
    avatar: '',
    content: newReply.value,
    time: new Date().toLocaleString()
  })

  newReply.value = ''
  ElMessage.success('回复成功')
}

onMounted(() => {
  // 这里应该根据路由参数获取需求详情
  console.log('Demand ID:', route.params.id)
})
</script>

<style scoped>
.demand-detail {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.detail-container {
  display: flex;
  gap: 20px;
  height: 100%;
}

/* 左侧详情区域 */
.detail-section {
  flex: 3;  /* 占据更多空间 */
  height: 100%;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.demand-info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 20px 0;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
}

.demand-content {
  margin-top: 20px;
}

.demand-content h3 {
  margin: 20px 0 10px 0;
  color: #333;
}

.tech-tag {
  margin: 5px;
}

/* 右侧回复区域 */
.replies-section {
  flex: 2;  /* 占据较少空间 */
  height: fit-content;
}

.replies-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.replies-header h3 {
  margin: 0;
}

.reply-list {
  max-height: 500px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.reply-card {
  margin-bottom: 15px;
  border: none;
  background-color: #f8f9fa;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.developer-name {
  font-weight: 500;
  color: #333;
}

.reply-time {
  color: #999;
  font-size: 0.9rem;
}

.reply-content {
  margin: 0;
  color: #666;
  line-height: 1.5;
}

.reply-input {
  margin-top: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.reply-input h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #333;
}

.reply-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .detail-container {
    flex-direction: column;
  }

  .detail-section,
  .replies-section {
    width: 100%;
  }
}
</style>
