<template>
  <div class="profile-container">
    <!-- 用户信息卡片 -->
    <el-card class="user-card">
      <div class="user-info">
        <el-avatar
          :size="64"
          :src="userInfo.avatar"
          :icon="UserFilled"
        />
        <div class="user-meta">
          <h2>{{ userInfo.username }}</h2>
          <p>{{ userInfo.bio }}</p>
        </div>
      </div>
    </el-card>

    <!-- 需求列表标签页 -->
    <el-tabs v-model="activeTab" class="need-tabs">
      <el-tab-pane label="发布的需求" name="published">
        <el-list v-if="userInfo.publishedNeeds.length">
          <el-list-item
            v-for="need in userInfo.publishedNeeds"
            :key="need.id"
          >
            <el-card class="need-card">
              <h3>{{ need.title }}</h3>
              <p>{{ need.description }}</p>
            </el-card>
          </el-list-item>
        </el-list>
        <el-empty v-else description="暂无发布的需求" />
      </el-tab-pane>

      <el-tab-pane label="关注的需求" name="followed">
        <el-list v-if="userInfo.followedNeeds.length">
          <el-list-item
            v-for="need in userInfo.followedNeeds"
            :key="need.id"
          >
            <el-card class="need-card">
              <h3>{{ need.title }}</h3>
              <p>{{ need.description }}</p>
            </el-card>
          </el-list-item>
        </el-list>
        <el-empty v-else description="暂无关注的需求" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UserFilled } from '@element-plus/icons-vue'

// 定义props
const props = defineProps({
  userInfo: {
    type: Object,
    required: true
  }
})

// 当前激活的标签页
const activeTab = ref('published')
</script>

<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.user-card {
  margin-bottom: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.user-meta h2 {
  margin: 0;
  font-size: 20px;
}

.user-meta p {
  margin: 8px 0 0;
  color: #666;
}

.need-tabs {
  margin-top: 20px;
}

.need-card {
  margin-bottom: 10px;
}

.need-card h3 {
  margin: 0 0 8px;
  font-size: 16px;
}

.need-card p {
  margin: 0;
  color: #666;
}
</style> 
