<template>
<el-card>
  <template #header>
    <div class="card-header">
      <span>开发者列表</span>
    </div>
  </template>
  <UserList :userIdList="IdList"/>
</el-card>
</template>

<script setup>
import { useUserStore } from '@/stores/user';
import UserList from '@/components/UserList.vue'
import service from '@/utils/request';
``
defineProps(['userIdList'])

const userStore = useUserStore()

</script>

<style scoped>

</style>
