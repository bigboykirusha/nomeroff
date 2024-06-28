<template>
   <header class="w-full px-5 lg:px-20 mb-6">
      <section class="hidden lg:flex justify-between items-center h-12 border-b border-gray-300">
         <CircleRow color="custom-gray" />
         <div class="items-center space-x-6 hidden lg:flex">
            <span class="text-sm">Пн-Пт с 10:00 до 19:00</span>
            <span>
               <a class="font-bold hover:underline" :href="formattedPhoneNumber">8 (800) 000-00-00</a>
            </span>
            <button class="btn"><a :href="formattedPhoneNumber">Перезвоните мне</a></button>
         </div>
      </section>
      <section class="flex justify-between items-center h-16 border-b border-gray-300">
         <router-link to="/" class="text-3xl font-bold">NOMER.OFF</router-link>
         <nav class="hidden items-center space-x-8 uppercase lg:flex">
            <router-link v-for="(link, index) in navigationLinks" :key="index" :to="link.url" class="hover:underline">
               {{ link.text }}
            </router-link>
         </nav>
         <div :class="{ 'burgerMenu': true, 'active': isMenuActive }" @click="toggleMenu">
            <div class="burgerBar bar1"></div>
            <div class="burgerBar bar2"></div>
            <div class="burgerBar bar3"></div>
         </div>
         <button class="btn hidden lg:block">Вход</button>
      </section>
   </header>
   <div v-if="isMenuActive" class="fullscreen-menu">
      <div class="fullscreen-menu__content">
         <router-link :to="'/'" class="fullscreen-menu__link" @click="closeMenu">Домой</router-link>
         <router-link v-for="(link, index) in navigationLinks" :key="index" :to="link.url" @click="closeMenu"
            class="hover:underline fullscreen-menu__link">
            {{ link.text }}
         </router-link>
         <a class="fullscreen-menu__link font-bold hover:underline" :href="formattedPhoneNumber">+ 8 (800) 000-00-00</a>
      </div>
   </div>
</template>

<script setup lang="ts">
import { useMenu } from '@/hooks/useMenu';
import { PHONE_NUMBER, navigationLinks } from '../Utils/data';
import CircleRow from './CircleRow.vue';

const formattedPhoneNumber = `tel:${PHONE_NUMBER}`;
const { isMenuActive, toggleMenu, closeMenu } = useMenu();
</script>

<style lang="scss" scoped>
.btn {
   @apply bg-custom-gray text-black uppercase rounded-lg px-3 py-1 transition duration-300 ease-in-out;

   &:hover {
      @apply bg-gray-300;
   }
}

.burgerMenu {
   display: none;
   flex-direction: column;
   justify-content: space-between;
   width: 24px;
   height: 20px;
   cursor: pointer;
   z-index: 10001;

   @media (max-width: 1024px) {
      display: flex;
   }

   &.active .burgerBar {
      background-color: #fff;
   }

   &.active .bar1 {
      transform: rotate(45deg) translate(6px, 6px);
   }

   &.active .bar2 {
      opacity: 0;
   }

   &.active .bar3 {
      transform: rotate(-45deg) translate(6px, -6px);
   }

   .burgerBar {
      width: 100%;
      height: 3px;
      background-color: #000;
      transition: all 0.3s ease-in-out;
   }
}

.fullscreen-menu {
   position: fixed;
   z-index: 1005;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: #000;
   display: flex;
   justify-content: center;
   align-items: center;
   animation: fadeIn 0.3s ease-in-out;

   &__content {
      text-align: center;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      row-gap: 30px;
   }

   &__link {
      display: block;
      font-family: 'PT Sans', sans-serif;
      font-size: 24px;
      color: #fff;
      text-decoration: none;
      transition: color 0.3s ease-in-out;

      &:hover {
         color: #D9D9D9;
      }
   }

   @keyframes fadeIn {
      from {
         opacity: 0;
      }

      to {
         opacity: 1;
      }
   }

   @keyframes fadeOut {
      from {
         opacity: 1;
      }

      to {
         opacity: 0;
      }
   }
}
</style>
