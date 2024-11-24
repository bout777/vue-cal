<template>
  <div class="user-list">
    <user-card v-for="userId in userIdList" :key="userId" :userId="userId" />
  </div>
</template>

<script setup>

import UserCard from './UserCard.vue'
defineProps(['userIdList'])

</script>

<style scoped>

</style>
