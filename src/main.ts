import { createApp } from 'vue'
import './style.css'
import 'virtual:uno.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
