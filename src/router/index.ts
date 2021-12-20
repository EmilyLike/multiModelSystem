import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/components/layout.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: () => ({ path: '/login' }),
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
      component: () => import('@/views/board/record/index.vue'),
      meta: {
        title: '录像采集',
        ignoreAuth: true,
      },
      redirect: '/record/list',
      children: [
        {
          path: 'list',
          name: 'Record',
          meta: {
            activeName: 'record',
          },
          component: () => import('@/views/board/record/record.vue'),
        },
        {
          path: 'project',
          name: 'recordProject',
          meta: {
            title: '录制项目',
            ignoreAuth: true,
          },
          component: () => import('@/views/board/record/project.vue'),
        },
      ],
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
