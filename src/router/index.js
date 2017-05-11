import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/index/index';
import Login from '@/components/login/login';


import ClientOrder from '@/components/index/client-order/body';
import PhoneManage from '@/components/index/phone-manage/body';
import Analysis from '@/components/index/analysis/body';
import ClientManagement from '@/components/index/client-management/body';


import OrderIndex from '@/components/index/client-order/OrderIndex';
import EstateOrder from '@/components/index/client-order/orders/estateOrder';
import Dingyue from '@/components/index/client-order/dingyue';
import Historyding from '@/components/index/client-order/historyding';
import Newzhi from '@/components/index/client-order/zhixing/new';
import Addzhi from '@/components/index/client-order/zhixing/add';

/*const Index = r => require.ensure([], () => r(require('@/components/index/index')), 'index');
const ClientOrder = r => require.ensure([], () => r(require('@/components/index/client-order/body')), 'body');*/

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        component: Index,
    }, {
        path: '/index',
        name: 'index',
        component: Index
    }, {path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/client',
        name: 'body',
        component: ClientOrder,
        children: [
        {
          path: '/client/orderIndex',
          component: OrderIndex,
          children: [
        {
          path: '/client/orderIndex/estateOrder',
          component: EstateOrder, 
        },
        ]},
        {
          path: '/client/dingyue',
          component: Dingyue,
          }, 
          {
          path: '/client/historyding',
          component: Historyding,
          }, 
          {
          path: '/client/Newzhi',
          component: Newzhi,
          }, 
          {
          path: '/client/Addzhi',
          component: Addzhi,
          }]
    }, {
        path: '/phone',
        name: 'phoneManage',
        component: PhoneManage
    }, {
        path: '/management',
        name: 'management',
        component: ClientManagement
    }, {
        path: '/analysis',
        name: 'analysis',
        component: Analysis
    }]
});

router.beforeEach((to, from, next) => {
  if(to.path == '/'){
    next('/index')
  }
  next()
})

export default router;
