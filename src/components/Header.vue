<template>
   <header class="w-full px-20 mb-6">
      <!-- Верхний блок -->
      <section class="flex justify-between items-center h-12 border-b border-black">
         <CircleRow color="custom-gray" />
         <div class="flex items-center space-x-6">
            <span class="text-sm">Пн-Пт с 10:00 до 19:00</span>
            <span>
               <a class="font-bold hover:underline" :href="'tel:' + PHONE_NUMBER">8 (800) 000-00-00</a>
            </span>
            <button class="btn px-3 py-1" :href="'tel:' + PHONE_NUMBER">Перезвоните мне</button>
         </div>
      </section>
      <!-- Нижний блок -->
      <section class="flex justify-between items-center h-16 border-b border-black">
         <router-link to="/" class="text-3xl font-bold">NOMER.OFF</router-link>
         <nav class="flex items-center space-x-8 uppercase">
            <router-link :to="link.url" v-for="(link, index) in navigationLinks" :key="index" :href="link.url" class="hover:underline">{{link.text }}</router-link>
         </nav>
         <button class="btn px-7 py-3">Вход</button>
      </section>
   </header>
</template>

<script setup lang="ts">
import { PHONE_NUMBER, navigationLinks } from '../Utils/data';
import CircleRow from './CircleRow.vue';

</script>
<style scoped>
.btn {
   @apply bg-custom-gray uppercase text-black rounded-lg transition duration-300 ease-in-out;
}

.btn:hover {
   @apply bg-gray-300;
}
</style>
