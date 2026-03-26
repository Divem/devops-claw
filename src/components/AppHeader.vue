<template>
  <header class="app-header">
    <div class="header-left">
      <span class="header-logo">🦞</span>
      <span class="header-title">DevOps OpenClaw</span>
    </div>
    <div class="header-right">
      <n-avatar
        round
        size="small"
        :src="mockUser.avatarUrl"
        :fallback-src="undefined"
      >
        {{ mockUser.name.charAt(0) }}
      </n-avatar>
    </div>
  </header>
</template>

<script setup lang="ts">
import { NAvatar } from 'naive-ui'
import { mockUser } from '@/mocks/data'
</script>

<style lang="less" scoped>
.app-header {
  height: @headerHeight;
  background: @bgWhite;
  box-shadow: @shadowHeader;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-logo {
  font-size: 20px;
}

.header-title {
  font-size: 16px;
  font-weight: 600;
  color: @textColorTitle;
}
</style>
