<template>
   <div class="text-4xl mb-6">
      <h2 class="text-center">{{ props.text }}</h2>
   </div>
</template>

<script setup lang="ts">
const props = defineProps<{
   text: string;
}>();
</script>

<style scoped>
</style>