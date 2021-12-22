import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as Icons from '@element-plus/icons-vue';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import App from './App.vue';
import router from './router';
import store from './store';
import './permission';

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ElementPlus).use(router).use(store).mount('#app');
console.log('this is router', router);
// 注册全局组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons]);
});
