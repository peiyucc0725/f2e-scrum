import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'
import './assets/scss/global.scss'
import CustomBtn from './components/CustomBtn.vue'

const app = createApp(App)
    .use(store)

app.component('custom-btn', CustomBtn)
app.mount('#app')
