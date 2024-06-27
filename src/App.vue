<script setup lang="ts">

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="bg-white w-4/5 m-auto shadow-xl">
    <Header />
    <div class="px-20">
      <router-view></router-view>
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
