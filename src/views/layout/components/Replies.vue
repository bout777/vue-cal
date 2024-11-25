<template>
  <div class="replies">
    <el-card>
      <template #header>
        <div class="header-title">回复列表</div>
      </template>
      <ul>
        <reply-card v-for="replyId in replyIdList" :key="replyId" :replyId="replyId" />
      </ul>
    </el-card>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ReplyCard  from '@/components/ReplyCard.vue'
import service from '@/utils/request';
import { useUserStore } from '@/stores/user';
const replyIdList = ref([])
const userStore = useUserStore()

onMounted(async() => {
  // 根据本地存储的用户ID获取回复列表
  const response = await service.get('/api/replyIdList/'+userStore.localUserId)
  replyIdList.value = response.data.data.replyIdList
  console.log(replyIdList)
})


</script>

<style scoped>

</style>
