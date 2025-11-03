import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from '@/app/router'
import vuetify from '@/app/vuetify'
import App from '@/app/app.vue'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .mount('#app')