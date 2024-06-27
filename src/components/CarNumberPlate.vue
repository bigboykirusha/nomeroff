<template>
   <div class="border-2 border-black rounded-lg flex flex-col items-center">
      <div class="flex justify-between w-full items-center">
         <div class="flex items-end py-3 px-2">
            <span class="text-3xl font-bold">{{ firstLetter }}</span>
            <span class="text-5xl font-bold mx-1">{{ numbers }}</span> 
            <span class="text-3xl font-bold">{{ lastLetters }}</span>
         </div>
         <div class="flex flex-col items-center p-2 border-l-2 border-black">
            <span class="text-3xl font-bold">{{ regionCode }}</span> 
            <div class="flex items-center">
               <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Flag_of_Russia.svg/20px-Flag_of_Russia.svg.png"
                  alt="Russian flag" class="w-5 h-3 mr-1">
               <span class="text-sm font-bold">RUS</span>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
   letters: string;
   numbers: string ;
   regionCode: string;
}>();

const firstLetter = computed(() => props.letters.slice(0, 1));
const lastLetters = computed(() => props.letters.slice(1));
</script>

<style scoped>
</style>