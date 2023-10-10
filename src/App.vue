<script setup>
import { ref } from 'vue'
import VueTilt from './lib/VueTilt'
const scale = ref(1.2)
</script>

<template>
  <div>
    <VueTilt :speed="100" :max="40" :scale="scale">
      <img src="./assets/vue.svg" class="logo" alt="Vite logo" style="width: 88px; height: 88px;" />
    </VueTilt>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
