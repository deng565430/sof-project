import Vue from 'vue';
import Router from 'vue-router';

const Index = r => require.ensure([], () => r(require('../components/index/index')), 'index');
const Login = r => require.ensure([], () => r(require('../components/login/login')), 'login');
const AllIndustry = r => require.ensure([], () => r(require('../components/allIndustry/allIndustry')), 'allIndustry');


const ClientOrder = r => require.ensure([], () => r(require('../components/index/client-order/body')), 'alientOrder');
const PhoneManage = r => require.ensure([], () => r(require('../components/index/phone-manage/body')), 'phoneManage');
const Analysis = r => require.ensure([], () => r(require('../components/index/analysis/body')), 'analysis');
const ClientManagement = r => require.ensure([], () => r(require('../components/index/client-management/body')), 'clientManagement');


const OrderIndex = r => require.ensure([], () => r(require('../components/index/client-order/OrderIndex')), 'orderIndex');
const Dingyue = r => require.ensure([], () => r(require('../components/index/client-order/dingyue')), 'dingyue');
const Dinging = r => require.ensure([], () => r(require('../components/index/client-order/dinging')), 'dinging');
const Historyding = r => require.ensure([], () => r(require('../components/index/client-order/historyding')), 'historyding');


const EstateOrder = r => require.ensure([], () => r(require('../components/index/client-order/orders/estateOrder')), 'estateOrder');
const Chakanhistory = r => require.ensure([], () => r(require('../components/index/client-order/orders/chakanhistory')), 'chakanhistory');
const Changeorder = r => require.ensure([], () => r(require('../components/index/client-order/orders/changeorder')), 'changeorder');
const Dingchange = r => require.ensure([], () => r(require('../components/index/client-order/orders/dingchange')), 'dingchange');


const Newzhi = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/new')), 'newzhi');
const Addzhi = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/add')), 'addzhi');
const Campaigning = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/campaigning')), 'campaigning');
const Historycampaign = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/historycampaign')), 'historycampaign');
const Weizhi = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/weizhi')), 'Weizhi');
const Changecampaign = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/changecampaign')), 'changecampaign');
const Zhichange = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/zhichange')), 'zhichange');
const Yimeicampaign = r => require.ensure([], () => r(require('../components/index/client-order/zhixing/yimeicampaign')), 'yimeicampaign');

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