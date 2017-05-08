import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index/index';
import ClientOrder from '@/components/index/client-order/body';
import PhoneManage from '@/components/index/phone-manage/body';
import Analysis from '@/components/index/analysis/body';
import ClientManagement from '@/components/index/client-management/body';
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
        component: ClientOrder
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