<template>
   <div class="flex items-center gap-4">
      <div v-for="i in 3" :key="i" :class="`w-4 h-4 rounded-full bg-${color}`"></div>
   </div>
</template>

<script setup>
defineProps({
   color: String,
})

</script>

<style scoped></style>