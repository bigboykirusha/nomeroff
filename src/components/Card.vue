<script setup>
import CarNumberPlate from './CarNumberPlate.vue';
defineProps({
   id: Number,
   city: String,
   price: Number,
   date: String,
   plateInfo: Object
})
</script>

<template>
   <div
      class="relative bg-white border border-slate-300 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl text-xs">
      <p class="mb-1">{{ date }}</p>
      <CarNumberPlate :letters="plateInfo.letters" :numbers="plateInfo.numbers" :regionCode="plateInfo.regionCode" />
      <div class="flex justify-between">
         <span class="mt-1">{{ city }}</span>
         <span class="mt-1">{{ price }} руб.</span>
      </div>
   </div>
</template>