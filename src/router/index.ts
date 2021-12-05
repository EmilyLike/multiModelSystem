import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/record',
  },
  {
    path: '/',
    component: Layout,
    // redirect: '/record',
    children: [{
      path: '/record',
      name: 'record',
      meta: {
        title: '录像采集',
        ignoreAuth: true,
      },
      component: () => import('@/views/board/record.vue'),
    },
    {
      path: '/data',
      name: 'data',
      meta: {
        title: '个人数据',
        ignoreAuth: true,
      },
      component: () => import('@/views/board/data.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      meta: {
        title: '个人设置',
        ignoreAuth: true,
      },
      component: () => import('@/views/board/settings.vue'),
    },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
