import { ref } from 'vue';

export const useMenu = () => {
   const isMenuActive = ref(false);

   const toggleMenu = (): void => {
      isMenuActive.value = !isMenuActive.value;
      updateScrollState(isMenuActive.value);
   };

   const closeMenu = (): void => {
      isMenuActive.value = false;
      updateScrollState(isMenuActive.value);
   };

   const updateScrollState = (disable: boolean): void => {
      document.body.classList.toggle('no-scroll', disable);
   };

   return {
      isMenuActive,
      toggleMenu,
      closeMenu,
   };
};