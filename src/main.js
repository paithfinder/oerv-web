import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/router/index'
import './assets/styles/index.scss'
import './assets/fonts.css'

import App from './App.vue'
createApp(App).use(router).use(createPinia()).mount('#app')



