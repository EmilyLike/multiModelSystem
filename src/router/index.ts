import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Layout from '@/components/layout';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
  },
  // {
  //   path: '/',
  //   redirect: '/record',
  // },
  {
    path: '/',
    component: Layout,
    // redirect: '/record',
    children: [{
      path: '/record',
      name: 'record',
      component: () => import('@/views/board/record/record'),
      meta: {
        title: '数据采集',
        ignoreAuth: true,
      },
    },
    {
      path: '/data',
      name: 'data',
      meta: {
        title: '所有数据',
        ignoreAuth: true,
      },
      component: () => import('@/views/board/data'),
    },
    {
      path: '/project/:id',
      name: 'recordProject',
      meta: {
        title: '录制项目',
        ignoreAuth: true,
      },
      component: () => import('@/views/board/record/project'),
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        title: '个人设置',
        ignoreAuth: true,
      },
      component: () => import('@/views/board/settings'),
    },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
