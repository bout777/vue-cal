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
    <div class="reply-content-warpper">
      <el-text :truncated="isExpanded" class="reply-content">
        {{ isExpanded ? reply.content : reply.content.slice(0, 100)+(reply.content.length > 20? '...' : '') }}
      </el-text>
    </div>
    <div v-if="reply.content.length > 20" class="expand-button">
      <el-button type="text" size="default" @click="isExpanded = !isExpanded">
        {{ isExpanded ? '收起' : '展开' }}
      </el-button>
    </div>
  </el-card>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRouter } from 'vue-router';

const{reply} = defineProps(['reply'])

// const reply = ref({
//   content:'',
//   createTime:'',
//   author:{
//     username:'',
//     avatar:''
//   },
//   avatar:''
// })

const router = useRouter()
const isExpanded = ref(false)

onMounted(async () => {
})
const handleClickUser = () => {
  router.push({name:'profile',params:{userId:reply.author.id}})
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
  cursor: pointer;
}
.reply-time {
  color: #999;
  font-size: 0.9rem;
}
.reply-content {
  margin: 0;
  color: #666;
  line-height: 1.5;
  overflow: hidden;
  white-space: pre-wrap;
  word-break: break-all;
}

.expand-button {
  text-align: right;
  margin-top: 5px;
}
</style>
