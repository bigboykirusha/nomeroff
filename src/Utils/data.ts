export const PHONE_NUMBER = '8000000000';

enum NAVIGATION_LINKS {
   CATALOG = 'Каталог номеров',
   DESIGN = 'Оформление',
   PLACE_AD = 'Разместить объявление',
   SELL_FAST = 'Продать быстро'
}

export const navigationLinks = [
   { text: NAVIGATION_LINKS.CATALOG, url: '/catalog' },
   { text: NAVIGATION_LINKS.DESIGN, url: '/design' },
   { text: NAVIGATION_LINKS.PLACE_AD, url: '/place-ad' },
   { text: NAVIGATION_LINKS.SELL_FAST, url: 'sell' }
];