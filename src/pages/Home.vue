<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import axios from 'axios';

import CardList from '../components/CardList.vue';
import Title from '../components/Title.vue';
import CarNumberPlate from '../components/CarNumberPlate.vue';
import type { IFilters, IItem } from '@/Utils/types';
import { filterItems, sortItems } from '@/Utils/SortAndFilter';
import { SortBy } from '@/Utils/data';

const allItems = ref<IItem[]>([]);
const items = ref<IItem[]>([]);
const itemsPopular = ref<IItem[]>([]);
const totalPages = ref<number>(0);

const filters = reactive<IFilters>({
   sortBy: SortBy.PriceAsc,
   page: 1,
   limit: 8,
   filterOptions: {
      sameLetters: false,
      sameNumbers: false,
      mirrorNumbers: false,
      firstTen: false
   }
});

const fetchItems = async () => {
   try {
      const { data } = await axios.get(`https://bff9c4aac415f93c.mokky.dev/items`);
      allItems.value = Array.isArray(data) ? data : [];
      applyFilters();
   } catch (err) {
      console.error('Error fetching items:', err);
   }
};

const fetchItemsPopular = async () => {
   try {
      const { data } = await axios.get(`https://bff9c4aac415f93c.mokky.dev/items`, {
         params: {
            page: filters.page,
            limit: filters.limit,
            sortBy: '-popularity'
         }
      });
      itemsPopular.value = data.items;
   } catch (err) {
      console.error('Error fetching popular items:', err);
   }
};

const applyFilters = () => {
   let filteredItems = filterItems(allItems.value, filters);
   filteredItems = sortItems(filteredItems, filters);

   totalPages.value = Math.ceil(filteredItems.length / filters.limit);
   items.value = filteredItems.slice((filters.page - 1) * filters.limit, filters.page * filters.limit);
};

const onChangeSelect = () => applyFilters();

const changePage = (page: number) => {
   filters.page = page;
   applyFilters();
};

const previousPage = () => {
   if (filters.page > 1) {
      filters.page--;
      applyFilters();
   }
};

const nextPage = () => {
   if (filters.page < totalPages.value) {
      filters.page++;
      applyFilters();
   }
};

onMounted(async () => {
   await fetchItems();
   await fetchItemsPopular();
});

watch(filters, applyFilters, { deep: true });
</script>

<template>
   <Title text="Продажа автомобилей с красивыми номерами" />
   <div class="border border-gray-300 rounded-3xl flex flex-col-reverse lg:flex-row justify-between px-6 sm:px-12 lg:px-24 py-6 mb-6 gap-y-6">
      <div class="flex flex-col">
         <h2 class="text-2xl mb-4 text-center md:text-left">Поиск номеров</h2>
         <div class="transform lg:scale-150 scale-140 transform-origin-top-left max-w-fit">
            <CarNumberPlate letters="***" numbers="***" regionCode="**" />
         </div>
         <div class="mt-12 lg:mt-14 grid grid-cols-2 gap-4 gap-x-10">
            <label class="flex items-center mb-2">
               <input type="checkbox" v-model="filters.filterOptions.sameLetters" class="mr-2" />
               Одинаковые буквы
            </label>
            <label class="flex items-center mb-2">
               <input type="checkbox" v-model="filters.filterOptions.sameNumbers" class="mr-2" />
               Одинаковые цифры
            </label>
            <label class="flex items-center mb-2">
               <input type="checkbox" v-model="filters.filterOptions.mirrorNumbers" class="mr-2" />
               Зеркальные цифры
            </label>
            <label class="flex items-center mb-2">
               <input type="checkbox" v-model="filters.filterOptions.firstTen" class="mr-2" />
               Первая десятка
            </label>
         </div>
      </div>
      <div class="flex flex-col w-full md:w-[440px] items-center justify-between">
         <img class="mb-6" src="../assets/images/stars.svg" alt="Stars">
         <p class="text-center">Сделки с госномерами осуществляются в соответствии с законами Российской Федерации и проводятся путем
            продажи автомобиля новому владельцу вместе с номером.</p>
      </div>
   </div>
   <div class="flex justify-end items-center mb-6">
      <div class="flex gap-4">
         <select v-model="filters.sortBy" @change="onChangeSelect" class="py-2 px-3 border rounded-3xl outline-none">
            <option :value="SortBy.PriceAsc">По цене (дешевые)</option>
            <option :value="SortBy.PriceDesc">По цене (дорогие)</option>
            <option :value="SortBy.DateAsc">По дате (старые)</option>
            <option :value="SortBy.DateDesc">По дате (новые)</option>
         </select>
      </div>
   </div>
   <CardList :items="items" />
   <div class="mt-4 p-5 flex justify-center md:justify-start bg-white border border-slate-300 rounded-3xl mb-6">
      <button @click="previousPage" :disabled="filters.page === 1"
         class="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-full outline-none">&lt;</button>
      <div class="flex gap-2">
         <button v-for="page in totalPages" :key="page" @click="changePage(page)"
            :class="['px-4 py-2 text-gray-700 rounded-full outline-none', { 'font-bold': page === filters.page }]">{{
               page }}</button>
      </div>
      <button @click="nextPage" :disabled="filters.page === totalPages"
         class="px-4 py-2.5 mx-2 bg-gray-200 text-gray-700 rounded-full outline-none">&gt;</button>
   </div>
   <Title text="Популярные объявления" />
   <CardList :items="itemsPopular" />
</template>

<style>
.transform-origin-top-left {
   transform-origin: top left;
}
</style>
