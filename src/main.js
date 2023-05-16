import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import "./assets/css/common.css"
import "./router/permission"
import "./utils/init"
import  * as ementPlusIconsVue  from '@element-plus/icons-vue'
const app = createApp(App);
for (const name in ementPlusIconsVue) {
    app.component(name, ementPlusIconsVue[name]);
  }
app.use(store).use(router).use(ElementPlus).mount('#app')
