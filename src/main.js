import { createApp } from 'vue'
import { router } from './router.js'
import { store } from './store/store.js'
import { clickOutsideDirective, focusDirective } from './directives'
import FloatingVue from 'floating-vue'
import Popper from 'vue3-popper'
import 'vue3-emoji-picker/css'
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import 'floating-vue/dist/style.css'
const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(FloatingVue)
app.component('Popper', Popper)
app.directive('click-outside', clickOutsideDirective)
app.directive('focus', focusDirective)
app.mount('#app')
