import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Message from "./plugins/CustomModel"
const app=createApp(App)
app.use(Message);
app.use(store).use(router).mount('#app')
