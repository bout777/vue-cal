<template>
  <div class="published-requirements">
    <div v-if="!showPublishForm">

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

      <div class="publish-button" @click="showPublishForm = true">
        <i class="el-icon-plus"></i>
        发布需求
      </div>
    </div>

    <publish-demand
      v-else
      @submit-success="handlePublishSuccess"
      @cancel="showPublishForm = false"
    />
  </div>
</template>

<script>
import PublishDemand from '../../demand/PublishDemand.vue'

// TODO: 展示需求列表
//       提交需求页面优化
//       添加收到的邀请界面
//       实现开发者列表和企业列表的组件(用户列表,无限滚动,搜索框)
//       实现回复卡片组件
//       实现回复列表


export default {
  name: 'PublishedRequirements',

  components: {
    PublishDemand
  },

  data() {
    return {
      requirements: [],
      loading: true,
      showPublishForm: false
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
    },

    handlePublishSuccess() {
      this.showPublishForm = false
      this.fetchRequirements() // 刷新需求列表
    },

    goToPublish() {
      this.showPublishForm = true
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

.publish-button {
  position: fixed;
  right: 30px;
  bottom: 30px;
  background-color: #409EFF;
  color: white;
  padding: 15px 25px;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.3s;
}

.publish-button:hover {
  background-color: #66b1ff;
  transform: translateY(-2px);
}
</style>
