import { createApp } from 'vue'
import { router } from './router.js'
import { store } from './store/store.js'
import FloatingVue from 'floating-vue'
import Popper from 'vue3-popper'

import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import 'floating-vue/dist/style.css'
const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(FloatingVue)
app.component('Popper', Popper)
app.mount('#app')
