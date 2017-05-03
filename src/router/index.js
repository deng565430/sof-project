import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import Hello from '@/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/demo',
      name: 'hello',
      component: Hello
    },

  ]
});
