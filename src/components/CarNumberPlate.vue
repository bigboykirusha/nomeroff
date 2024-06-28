<template>
   <div class="border-2 border-black rounded-lg flex flex-col items-center">
      <div class="flex justify-between w-full items-center gap-3">
         <div class="flex items-end py-1 px-2">
            <span class="text-2xl font-bold">{{ firstLetter }}</span>
            <span class="text-5xl font-bold mx-1">{{ numbers }}</span>
            <span class="text-2xl font-bold">{{ lastLetters }}</span>
         </div>
         <div class="flex flex-col items-center py-1 px-2 border-l-2 border-black">
            <span class="text-4xl font-bold">{{ regionCode }}</span>
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
import { computed } from 'vue';

const props = defineProps<{
   letters: string;
   numbers: string;
   regionCode: string;
}>();

const firstLetter = computed(() => props.letters.slice(0, 1));
const lastLetters = computed(() => props.letters.slice(1));
</script>

<style scoped></style>
