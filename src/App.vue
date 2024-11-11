<script setup>
import LoginPage from './views/login/LoginPage.vue';
import { RouterView } from 'vue-router';
</script>

<template>
<RouterView></RouterView>
</template>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}
</style>
