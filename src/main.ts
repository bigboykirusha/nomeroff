import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'
import App from './App.vue'

const app = createApp(App)

const routes = [
   { path: '/', name: 'Home', component: Home },
   { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
   history: createWebHistory(),
   routes
})

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')