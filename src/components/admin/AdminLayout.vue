<template>
  <div class="admin-layout">
    <!-- 顶部导航栏 -->
    <header class="admin-header">
      <div class="header-left">
        <n-button quaternary size="small" @click="handleBack">
          <template #icon>
            <n-icon :component="ArrowBack" />
          </template>
          返回
        </n-button>
        <div class="header-brand">
          <span class="brand-logo">🦞</span>
          <span class="brand-title">OpenClaw 管理后台</span>
        </div>
      </div>
      <div class="header-right">
        <UserDropdown :user="mockUser" />
      </div>
    </header>

    <!-- 侧边栏 + 内容区 -->
    <div class="admin-body">
      <aside class="admin-sidebar">
        <nav class="sidebar-nav">
          <router-link
            v-for="item in menuItems"
            :key="item.key"
            :to="item.to"
            custom
            v-slot="{ isActive, navigate }"
          >
            <div class="nav-item" :class="{ active: isActive }" @click="navigate">
              <span class="nav-icon">{{ item.icon }}</span>
              <span class="nav-label">{{ item.label }}</span>
            </div>
          </router-link>
        </nav>
      </aside>

      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { NButton, NIcon } from 'naive-ui'
import { ArrowBack } from '@vicons/ionicons5'
import UserDropdown from '../UserDropdown.vue'
import { mockUser } from '@/mocks/data'
import { useProjectStore } from '@/stores/project'

const router = useRouter()
const store = useProjectStore()

const menuItems = [
  { key: 'dashboard', label: '仪表盘', icon: '📊', to: '/admin/dashboard' },
  { key: 'instances', label: '实例管理', icon: '🖥️', to: '/admin/instances' },
  { key: 'approvals', label: '审批管理', icon: '✅', to: '/admin/approvals' },
]

function handleBack() {
  router.push('/')
  store.goHome()
}
</script>

<style lang="less" scoped>
.admin-layout {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: @bgPage;
}

.admin-header {
  height: 57px;
  background: @bgWhite;
  box-shadow: @shadowHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  flex-shrink: 0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 8px;
}

.brand-logo {
  font-size: 20px;
}

.brand-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}

.header-right {
  display: flex;
  align-items: center;
}

.admin-body {
  flex: 1;
  display: flex;
  min-height: 0;
  overflow: hidden;
}

.admin-sidebar {
  width: 220px;
  min-width: 220px;
  background: @bgWhite;
  border-right: 1px solid @borderColor;
  display: flex;
  flex-direction: column;
}

.sidebar-nav {
  flex: 1;
  padding: 8px 0;
  overflow-y: auto;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  font-size: 14px;
  color: @textColorSecondary;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 8px;
  border-radius: 4px;

  &:hover {
    background: @bgContainer;
    color: @textColorTitle;
  }

  &.active {
    color: @primaryColor;
    background: fade(@primaryColor, 6%);
    font-weight: 500;
  }
}

.nav-icon {
  font-size: 16px;
  width: 20px;
  text-align: center;
  flex-shrink: 0;
}

.nav-label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.admin-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
</style>
