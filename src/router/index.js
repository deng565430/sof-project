import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const Index = r => require.ensure([], () => r(require('components/index/index')), 'index');
const Login = r => require.ensure([], () => r(require('components/login/login')), 'login');
const AllIndustry = r => require.ensure([], () => r(require('components/allIndustry/allIndustry')), 'allIndustry');


const ClientOrder = r => require.ensure([], () => r(require('components/index/client-order/body')), 'alientOrder');
const PhoneManage = r => require.ensure([], () => r(require('components/index/phone-manage')), 'phoneManage');
const Analysis = r => require.ensure([], () => r(require('components/index/analysis')), 'analysis');
const ClientManagement = r => require.ensure([], () => r(require('components/index/client-management/body')), 'clientManagement');

const newxuqiu = r => require.ensure([], () => r(require('components/index/client-order/xuqiudan/neworder')), 'newxuqiu');
const orders = r => require.ensure([], () => r(require('components/index/client-order/xuqiudan/daishenhe')), 'daishenhe');
const newzhixing = r => require.ensure([], () => r(require('components/index/client-order/zhixingdan/allzhixing')), 'newzhixing');


const PhoneList = r => require.ensure([], () => r(require('components/index/phone-manage/PhoneList/PhoneList')), 'PhoneList');
const PhoneResult = r => require.ensure([], () => r(require('components/index/phone-manage/PhoneResult/PhoneResult')), 'phoneResult');
const Quality = r => require.ensure([], () => r(require('components/index/phone-manage/QualityAnalysis/QualityAnalysis')), 'quality');


const Report = r => require.ensure([], () => r(require('components/index/analysis/ReportList')), 'reportlist');
const AddProjectList = r => require.ensure([], () => r(require('components/index/analysis/AddProjectList')), 'addprojectlist');


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
      path: '/neworder',
      component: newxuqiu
    }, {
      path: '/orders',
      component: orders
    }, {
      path: '/campaign',
      component: newzhixing
    }]
  }, {
    path: '/phone',
    component: PhoneManage,
    children: [{
      path: 'phoneList',
      component: PhoneList
    }, {
      path: 'phoneResult',
      component: PhoneResult
    }, {
      path: 'quality',
      component: Quality
    }]
  }, {
    path: '/management',
    name: 'management',
    component: ClientManagement
  },{
    path: '/analysis',
    name: 'analysis',
    component: Analysis,
    children: [{
      path: 'addprojectlist',
      component: AddProjectList
    }, {
      path: 'report/:project/:updatatime/:id',
      component: Report,
      meta: { scrollToTop: true }
    }]
  }],
  // mode: 'history',
  strict: process.env.NODE_ENV !== 'production'
});

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next('/index')
  }
  if (to.path == '/analysis') {
    next('/analysis/addprojectlist')
  }
  if (to.path == '/phone') {
    next('/phone/phoneList')
  }
  next()
})

export default router;