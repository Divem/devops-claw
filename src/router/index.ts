import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/App.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/components/admin/AdminLayout.vue'),
      redirect: '/admin/dashboard',
      children: [
        {
          path: 'dashboard',
          name: 'admin-dashboard',
          component: () => import('@/views/admin/AdminDashboard.vue'),
        },
        {
          path: 'instances',
          name: 'admin-instances',
          component: () => import('@/views/admin/InstanceList.vue'),
        },
        {
          path: 'approvals',
          name: 'admin-approvals',
          component: () => import('@/views/admin/ApprovalBoard.vue'),
        },
      ],
    },
  ],
})

export default router
