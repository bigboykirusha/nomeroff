<template>
   <footer class="bg-custom-gray h-24 mx-auto flex justify-between items-center px-5 py-2 lg:px-20 lg:py-0 flex-col lg:flex-row">
      <span class="ml-2 hover:underline cursor-pointer">Пользовательское соглашение</span>
      <div class="flex gap-20 items-center">
         <CircleRow color="white" />
         <div class="flex flex-col gap-3">
            <a class="font-bold hover:underline" :href="'tel:' + PHONE_NUMBER">8 (800) 000-00-00</a>
            <span class="text-sm">Пн-Пт с 10:00 до 19:00</span>
         </div>
      </div>
   </footer>
</template>

<script setup lang="ts">
import { PHONE_NUMBER } from '../Utils/data';
import CircleRow from './CircleRow.vue';
</script>

<style scoped>
</style>
