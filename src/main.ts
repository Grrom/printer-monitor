import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from "@/views/Home.vue"
import About from "@/views/About.vue"
import App from './App.vue'
import './registerServiceWorker'


const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


createApp(App).use(router).mount('#app')
