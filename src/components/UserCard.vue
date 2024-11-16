<template>
  <el-card class="user-card" @click="handleClick">
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


const userStore = useUserStore()

const props = defineProps(['userId'])

const user = ref({})

const getUserInfo = async () => {
  if (props.userId === userStore.user.id) {
    user.value = userStore.user
  } else {
    const response = await service.get(`/api/user/${props.userId}`)
    user.value = response.data.data
    console.log(user.value)
  }
}

onMounted(async () => {
  await getUserInfo()
})
const handleClick = () => {

}
</script>

<style scoped></style>
