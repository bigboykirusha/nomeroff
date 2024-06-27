<script setup>
import Card from './Card.vue';

defineProps({
   items: Array
})
</script>

<template>
   <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-5 mb-12" v-auto-animate>
      <Card v-for="item in items" :key="item.id" :price="item.price" :date="item.date"
         :city="item.city" :plateInfo="item.plateInfo" />
   </div>
</template>