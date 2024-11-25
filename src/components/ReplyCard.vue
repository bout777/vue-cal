<template>
  <el-card class="reply-card">
    <div class="reply-header">
      <div class="user-info" @click="handleClickUser">
        <el-avatar :size="40" :src="reply.author.avatar">
        </el-avatar>
        <span class="developer-name">{{ reply.author.username }}</span>
      </div>
      <span class="reply-time">{{ reply.createTime }}</span>
    </div>
    <div class="reply-content">{{ reply.content }}</div>
  </el-card>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import service from '@/utils/request';
import { useRouter } from 'vue-router';

const{replyId} = defineProps(['replyId'])
const reply = ref({
  content:'',
  createTime:'',
  author:{
    username:'',
    avatar:''
  },
  avatar:''

})
const router = useRouter()

onMounted(async () => {
  const response = await service.get('/api/reply/'+replyId)
  reply.value = response.data.data
  console.log(reply.value)
})
const handleClickUser = () => {
  router.push({name:'profile',params:{userId:reply.value.author.id}})
}
</script>

<style scoped>
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
.reply-time {
  color: #999;
  font-size: 0.9rem;
}
.reply-content {
  margin: 0;
  color: #666;
  line-height: 1.5;
}
</style>
