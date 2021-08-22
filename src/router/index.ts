import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import details from "@/views/details.vue"
import home from '@/views/home.vue'
import files from "@/views/files.vue"
import state from "@/views/state.vue"
import status from "@/views/status.vue"
import timelapses from "@/views/timelapses.vue"

const routes: Array<RouteRecordRaw> = [
  { path: '/details', component: details },
  { path: '/', component: home },
  { path: '/files', component: files },
  { path: '/state', component: state },
  { path: '/status', component: status },
  { path: '/timelapses', component: timelapses },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active-link",
})

export default router
