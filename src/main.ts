import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import solid from '@fortawesome/fontawesome-free-solid';
import regular from '@fortawesome/fontawesome-free-regular';
import brands from '@fortawesome/fontawesome-free-brands';
import App from './App.vue';
import router from './router';
import store from './store';

fontawesome.library.add(solid);
fontawesome.library.add(regular);
fontawesome.library.add(brands);

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(ElementPlus)
  .use(router)
  .use(store)
  // .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app');
