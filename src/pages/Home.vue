<script lang="ts" setup>
import { ref, reactive, watch, onMounted } from 'vue';
import axios from 'axios';

import CardList from '../components/CardList.vue';
import Title from '../components/Title.vue';
import CarNumberPlate from '../components/CarNumberPlate.vue';

interface PlateInfo {
   letters: string;
   numbers: string;
   regionCode: string;
}

interface Item {
   id: number;
   plateInfo: PlateInfo;
   city: string;
   price: number;
   date: string;
   popularity: number;
}

const allItems = ref<Item[]>([]);
const items = ref<Item[]>([]);
const itemsPopular = ref<Item[]>([]);
const totalPages = ref<number>(0);

const filters = reactive({
   sortBy: 'price',
   page: 1,
   limit: 8,
   filterOptions: {
      sameLetters: false,
      sameNumbers: false,
      mirrorNumbers: false,
      firstTen: false
   }
});

const onChangeSelect = (event: Event): void => {
   const target = event.target as HTMLSelectElement;
   filters.sortBy = target.value;
   applyFilters();
}

const changePage = (page: number) => {
   filters.page = page
   applyFilters()
}

const previousPage = () => {
   if (filters.page > 1) {
      filters.page--
      applyFilters()
   }
}

const nextPage = () => {
   if (filters.page < totalPages.value) {
      filters.page++
      applyFilters()
   }
}

const fetchItems = async () => {
   try {
      const { data } = await axios.get(`https://bff9c4aac415f93c.mokky.dev/items`)
      allItems.value = Array.isArray(data) ? data : []
      applyFilters()
   } catch (err) {
      console.log('Error fetching items:', err)
   }
}

const applyFilters = () => {
   let filteredItems = [...allItems.value]

   if (filters.filterOptions.sameLetters) {
      filteredItems = filteredItems.filter(item => new Set(item.plateInfo.letters).size === 1);
   }

   if (filters.filterOptions.sameNumbers) {
      filteredItems = filteredItems.filter(item => new Set(item.plateInfo.numbers).size === 1);
   }

   if (filters.filterOptions.mirrorNumbers) {
      filteredItems = filteredItems.filter(item => item.plateInfo.numbers === item.plateInfo.numbers.split('').reverse().join(''));
   }

   filteredItems.sort((a, b) => {
      switch (filters.sortBy) {
         case 'price':
            return a.price - b.price;
         case '-price':
            return b.price - a.price;
         case 'date':
            return new Date(a.date).getTime() - new Date(b.date).getTime();
         case '-date':
            return new Date(b.date).getTime() - new Date(a.date).getTime();
         default:
            return 0;
      }
   });

   totalPages.value = Math.ceil(filteredItems.length / filters.limit)
   items.value = filteredItems.slice((filters.page - 1) * filters.limit, filters.page * filters.limit)
}

const fetchItemsPopular = async () => {
   try {
      const params = {
         page: filters.page,
         limit: filters.limit,
         sortBy: '-popularity'
      }
      const { data } = await axios.get(`https://bff9c4aac415f93c.mokky.dev/items`, { params })
      itemsPopular.value = data.items
   } catch (err) {
      console.log(err)
   }
}

onMounted(async () => {
   await fetchItems()
   await fetchItemsPopular()
})

watch(filters, () => {
   applyFilters()
}, { deep: true })
</script>

<template>
   <Title text="Продажа автомобилей с красивыми номерами" />
   <div class="border-slate-300 border rounded-3xl flex justify-between px-24 pt-6 pb-10 mb-6">
      <div class="flex flex-col">
         <span class="text-2xl mb-4">Поиск номеров</span>
         <div class="scale-150 transform-origin-top-left max-w-fit">
            <CarNumberPlate letters="***" numbers="***" regionCode="**" />
         </div>
         <div class="mt-14">
            <div class="grid grid-cols-2 gap-4 gap-x-10">
               <label class="block mb-2">
                  <input class="bg-custom-gray" type="checkbox" v-model="filters.filterOptions.sameLetters" />
                  Одинаковые буквы
               </label>
               <label class="block mb-2">
                  <input type="checkbox" v-model="filters.filterOptions.sameNumbers" /> Одинаковые цифры
               </label>
               <label class="block mb-2">
                  <input type="checkbox" v-model="filters.filterOptions.mirrorNumbers" /> Зеркальные цифры
               </label>
               <label class="block mb-2">
                  <input type="checkbox" v-model="filters.filterOptions.firstTen" /> Первая десятка
               </label>
            </div>
         </div>
      </div>
      <div class="flex flex-col w-[440px] items-center">
         <img class="mb-6 w-48" src="../assets/images/stars.svg" alt="">
         <p class="">Сделки с госномерами осуществляются в соответствии с законами Российской Федарации и проводятся
            путем
            продажи автомобиля новому владельцу вместе с номером.</p>
      </div>
   </div>
   <div class="flex justify-end items-center mb-6">
      <div class="flex gap-4">
         <select @change="onChangeSelect" class="py-2 px-3 border rounded-3xl outline-none">
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
            <option value="date">По дате (старые)</option>
            <option value="-date">По дате (новые)</option>
         </select>
      </div>
   </div>
   <CardList :items="items" />
   <div class="mt-4 p-5 flex justify-start bg-white border border-slate-300 rounded-3xl mb-6">
      <button @click="previousPage" :disabled="filters.page === 1"
         class="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-full outline-none">&lt;</button>
      <div class="flex gap-2">
         <button v-for="page in totalPages" :key="page" @click="changePage(page)"
            :class="['px-4 py-2 bg-gray-200 text-gray-700 rounded-full outline-none', { 'font-bold': page === filters.page }]">{{
               page }}</button>
      </div>
      <button @click="nextPage" :disabled="filters.page === totalPages"
         class="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded-full outline-none">&gt;</button>
   </div>
   <Title text="Популярные объявления" />
   <CardList :items="itemsPopular" />
</template>

<style>
.transform-origin-top-left {
   transform-origin: top left;
}
</style>