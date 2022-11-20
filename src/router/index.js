import { createRouter, createWebHashHistory } from 'vue-router';
import Start from '../views/Start.vue'

const routes = [
    { path: '/', component: Start },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router;