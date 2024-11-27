<template>
  <div class="followed-users-container">
    <el-card class="box-card">
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
          <UserList :userList="userList" />
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
import UserList from '@/components/UserListView.vue'
import { emitter } from '@/utils/emitter'
import service from '@/utils/request'

const route = useRoute()
const loading = ref(false)
const noMore = computed(() => page.value * pageSize >= totalSize.value)
const followedUserIds = ref([])
const page = ref(0)
const pageSize = 10
const initLoaded = ref(false)

// 计算是否禁用加载
const disabled = ref(false)
const userList = ref([])
const totalSize = ref(0)

// 加载数据
const load = async () => {
  if (disabled.value) return
  loading.value = true
  disabled.value = true
  page.value++
  // 分页查询,传入页码和每页数量,后期需要修改
  const response = await service.get('/api/user/follow/page', { params: { page: page.value, pageSize: pageSize.value } })
  userList.value.push(...response.data.data.userList)
  totalSize.value = response.data.data.total
  loading.value = false
  console.log('page', page.value * pageSize)
  if (noMore.value) {

    return
  }
  disabled.value = false
}

// 滚动处理函数
let timer = null


// 生命周期钩子
onMounted(() => {
  initLoaded.value = true
  load()
  emitter.on('infiniteScroll', () => {
    load()
  })
  emitter.emit('disabled', disabled)
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
