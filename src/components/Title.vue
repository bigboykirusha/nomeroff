<template>
   <div class="text-3xl lg:text-4xl mb-6">
      <h2 class="text-center">{{ text }}</h2>
   </div>
</template>

<script setup lang="ts">
defineProps({
   text: String,
})
</script>

<style scoped></style>