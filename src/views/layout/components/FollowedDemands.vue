<template>
  <div class="followed-demands">

    <div class="demands-list" v-if="demands.length">
      <div v-for="demand in demands" :key="demand.id" class="demand-item">
        <h4>{{ demand.title }}</h4>
        <p>{{ demand.description }}</p>
      </div>
    </div>
    <div v-else class="empty-state">
      暂无关注的需求
    </div>
  </div>
</template>

<script>
export default {
  name: 'FollowedDemands',
  data() {
    return {
      demands: []
    }
  },
  created() {
    // TODO: 在组件创建时获取已关注的需求列表
    this.fetchFollowedDemands()
  },
  methods: {
    fetchFollowedDemands() {
      // TODO: 实现获取已关注需求的API调用
    }
  }
}
</script>

<style scoped>
.followed-demands {
  padding: 16px;
}

.demands-list {
  margin-top: 16px;
}

.demand-item {
  border: 1px solid #eee;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 4px;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 24px;
}
</style>
