import type { IFilters, IItem } from "./types";

export const sortItems = (items: IItem[], filters: IFilters): IItem[] => {
   return items.sort((a, b) => {
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
};

export const filterItems = (items: IItem[], filters: IFilters): IItem[] => {
   const { filterOptions } = filters;

   return items.filter(item => {
      const { letters, numbers } = item.plateInfo;

      return (!filterOptions.sameLetters || new Set(letters).size === 1) &&
         (!filterOptions.sameNumbers || new Set(numbers).size === 1) &&
         (!filterOptions.mirrorNumbers || numbers === numbers.split('').reverse().join(''));
   });
};