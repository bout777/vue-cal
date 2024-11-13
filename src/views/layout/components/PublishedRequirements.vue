<template>
  <div class="published-requirements">
    <h2>我的已发布需求</h2>

    <div v-if="loading" class="loading">
      加载中...
    </div>

    <div v-else-if="requirements.length === 0" class="empty-state">
      暂无已发布的需求
    </div>

    <div v-else class="requirements-list">
      <div v-for="item in requirements" :key="item.id" class="requirement-item">
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <div class="meta-info">
          <span>发布时间: {{ formatDate(item.createTime) }}</span>
          <span>状态: {{ item.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublishedRequirements',

  data() {
    return {
      requirements: [],
      loading: true
    }
  },

  methods: {
    async fetchRequirements() {
      try {
        this.loading = true
        // 这里替换为实际的 API 调用
        const response = await this.$http.get('/api/requirements/my')
        this.requirements = response.data
      } catch (error) {
        console.error('获取需求列表失败:', error)
      } finally {
        this.loading = false
      }
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString('zh-CN')
    }
  },

  created() {
    this.fetchRequirements()
  }
}
</script>

<style scoped>
.published-requirements {
  padding: 20px;
}

.requirements-list {
  display: grid;
  gap: 20px;
}

.requirement-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 8px;
}

.meta-info {
  margin-top: 10px;
  color: #666;
  font-size: 0.9em;
}

.meta-info span {
  margin-right: 15px;
}

.empty-state {
  text-align: center;
  color: #666;
  padding: 40px 0;
}

.loading {
  text-align: center;
  padding: 40px 0;
}
</style>
