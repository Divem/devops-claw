import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/projects/:id/admin',
      name: 'project-admin',
      component: () => import('@/views/ProjectAdmin.vue'),
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
          path: 'global-config',
          name: 'admin-global-config',
          component: () => import('@/views/admin/GlobalConfig.vue'),
        },
        {
          path: 'images',
          name: 'admin-images',
          component: () => import('@/views/admin/ImageList.vue'),
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
