import Vue from 'vue';
import Router from 'vue-router';

import Index from '@/components/index/index';
import Login from '@/components/login/login';
import AllIndustry from '@/components/allIndustry/allIndustry';


import ClientOrder from '@/components/index/client-order/body';
import PhoneManage from '@/components/index/phone-manage/body';
import Analysis from '@/components/index/analysis/body';
import ClientManagement from '@/components/index/client-management/body';

import OrderIndex from '@/components/index/client-order/OrderIndex';
import Dingyue from '@/components/index/client-order/dingyue';
import Dinging from '@/components/index/client-order/dinging';
import Historyding from '@/components/index/client-order/historyding';

import EstateOrder from '@/components/index/client-order/orders/estateOrder';
import Chakanhistory from '@/components/index/client-order/orders/chakanhistory';
import Changeorder from '@/components/index/client-order/orders/changeorder';
import Dingchange from '@/components/index/client-order/orders/dingchange';

import Newzhi from '@/components/index/client-order/zhixing/new';
import Addzhi from '@/components/index/client-order/zhixing/add';
import Campaigning from '@/components/index/client-order/zhixing/campaigning';
import Historycampaign from '@/components/index/client-order/zhixing/historycampaign';
import Weizhi from '@/components/index/client-order/zhixing/weizhi';
import Changecampaign from '@/components/index/client-order/zhixing/changecampaign';
import Zhichange from '@/components/index/client-order/zhixing/zhichange';
import Yimeicampaign from '@/components/index/client-order/zhixing/yimeicampaign';


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
      path: '/client/estateOrder',
      component: EstateOrder,
    }, {
      path: '/client/dingyue',
      component: Dingyue,
    }, {
      path: '/client/dinging',
      component: Dinging,
    },{
      path: '/client/historyding',
      component: Historyding,
    }, {
      path: '/client/Newzhi',
      component: Newzhi,
    }, {
      path: '/client/Addzhi',
      component: Addzhi,
    }, {
      path: '/client/chakanhistory',
      component: Chakanhistory,
    }, {
      path: '/client/changeorder',
      component: Changeorder,
    }, {
      path: '/client/dingchange',
      component: Dingchange,
    }, {
      path: '/client/campaigning',
      component: Campaigning,
    }, {
      path: '/client/historycampaign',
      component: Historycampaign,
    }, {
      path: '/client/nocampaign',
      component: Weizhi,
    }, {
      path: '/client/Campaignchange',
      component: Zhichange,
    }, {
      path: '/client/yimeicampaign',
      component: Yimeicampaign,
    }, {
      path: '/client/changecampaign',
      component: Changecampaign,
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
  if (to.path == '/') {
    next('/index')
  }
  next()
})

export default router;