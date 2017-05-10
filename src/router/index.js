import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';


import ClientOrder from '@/components/index/client-order/body';
import PhoneManage from '@/components/index/phone-manage/body';
import Analysis from '@/components/index/analysis/body';
import ClientManagement from '@/components/index/client-management/body';


import OrderIndex from '@/components/index/client-order/OrderIndex';
import EstateOrder from '@/components/index/client-order/orders/estateOrder';
import Dingyue from '@/components/index/client-order/dingyue';
import Historyding from '@/components/index/client-order/historyding';

/*const Index = r => require.ensure([], () => r(require('@/components/index/index')), 'index');
const ClientOrder = r => require.ensure([], () => r(require('@/components/index/client-order/body')), 'body');*/

Vue.use(Router);

export default new Router({
    routes: [{
        path: '',
        component: Index,
    }, {
        path: '/',
        name: 'index',
        component: Index
    }, {
        path: '/client',
        name: 'body',
        component: ClientOrder,
        children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
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