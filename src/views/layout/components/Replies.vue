<template>
  <div class="replies">
    <el-card>
      <template #header>
        <div class="header-title">回复列表</div>
      </template>
      <ul>
        <reply-card v-for="reply in replyList" :key="reply" :reply="reply" />
      </ul>
      <div v-if="loading" class="loading-wrapper">加载中</div>
      <div v-if="noMore" class="no-more">没有更多了</div>
    </el-card>
  </div>
</template>

<script setup>
import { computed, onMounted, ref ,onUnmounted} from 'vue'
import ReplyCard  from '@/components/ReplyCard.vue'
import service from '@/utils/request';
import { useUserStore } from '@/stores/user';
import { emitter } from '@/utils/emitter';


const replyList = ref([])
const userStore = useUserStore()
const page = ref(0)
const pageSize = ref(10)
const totalSize = ref(0)
const disabled = ref(false)
const loading = ref(false)

const noMore = computed(() => page.value * pageSize.value >= totalSize.value)

const load = async() => {
  if(disabled.value)return
  loading.value = true
  disabled.value = true

  // 分页查询,传入页码和每页数量,后期需要修改
  page.value++
  const response = await service.get('/api/reply/page',{params:{page:page.value,pageSize:pageSize.value}})
  console.log(response.data)
  replyList.value.push(...response.data.data.replies)
  totalSize.value = response.data.data.total
  loading.value = false
  if(noMore.value){
    return
  }
  disabled.value = false
}



onMounted(async() => {

  load()

  emitter.on('infiniteScroll',() => {
    load()
  })

  emitter.emit('disabled',disabled)
})

onUnmounted(() => {
  emitter.off('infiniteScroll')
})

</script>

<style scoped>
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
</style>
