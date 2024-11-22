<template>
  <el-card class="user-card" @click="handleClick" shadow="hover">
    <el-avatar :size="40" :src="user.avatar" />
    <div class="user-info">
      <div class="username">{{ user.username }}</div>
      <div class="bio">{{ user.bio }}</div>
    </div>
  </el-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { ref, onMounted } from 'vue'
import service from '@/utils/request'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()

const props = defineProps(['userId'])

const user = ref({})

const getUserInfo = async () => {
  if (props.userId === userStore.user.id) {
    user.value = userStore.user
  } else {
    const response = await service.get(`/api/user/${props.userId}`)
    user.value = response.data.data
  }
}

onMounted(async () => {
  await getUserInfo()
})
const handleClick = () => {
  console.log('userId', props.userId)
  router.push({ name: 'profile', params: { userId: props.userId } })
}
</script>

<style scoped>
.user-card {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 12px;
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.user-card:hover {
  transform: translateY(-2px);
}

.user-info {
  margin-left: 16px;
  flex: 1;
}

.username {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.bio {
  font-size: 14px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
