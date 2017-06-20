// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import Router from 'vue-router';
import './assets/css/reset.css';
import 'element-ui/lib/theme-default/index.css';
import store from './store/index';
import { MessageBox } from 'element-ui';
import api from './config/api';

Vue.prototype.$api = api;
//element-ui使用
Vue.use(ElementUI);

Vue.use(Router);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
