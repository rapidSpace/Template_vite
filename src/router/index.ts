import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Root',
    meta: { title: '菜单' },
    redirect: { name: 'Home' },
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '主页' },
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Welcome/indexPage.vue'),
      }],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
