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
import Clinic from '@/components/index/client-order/orders/yimeiorder';
import Changeorder from '@/components/index/client-order/orders/Changeorder';
import Chakanhistory from '@/components/index/client-order/orders/chakanhistory';
import Dingchange from '@/components/index/client-order/orders/dingchange';
import Dingyue from '@/components/index/client-order/dingyue';
import Historyding from '@/components/index/client-order/historyding';
import Dinging from '@/components/index/client-order/dinging';
import Newzhi from '@/components/index/client-order/zhixing/new';
import Addzhi from '@/components/index/client-order/zhixing/add';
import Zhichange from '@/components/index/client-order/zhixing/zhichange';
import Campaigning from '@/components/index/client-order/zhixing/campaigning';

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
      path: '/client/orderIndex',
      component: OrderIndex,
    }, {
      path: 'dingchange',
      component: Dingchange,
    }, {
      path: 'estateOrder',
      component: EstateOrder,
    }, {
      path: 'chakanhistory',
      component: Chakanhistory,
    },{
      path: 'dingyue',
      path: '/client/orderIndex/estateOrder',
      component: EstateOrder,
    }, {
      path: '/client/dingyue',
      component: Dingyue,
    }, {
      path: '/client/historyding',
      component: Historyding,
    }, {
      path: '/client/dinging',
      component: Dinging,
    }, {
      path: '/client/Newzhi',
      component: Newzhi,
    }, {
      path: '/client/Addzhi',
      component: Addzhi,
    }, {
      path: '/client/Campaigning',
      component: Campaigning,
    }, {
      path: '/client/Campaignchange',
      component: Zhichange,
    }, {
      path: '/client/Clinic',
      component: Clinic,
    },]
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