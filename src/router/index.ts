import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import home from '@/views/home.vue'
import gas from "@/views/gas.vue"
import light from "@/views/light.vue"
import liveFeed from "@/views/liveFeed.vue"
import photoResistor from "@/views/photoResistor.vue"
import sound from "@/views/sound.vue"

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: home },
  { path: '/gas', component: gas },
  { path: '/light', component: light },
  { path: '/liveFeed', component: liveFeed },
  { path: '/photoResistor', component: photoResistor },
  { path: '/sound', component: sound },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link",
})

export default router
