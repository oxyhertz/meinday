import { createApp } from 'vue'
import { router } from './router.js'
import { store } from './store/store.js'
import { clickOutsideDirective, focusDirective } from './directives'
import FloatingVue from 'floating-vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import Popper from 'vue3-popper'
import 'vue3-emoji-picker/css'
import './assets/styles/main.scss'
import rootCmp from './root-cmp.vue'
import 'floating-vue/dist/style.css'
const app = createApp(rootCmp)
app.use(router)
app.use(store)
app.use(FloatingVue, {
  themes: {
    'sub-popper': {
      $extend: 'dropdown',
      // Other options (see the 'Global options' section)
    },
  },
})
app.component('Popper', Popper)
app.component('QuillEditor', QuillEditor)
app.directive('click-outside', clickOutsideDirective)
app.directive('focus', focusDirective)
app.mount('#app')
