import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { TinyEmitter } from "tiny-emitter";

export const emitter = new TinyEmitter();

createApp(App).use(router).mount('#app')
