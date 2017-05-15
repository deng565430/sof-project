import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/index/index';
import Login from '@/components/login/login';
import AllIndustry from '@/components/allIndustry/allIndustry';


import ClientOrder from '@/components/index/client-order/body';
import PhoneManage from '@/components/index/phone-manage/body';
import Analysis from '@/components/index/analysis/body';
import ClientManagement from '@/components/index/client-management/body';

import PhoneList from '@/components/index/phone-manage/phoneList';
import OrderIndex from '@/components/index/client-order/OrderIndex';
import EstateOrder from '@/components/index/client-order/orders/estateOrder';
import Changeorder from '@/components/index/client-order/orders/changeorder';
import Dingyue from '@/components/index/client-order/dingyue';
import Dinging from '@/components/index/client-order/dinging';
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
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/client',
    name: 'body',
    component: ClientOrder,
    children: [{
      path: 'orderIndex',
      component: OrderIndex,
    }, {
      path: 'estateOrder',
      component: EstateOrder,
    }, {
      path: 'dingyue',
      component: Dingyue,
    }, {
      path: 'dinging',
      component: Dinging,
    }, {
      path: 'historyding',
      component: Historyding,
    }, {
      path: 'Newzhi',
      component: Newzhi,
    }, {
      path: 'Addzhi',
      component: Addzhi,
    },{
      path: 'Changeorder',
      component: Changeorder, 
    }]
  }, {
      path: '/phone',
      name: 'phoneManage',
      component: PhoneManage,
      children: [{
        path: 'phoneList',
        component: PhoneList,
    }]
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
  if (to.path == '/') {
    next('/index')
  }
  next()
})

export default router;