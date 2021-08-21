import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import details from "@/views/details.vue"
import home from '@/views/home.vue'
import liveFeed from "@/views/liveFeed.vue"
import state from "@/views/state.vue"
import status from "@/views/status.vue"

const routes: Array<RouteRecordRaw> = [
  { path: '/details', component: details },
  { path: '/', component: home },
  { path: '/liveFeed', component: liveFeed },
  { path: '/state', component: state },
  { path: '/status', component: status },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link",
})

export default router
