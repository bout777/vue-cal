<template>
  <div class="announcements">
    <h2>公告栏</h2>
    <el-timeline>
      <el-timeline-item
        v-for="announcement in announcements"
        :key="announcement.id"
        :timestamp="announcement.date"
        placement="top"
      >
        <el-card>
          <h4>{{ announcement.title }}</h4>
          <p class="announcement-content">{{ announcement.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const announcements = ref([
  {
    id: 1,
    title: '平台更新公告',
    content: '我们将于本周六进行系统维护，维护时间为2小时，请各位用户提前做好准备。',
    date: '2024-03-20'
  },
  {
    id: 2,
    title: '新功能上线',
    content: '平台新增在线支付功能，现在可以直接在平台进行交易。',
    date: '2024-03-18'
  }
])
</script>

<style scoped>
.announcements {
  padding: 20px;
}

.announcement-content {
  color: #666;
  margin-top: 10px;
}

.el-timeline {
  margin-top: 20px;
}

.el-card {
  margin-left: 10px;
}
</style>
