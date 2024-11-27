<template>
  <div class="user-list">
    <user-card v-for="user in userList" :key="user" :user="user" />
  </div>
</template>

<script setup>

import UserCard from './UserCard.vue'
defineProps(['userList'])

</script>

<style scoped>

</style>
