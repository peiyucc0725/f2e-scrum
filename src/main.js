import { createApp } from 'vue'
import { store } from './store'
import router from './router/index'
import App from './App.vue'
import './assets/scss/global.scss'

const app = createApp(App)
    .use(router)
    .use(store)

app.mount('#app')
